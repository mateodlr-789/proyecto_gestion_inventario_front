"use client";

import { route } from "@/app/_constants";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <p className="text-black">hola mundo</p>
      <button className="bg-blue-700" onClick={() => router.push(route.register)}>ir a registrar</button>
    </div>
  );
}
