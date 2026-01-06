import style from "./errorPage.module.scss";

export default function ErrorPage() {
  return (
    <div className={style.error}>
      <div className={style["error-title"]}> Такой страницы нет</div>

      <div className={style["error-img"]}>
        <img src="/icons/pizza.png" alt="pizza"></img>
      </div>
    </div>
  );
}
