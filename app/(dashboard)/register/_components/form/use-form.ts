"use client";
import { useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegister } from "@/app/_hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { route } from "@/app/_constants";
import { containsSQLInjection, messageSqlInjection } from "@/app/_helpers";

interface FormType {
  user: string;
  password: string;
  name: string;
  lastName: string;
}

export function useFormHook() {
  const mutation = useRegister();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const notifySucces = () => toast("registrado correctamente!");
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
    name: string()
      .trim()
      .required()
      .test(
        "sql-injection",
        messageSqlInjection,
        (value) => !containsSQLInjection(value || "")
      ),
    lastName: string()
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
      name: "",
      lastName: "",
    },
  });

  const onSubmit = methods.handleSubmit(
    (dataForm) => {
      setLoading(true);
      try {
        mutation.mutateAsync(dataForm).then((data) => {
          if (data?.status === 200) {
            notifySucces();
            router.push(route.principal);
            return
          }
          setLoading(false);
          notifyError();
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
