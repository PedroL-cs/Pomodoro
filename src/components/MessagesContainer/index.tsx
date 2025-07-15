import { Bounce, ToastContainer } from 'react-toastify';

type messagesContainerProps = {
   children: React.ReactNode;
};

export function MessagesContainer({ children }: messagesContainerProps) {
   return (
      <>
         {children}

         <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            transition={Bounce}
         />
      </>
   );
}
