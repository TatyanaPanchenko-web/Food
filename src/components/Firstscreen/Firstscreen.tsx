import logoInTitle from "@/assets/icons/logo-white.svg";
import style from "./firstscreen.module.scss";

export default function Firstscreen() {
  return (
    <div className={style["firstscreen"]}>
      <div className={style["firstscreen-bg"]}>
        <div className={style["firstscreen-container"]}>
          <div className={style["firstscreen-wrapper"]}>
            <div className={style["firstscreen-title"]}>
              <div className={style["firstscreen-inner"]}>
                <span>Фаст</span>
                <img src={logoInTitle} alt="logo" />
              </div>
              <p>без компромиссов</p>
            </div>
            <div className={style["firstscreen-subtitle"]}>
              Бесплатная доставка от 599₽
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
