import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import validator from "validator";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import CustomizedCheckbox from "./CustomizedCheckbox";
import { addRegData } from "@/services/FB";
import type { RegFormType } from "@/types/index";
import style from "./registration.module.scss";

type RegistrationPropsType = {
  setRegdata: React.Dispatch<React.SetStateAction<boolean>>;
};
type errAuthType = {
  status: boolean;
  message: string;
};
export default function Registration({ setRegdata }: RegistrationPropsType) {
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

  return (
    <div className={style["registration-wrapper"]}>
      <div className={style["registration-title"]}>Регистрация</div>
      <form
        className={style["registration-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        {errAuth.status && (
          <div className={`${style.errorField} ${style.auth}`}>
            {errAuth.message}
          </div>
        )}
        <div className={style["registration-inner"]}>
          <input
            placeholder="Имя"
            {...register("displayName", {
              required: "Необходимо заполнить данное поле",
              maxLength: 30,
              minLength: {
                value: 2,
                message: "Некорректное значение",
              },
              pattern: {
                value: /^[A-Za-z, А-Яа-я]+$/i,
                message: "Поле содержит недопустимые символы",
              },
            })}
          />
          {errors.displayName && (
            <p className={style.errorField}>{errors.displayName?.message}</p>
          )}

          <input
            placeholder="E-mail"
            {...register("email", {
              required: "Необходимо заполнить данное поле",
              maxLength: 40,
              pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                message: "Поле содержит недопустимые символы",
              },
            })}
          />
          {errors.email && (
            <p className={style.errorField}>{errors.email?.message}</p>
          )}

          <label className={style["registration-date"]}>
            <span> Дата рождения</span>

            <input
              placeholder="Дата рождения"
              type="date"
              max="2025-01-01"
              {...register("data", {
                onChange: (e) => validateDate(e.target.value),
                required: "Необходимо заполнить данное поле",
              })}
            />
            {errors.data && (
              <p className={style.errorField}>{errors.data?.message}</p>
            )}
            {errorData && <p className={style.errorField}>{errorData}</p>}
          </label>

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

          <input
            placeholder="Подтверждение пароля"
            type="password"
            {...register("confirmPassword", {
              required: "Необходимо заполнить данное поле",
              minLength: {
                value: 6,
                message: "Поле должно содержать не менее 6 символов",
              },
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Пароли не совпадают";
              },
            })}
          />
          {errors.confirmPassword && (
            <p className={style.errorField}>
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>

        <label>
          <Controller
            name="agreement"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomizedCheckbox
                label={"Согласие на обработку персональных данных"}
                {...field}
              />
            )}
          />
          {errors.agreement && (
            <p className={style.errorField}>Необходимо отметить данное поле</p>
          )}
        </label>

        <label>
          <Controller
            name="promo"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <CustomizedCheckbox
                label={"Согласие на получение акционных предложений"}
                {...field}
              />
            )}
          />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}
