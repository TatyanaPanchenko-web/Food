import NavItem from "../NavItem/NavItem";
import nav from "@/data/nav.json";

import style from "./nav.module.scss";

export default function Nav() {
  return (
    <nav className={style.nav}>
      <div className={style["nav-container"]}>
        <div className={style["nav-items"]}>
          {nav.map((item, index) => {
            return <NavItem key={index} item={item} />;
          })}
        </div>
      </div>
    </nav>
  );
}
