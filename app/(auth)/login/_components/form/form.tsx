"use client";
import { Controller } from "react-hook-form";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import cls from "classnames";
import FieldPass from "../field-pass";
import { useFormHook } from "./use-form";

export default function Form() {
  const { control, onSubmit, isLoading } = useFormHook();

  return (
    <>
      <div className="mb-4">
        {/* Correo electrónico */}
        <label className="block text-sm font-medium mb-2 text-black dark:text-white">
          Correo electrónico
        </label>
        <div className="relative">
          <Controller
            name="user"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                {/* Icono del usuario */}
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-white" />
                <input
                  onChange={onChange}
                  value={value}
                  type="email"
                  className={cls(
                    "py-3 px-4 pl-10 block w-full border-2 dark:border-none rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500 text-black dark:text-white dark:bg-inputDark dark:border-white",
                    error ? "border-red-600" : "border-orange-300 dark:border-white"
                  )}
                  placeholder="Ingrese su correo electrónico"
                />
                {error && (
                  <p className="text-sm text-red-600">falta campo o está incorrecto</p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="mb-4">
        {/* Contraseña */}
        <label className="block text-sm font-medium mb-2 text-black dark:text-white">
          Contraseña
        </label>
        <div className="relative">
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                {/* Icono de candado */}
                <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-white" />
                <FieldPass onChange={onChange} value={value} error={error} />
                {error && (
                  <p className="text-sm text-red-600">falta campo o está incorrecto</p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        onClick={() => onSubmit()}
        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
      >
        Iniciar sesión
      </button>
    </>
  );
}
