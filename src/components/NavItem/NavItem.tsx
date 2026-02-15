import { NavItemType } from "@/types/index";
import shopStore from "@/store/shopStore";
import style from "./navItem.module.scss";

type NavItemPropsType = {
  item: NavItemType;
};
export default function NavItem({ item }: NavItemPropsType) {
  const { activeTab, setActiveTab } = shopStore;
  const activeItem =
    activeTab.product_name === item["product_name"] ? style["active"] : "";
  return (
    <button
      className={`${style["nav-item"]} ${activeItem}`}
      onClick={() => {
        setActiveTab(item);
      }}
    >
      <div className={style["nav-img"]}>
        <img src={item.img} alt={item.name} />
      </div>
      <div className={style["item-name"]}>{item.name}</div>
    </button>
  );
}
