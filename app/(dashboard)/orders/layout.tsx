import { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Orders",
};

export default function Layout({ children }: Props) {
  return <div className="w-full h-screen bg-gray-100"><main className="p-0">{ children }</main></div>
  
}
