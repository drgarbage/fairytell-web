'use client'
import { createContext, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/auth';
import { deleteApp, getApp } from 'firebase/app';
import { logError } from '@/utils/log';
import * as Sentry from '@sentry/nextjs';
import getDocument from '@/firebase/firestore/getDocument';
import updateDocument from '@/firebase/firestore/updateDocument';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export const UserProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);

  
  const [currentPage, setCurrentPage] = useState("home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const user = !!firebaseUser ? { 
    uid: firebaseUser?.uid,
    token,
    ...profile,
  } : null;
  const router = useRouter();

  const agentId = user?.agentAccounts?.[0];
  const brokerId = user?.brokerAccounts?.[0];
  const merchantId = user?.merchantAccounts?.[0];

  async function update(changes) {
    if(Object.keys(changes).length === 0) return;
    await updateProfile(firebaseUser, changes);
    await updateDocument('users', firebaseUser.uid, changes);
    setProfile({ ...profile, ...changes });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if(!fbUser) {
        setToken(null);
        setProfile(null);
        setAuthReady(true);
        setShouldLogin(true);
        Sentry.setUser(null);
        return;
      }

      try{
        const token = await fbUser.getIdToken();
        setToken(token);
        const profile = await getDocument('users', fbUser.uid);
        setProfile(profile);
        setAuthReady(true);
        setShouldLogin(false);
        Sentry.setUser({ id: fbUser.uid, email: profile.email, name: profile.displayName });
      }catch(err){
        logError(err);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unloadCallback = () => { deleteApp(getApp()) }
    window.addEventListener("beforeunload", unloadCallback);
    return async () => {
      window.removeEventListener("beforeunload", unloadCallback);
    }
  }, []);

  return (
    <UserContext.Provider value={{ 
      firebaseUser, user, authReady, 
      updateProfile: update, 
      agentId, brokerId, merchantId,
      currentPage, setCurrentPage,
      showMobileMenu, setShowMobileMenu,
      shouldLogin,
      isLoggedIn: !!user 
    }}>
      {children}
    </UserContext.Provider>
  );
}