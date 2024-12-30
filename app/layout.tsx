import type { Metadata } from 'next';
import './globals.css';
import SideBar from './components/Sidebar';
import ReduxProvider from '@/store/Provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A simple task management app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#fdfdfd]">
        <ReduxProvider>
          <div className="flex h-screen">
            <div className="w-auto">
              <SideBar />
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              {children}
              <ToastContainer 
                position="bottom-right" 
                autoClose={3000} 
                hideProgressBar={true} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
              />
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}