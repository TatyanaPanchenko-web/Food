import { useAuthForm } from "@/bll/useAuthForm";
import iconGoogle from "@/assets/icons/google.png";
import style from "./autorization.module.scss";

export default function Autorization() {
  const { register, handleSubmit, errors, errAuth, onSubmit, loginGoogle } =
    useAuthForm();
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
        <button onClick={loginGoogle} className={style["autorization-google"]}>
          <img src={iconGoogle} alt="google" title="Войти с помощью Google" />
        </button>
      </div>
    </div>
  );
}
