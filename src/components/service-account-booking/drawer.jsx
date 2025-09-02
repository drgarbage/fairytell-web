'use client';

import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { createContext, useContext, useState } from "react";

export const DrawerContext = createContext({});
export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if(!context)
    throw new Error('DrawerContext not found');
  return context;
}
export const DrawerProvider = ({ children }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <DrawerContext.Provider value={{showDrawer, setShowDrawer}}>
      {children}
    </DrawerContext.Provider>
  )
}

export default function DrawerView({children, className = ''}){
  const { showDrawer, setShowDrawer } = useDrawer();
  return (
    <Drawer 
      className={`${className}`}
      position="right"
      open={showDrawer} 
      onClose={() => setShowDrawer(false)}>
      <DrawerHeader title="篩選條件" />
      <DrawerItems>
        {children}
      </DrawerItems>
    </Drawer>
  );
}