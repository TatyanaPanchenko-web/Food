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
import iconGoogle from "@/assets/icons/google.png";
import style from "./autorization.module.scss";

type errAuthType = {
  status: boolean;
  message: string;
};
type errorObjType = {
  message: string;
};

export default function Autorization() {
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

  return (
    <div className={style.autorization}>
      <div className={style["autorization-wrapper"]}>
        <div className={style["autorization-title"]}>Авторизация</div>

        <form
          className={style["autorization-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          {errAuth.status && (
            <div className={`${style.errorField} ${style.auth}`}>
              {errAuth.message}
            </div>
          )}
          <input
            placeholder="E-mail"
            {...register("email", {
              required: "Необходимо заполнить данное поле",
              pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                message: "Поле содержит недопустимые символы",
              },
            })}
          />
          {errors.email && (
            <p className={style.errorField}>{errors.email?.message}</p>
          )}
          <input
            placeholder="Пароль"
            type="password"
            {...register("password", {
              required: "Необходимо заполнить данное поле",
              minLength: {
                value: 6,
                message: "Поле должно содержать не менее 6 символов",
              },
            })}
          />
          {errors.password && (
            <p className={style.errorField}>{errors.password?.message}</p>
          )}

          <input type="submit" value="Войти" />
        </form>
        <div onClick={loginGoogle} className={style["autorization-google"]}>
          <img src={iconGoogle} alt="google" title="Войти с помощью Google" />
        </div>
      </div>
    </div>
  );
}
