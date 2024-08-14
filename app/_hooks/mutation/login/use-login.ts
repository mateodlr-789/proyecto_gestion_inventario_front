"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { MUTATION_LOGIN } from "@/app/_constants";
import { ILogin } from "@/app/_types";

export function useLogin() {
    const notifyError = () => toast("hubo un fallo!");
    const notifyUSerError = () => toast("Usuario o contraseña incorrectos!");
  
    // const setToken = useAuthStore((state) => state.setToken);
    return useMutation({
      mutationKey: [MUTATION_LOGIN],
      // mutationFn: (form: ILogin) =>
      //   axios.post("http://localhost:8000/api/usuario/login", {
      //     correo: form.user,
      //     contrasena: form.password,
      //   }),
      mutationFn: (request: ILogin) => {
        return signIn("user", {
          ...{ correo: request.user, contrasena: request.password },
          redirect: false,
        });
      },
      onSuccess: (data) => {
        // setToken(data.data.token);
        if (data?.status === 200) {
          return console.log("Loggueado", data);
        }
        if (data?.status === 401) {
          console.error("data 401", data);
          notifyUSerError()
          return 
        }
        notifyError();
  
      },
    });
  }