import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";
import { addRegData } from "@/services/FB";
import { dataAuthType } from "@/types/index";

type errAuthType = {
  status: boolean;
  message: string;
};
type errorObjType = {
  message: string;
};

export const useAuthForm = () => {
  const [errAuth, setErrAuth] = useState<errAuthType>({
    status: false,
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dataAuthType>();
  const auth = getAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<dataAuthType> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/");
      })
      .catch((error: errorObjType) => {
        console.error(error.message);
        setErrAuth({ status: true, message: "Неверный e-mail или пароль" });
      });
  };

  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const user: User | null = result.user;
        addRegData(user, user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        setErrAuth({ status: true, message: "Ошибка авторизации Google" });
      });
  };

  return {
    register,
    handleSubmit,
    errors,
    errAuth,
    onSubmit,
    loginGoogle,
  };
};
