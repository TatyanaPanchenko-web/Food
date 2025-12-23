import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import validator from "validator";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { addRegData } from "@/services/FB";
import type { RegFormType } from "@/types/index";

type errAuthType = {
  status: boolean;
  message: string;
};

export const useRegForm = (setRegdata:React.Dispatch<React.SetStateAction<boolean>>) => {
  const [errorData, setErrorData] = useState<string>("");
  const [errAuth, setErrAuth] = useState<errAuthType>({
    status: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegFormType>({
    defaultValues: {
      promo: false,
    },
  });

  const auth = getAuth();
  const onSubmit: SubmitHandler<RegFormType> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        addRegData(data, user.uid);
        setRegdata(true);
      })
      .catch((error) => {
        console.error(error.message);
        setErrAuth({
          status: true,
          message: "Пользователь с таким email уже существует",
        });
      });
    reset();
  };

  const validateDate = (value: string) => {
    if (value.length === 10) {
      const isValidDateFormat = validator.isDate(value, {
        format: "YYYY-MM-DD",
        strictMode: true,
      });

      const currentValue = new Date(value);
      const min = new Date("1900-01-01");
      const max = new Date("2020-01-01");

      if (isValidDateFormat && currentValue >= min && currentValue <= max) {
        setErrorData("");
      } else {
        setErrorData("Дата выходит за границы");
      }
    } else {
      setErrorData("Введите корректную дату в формате DD-MM-YYYY");
    }
  };
  return {
    errorData,
    errAuth,
    register,
    handleSubmit,
    control,
    getValues,
    errors,
    onSubmit,
    validateDate,
  };
};
