'use client';
import React, { useState } from 'react';
import { Card, Button, Label, TextInput } from 'flowbite-react';
import { logError } from '@/utils/log';
import { useRouter } from 'next/navigation';
import signIn from '@/client-services/auth/signIn';
import registerWithEmailAndPassword from '@/client-services/auth/registerWithEmailAndPassword';
import strings from '@/utils/strings';

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState('model');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // logError(error);
        alert(`${strings("LOGIN_FAILED")}: ${strings(errorCode)} ${errorMessage}`);
      });
  };

  const handleRegister = () => {
    registerWithEmailAndPassword(email, password, profile)
      .then(() => {
        alert("帳號註冊成功，請用註冊的帳號重新登入。");
        router.replace('/auth/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        logError(error);
        alert(`${strings("REGISTER_FAILED")}: ${strings(errorCode)}`);
      });
  };

  const onLogin = () => {
    if (isSignUp) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-md mx-auto">
        <form>
          <Card>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              {isSignUp ? '註冊帳號' : '登入帳號'}
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="mb-2">電子郵件</Label>
                <TextInput id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password" className="mb-2">密碼</Label>
                <TextInput id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {isSignUp && (
                <div>
                  <Label htmlFor="confirmPassword" className="mb-2">確認密碼</Label>
                  <TextInput id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              )}
            </div>

            <Button
              onClick={onLogin}
              className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white"
            >
              {isSignUp ? '註冊' : '登入'}
            </Button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-pink-600 hover:text-pink-700 text-sm"
              >
                {isSignUp ? '已有帳號？登入' : '沒有帳號？註冊'}
              </button>
            </div>
          </Card>
        </form>
      </div>
    </main>
  );
}

export default AuthPage;