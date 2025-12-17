import { changeCountCartItem } from "@/common/cartHandler";
import shopStore from "@/store/shopStore";
import { DataProductsType } from "@/types/index";
import style from "./cartItem.module.scss";

type CartItemPropsType = {
  item: DataProductsType;
  indexElement: number;
  userUid: string | undefined;
};

export default function CartItem({
  item,
  indexElement,
  userUid,
}: CartItemPropsType) {
  const { cartElements, upload } = shopStore;
  const { name, weight, price, count, imgUrl } = item;

  return (
    <div className={style["cart-item"]}>
      <div className={style["item-about"]}>
        <div className={style["item-img"]}>
          <img src={imgUrl} alt={name} />
        </div>
        <div className={style["item-description"]}>
          <div className={style["item-name"]}>{name}</div>
          <div className={style["item-weight"]}>{weight}</div>
          <div className={style["item-price"]}>{price}₽</div>
        </div>
      </div>
      <div className={style["item-counter"]}>
        <button
          onClick={() => {
            changeCountCartItem(
              cartElements.data,
              false,
              userUid,
              item,
              upload,
              indexElement
            );
          }}
        >
          −
        </button>
        <div>{count}</div>
        <button
          onClick={() => {
            changeCountCartItem(
              cartElements.data,
              true,
              userUid,
              item,
              upload,
              indexElement
            );
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
