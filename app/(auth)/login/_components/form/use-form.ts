"use client";
import { useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { useLogin } from "@/app/_hooks";
import { route } from "@/app/_constants";
import { containsSQLInjection, messageSqlInjection } from "@/app/_helpers";

interface FormType {
  user: string;
  password: string;
}

export function useFormHook() {
  const mutation = useLogin();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const notify = () => toast("sesion iniciada!");
  const notifyError = () => toast("hubo un fallo!");

  const schema = object({
    user: string()
      .trim()
      .email("Invalid email address")
      .required()
      .test(
        "sql-injection",
        messageSqlInjection,
        (value) => !containsSQLInjection(value || "")
      ),
    password: string()
      .trim()
      .required()
      .test(
        "sql-injection",
        messageSqlInjection,
        (value) => !containsSQLInjection(value || "")
      ),
  }).required();

  const methods = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit = methods.handleSubmit(
    (dataForm) => {
      setLoading(true);
      try {
        mutation.mutateAsync(dataForm).then((data) => {
          if (data?.status === 200) {
            notify();
            router.push(route.principal);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
            return
          }
          notifyError();
          setLoading(false);
        });
      } catch (error: any) {
        setLoading(false);
        notifyError();
        console.error(error);
      }
    },
    (err) => {
      console.error("error form", err);
      setLoading(false);
    }
  );

  return {
    control: methods.control,
    onSubmit,
    isLoading: loading,
  };
}
