"use client";
import { useState } from "react";
import cls from "classnames";
import { FieldError } from "react-hook-form";

import { Icon } from "@/components/atoms/icon";

interface Props {
  onChange: (...event: any[]) => void;
  value: string;
  error: FieldError | undefined
}

export default function FieldPass({ onChange, value, error }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        className={cls(
          "py-3 px-4 pr-10 block w-full border-2 rounded-lg text-sm  focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900  dark:text-gray-400 dark:focus:ring-gray-600",
          error?.message ? "border-red-600" : ""
        )}
        onChange={onChange}
        placeholder="Ingrese su contraseña"
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 hover:text-white focus:outline-none"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <Icon className="" type="sl-close" />
        ) : (
          <Icon className="" type="sl-eye" />
        )}
      </button>
    </div>
  );
}
