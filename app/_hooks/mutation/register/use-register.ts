"use client";

import { useMutation } from "@tanstack/react-query";

import { MUTATION_REGISTER } from "@/app/_constants";
import { IRegister } from "@/app/_types";
import { http } from '@/app/_hooks/axios';


export function useRegister() {
  return useMutation({
    mutationKey: [MUTATION_REGISTER],
    mutationFn: async (form: IRegister) => {

      const response = await http("USUARIO").post(`/register`, {
        email: form.user,
        name: form.name,
        last_name: form.lastName,
        password: form.password,
      
      })
      console.log('response', response)
      return response },
    onSuccess: (data) => {
      console.log("creado exitosamente");
    },
  });
}