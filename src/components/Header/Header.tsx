import { Link } from "react-router-dom";
import { useGetAuthData } from "@/bll/useGetAuthData";
import { useInfoAboutUser } from "@/bll/useInfoAboutUser";
import logo from "@/assets/icons/logo.svg";
import iconUser from "@/assets/icons/user.svg";
import style from "./header.module.scss";

export default function Header() {
  const { userInfo, userSignOut } = useGetAuthData();
  const { isOpenInfo, loginRef, changeIsOpenInfo } = useInfoAboutUser();
  return (
    <header className={style.header}>
      <div className={style["header-container"]}>
        <Link to="/" className={style["header-logo"]}>
          <img src={logo} alt="logo" />
        </Link>
        <div ref={loginRef} className={style["header-login"]}>
          {userInfo ? (
            <>
              <img
                onClick={changeIsOpenInfo}
                src={iconUser}
                className={style["header-login-icon"]}
                alt="user"
              />
              {isOpenInfo && (
                <div className={style["header-login-inner"]}>
                  <div className={style["header-login-info"]}>
                    <div>
                      <b>Имя: </b>
                      {userInfo.name}
                    </div>
                    <div>
                      <b>Email:</b> {userInfo.email}
                    </div>
                  </div>

                  <div
                    onClick={userSignOut}
                    className={style["header-signout-btn"]}
                  >
                    Выход
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={style["header-signin-btn"]}>
              <Link to="/authorization" className="link">
                Авторизация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
