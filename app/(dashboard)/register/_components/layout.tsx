import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col gap-6 pb-6 border border-black p-3 rounded-md">
      {children}
    </div>
  );
}

Layout.Header = function Header({ children }: Props) {
  return <div>{children}</div>;
};

Layout.Form = function Form({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  );
};

