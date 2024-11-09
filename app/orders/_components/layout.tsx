import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="p-0 w-full h-screen bg-white dark:bg-darkModebg">
        <header className="m-0 w-full bg-orange-500 dark:bg-darkModeBgOverlay text-white  p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Pedidos</h1>
        <button className="text-white">Logout</button>
        </header>
        <div className="p-9 ">
            {children}
        </div>
        
    </div>
    
  );
}