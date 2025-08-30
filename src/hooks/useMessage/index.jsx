'use client'
import { createContext, useContext, useState } from "react";
import { Modal, Spinner, Toast } from "flowbite-react";

export const Icons = {
  "WARNING": "icon-[material-symbols--warning]",
  "ERROR": "icon-[material-symbols--warning] text-yellow-200",
  "INFO": "icon-[material-symbols--warning]",
}

export const Colors = {
  "WARNING": "bg-yellow-200 text-black",
  "ERROR": "bg-red-500 text-white",
  "INFO": "bg-blue-500 text-white",
}

export const MessageContext = createContext({});
export const useMessage = () => {
  return useContext(MessageContext);
}
export const MessageProvider = ({ children }) => {
  const [staticMessage, setStaticMsg] = useState(null);
  const [toastMessage, setToastMsg] = useState(null);
  const [alertMessage, setAlertMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundLoading, setBackgroundLoading] = useState(false);

  function alertStatic({message, icon = null, color = null, timeout = -1}) {
    setStaticMsg({message, icon, color, timeout});
    if(timeout > 0) setTimeout(() => setStaticMsg(null), timeout);
  }

  function alertToast({message, icon, color, timeout}) {
    setToastMsg({message, icon, color, timeout});
    if(timeout > 0) setTimeout(() => setToastMsg(null), timeout);
  }

  function alertModal({message, icon, color, timeout}) {
    setAlertMsg({message, icon, color, timeout});
    if(timeout > 0) setTimeout(() => setAlertMsg(null), timeout);
  }
  
  return (
    <MessageContext.Provider value={{
      staticMessage,
      toastMessage,
      alertMessage,
      alertStatic,
      alertToast,
      alertModal,
      hideStatic: () => setStaticMsg(null),
      hideToast: () => setToastMsg(null),
      hideAlert: () => setAlertMsg(null),
      loading, setLoading,
      backgroundLoading, setBackgroundLoading,
    }}>
      {children}
    </MessageContext.Provider>
  );
}
export const WithMessage = ({ children }) => {
  const { 
    staticMessage, 
    toastMessage, 
    alertMessage,
    hideToast,
    loading, setLoading,
   } = useMessage();

  return (
    <>
      {!!staticMessage && 
        <div className={`p-2 flex flex-row items-center gap-2 z-30 sticky top-14 ${staticMessage?.color || '/images/avatar.webp'}`}>
          {staticMessage?.icon && <span className={staticMessage?.icon} />}
          <span>{staticMessage?.message}</span>
        </div>
      }

      {/** todo: add toast message */}
      
      {/** todo: add alert message */}

      {children}

      <Modal 
        show={loading} 
        onClose={() => setLoading(false)}
        theme={{content: { base: 'w-3/4'}}}>
        <Modal.Body>
          <div className="space-x-4">
            <Spinner />
            <span>正在讀取資料...</span>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
}
