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
      {/* Input para la contraseña */}
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        className={cls(
          "py-3 px-4 pl-10 block w-full  border-2 dark:border-none rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500 text-black dark:text-white dark:bg-inputDark dark:border-white",
          error?.message ? "border-red-600" : "border-orange-300 dark:border-white"
        )}
        onChange={onChange}
        placeholder="Ingrese su contraseña"
      />
      {/* Botón para mostrar/ocultar contraseña */}
      <button
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 dark:text-white focus:outline-none"
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
