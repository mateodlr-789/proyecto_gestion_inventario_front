"use client";
import Link from "next/link";
import { Controller } from "react-hook-form";
import cls from "classnames";

import FieldPass from "../field-pass";
import { useFormHook } from "./use-form";

export default function Form() {
  const { control, onSubmit, isLoading } = useFormHook();

  return (
    <>
      <div>
        <label
          className="block text-sm font-medium mb-2 text-black"
        >
          Correo electrónico
        </label>
        <Controller
          name="user"
          control={control}
          render={({
            field: { value, onChange, ...all },
            fieldState: { error },
          }) => (
            <>
              <input
                onChange={onChange}
                value={value}
                type="email"
                className={cls(
                  "py-3 px-4 block w-full border-2 rounded-lg text-sm  focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900  dark:text-gray-400 dark:focus:ring-gray-600",
                  error?.message ? "border-red-600" : ""
                )}
                placeholder="Ingrese su correo electrónico"
              />
              {error?.message && (
                <p className="text-sm text-red-600">falta campo o esta incorrecto</p>
              )}
            </>
          )}
        />
      </div>

      <div className="mt-2">
        <label
          className="block text-sm font-medium mb-2 text-black"
        >
          Nombre
        </label>
        <Controller
          name="name"
          control={control}
          render={({
            field: { value, onChange, ...all },
            fieldState: { error },
          }) => (
            <>
              <input
                onChange={onChange}
                value={value}
                type="text"
                className={cls(
                  "py-3 px-4 block w-full border-2 rounded-lg text-sm  focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900  dark:text-gray-400 dark:focus:ring-gray-600",
                  error?.message ? "border-red-600" : ""
                )}
                placeholder="Ingrese su nombre"
              />
              {error?.message && (
                <p className="text-sm text-red-600">falta campo o esta incorrecto</p>
              )}
            </>
          )}
        />
      </div>

      <div className="mt-2">
        <label
          className="block text-sm font-medium mb-2 text-black"
        >
          Apellido
        </label>
        <Controller
          name="lastName"
          control={control}
          render={({
            field: { value, onChange, ...all },
            fieldState: { error },
          }) => (
            <>
              <input
                onChange={onChange}
                value={value}
                type="text"
                className={cls(
                  "py-3 px-4 block w-full border-2 rounded-lg text-sm  focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900  dark:text-gray-400 dark:focus:ring-gray-600",
                  error?.message ? "border-red-600" : ""
                )}
                placeholder="Ingrese su apellido"
              />
              {error?.message && (
                <p className="text-sm text-red-600">falta campo o esta incorrecto</p>
              )}
            </>
          )}
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm mb-2 text-black ">Contraseña</label>
        <Controller
          name="password"
          control={control}
          render={({
            field: { value, onChange, ...all },
            fieldState: { error },
          }) => (
            <>
              <FieldPass onChange={onChange} value={value} error={error} />
              {error?.message && (
                <p className="text-sm text-red-600">falta campo o esta incorrecto</p>
              )}
            </>
          )}
        />
      </div>

      <button
        disabled={isLoading}
        onClick={() => {
          onSubmit();
        }}
        className="w-full mt-2 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-700 text-white hover:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        Registrar
      </button>
    </>
  );
}
