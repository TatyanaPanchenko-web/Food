import ProductItem from "../ProductItem/ProductItem";
import shopStore from "@/store/shopStore";
import style from "./mealMenu.module.scss";

type MealMenuPropsType = {
  userUid: string | undefined;
};

export default function MealMenu({ userUid }: MealMenuPropsType) {
  const { products, activeTab } = shopStore;
  return (
    <div className={style["meal-menu"]}>
      <div className={style["meal-menu-title"]}>{activeTab.name}</div>
      <div className={style["meal-menu-wrapper"]}>
        {products.data &&
          products.data.map((item, index) => {
            return (
              <ProductItem
                key={index}
                item={item}
                index={index}
                userUid={userUid}
              />
            );
          })}
      </div>
    </div>
  );
}
