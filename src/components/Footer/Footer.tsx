import { Link } from "react-router-dom";
import logo from "@/assets/icons/logo-white.svg";
import telegram from "@/assets/icons/tg.png";
import vk from "@/assets/icons/vk.png";
import style from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style["footer-container"]}>
        <div className={style["footer-wrapper"]}>
          <div className={style["footer-logo"]}>
            <Link to="/" className="link">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className={style["footer-inner"]}>
            <div className={style["footer-phone"]}>
              <div className={style["footer-title"]}>Номер для заказа</div>
              <div className={style["footer-content"]}>
                <a
                  href="tel:+79308333811"
                  className={style["footer-content-phone"]}
                >
                  +7(930)833-38-11
                </a>
              </div>
            </div>
            <div className={style["footer-social"]}>
              <div className={style["footer-title"]}>Мы в соцсетях</div>
              <div className={style["footer-content"]}>
                <a href="https://web.telegram.org/" target="_blank">
                  <img src={telegram} alt="telegram" />
                </a>

                <a href="https://vk.com/" target="_blank">
                  <img src={vk} alt="vk" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={style["footer-bottom"]}>
          <div>© Food, 2024-2025.</div>
        </div>
      </div>
    </footer>
  );
}
