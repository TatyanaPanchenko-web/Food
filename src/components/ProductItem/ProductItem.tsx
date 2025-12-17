import { useState } from "react";
import { addItemCart } from "@/common/cartHandler";
import ModalProduct from "@/components/ModalProduct/ModalProduct";
import shopStore from "@/store/shopStore";
import { DataProductsType, UploadType, NavItemType } from "@/types/index";
import style from "./productItem.module.scss";

type ProductItemPropsType = {
  item: DataProductsType;
  index: number;
  userUid: string | undefined;
};

export default function ProductItem({
  item,
  index,
  userUid,
}: ProductItemPropsType) {
  const { cartElements, upload, activeTab } = shopStore;
  const [modalProductStatus, setModalProductStatus] = useState<boolean>(false);
  const imgUrl = `products/${activeTab.product_name}/${activeTab.product_name}_${index}.webp`;
  const { name, weight, price, promotion } = item;
  return (
    <>
      <div className={style["meal-menu-item"]} key={index}>
        <div
          className={style["meal-menu-inner"]}
          onClick={() => {
            setModalProductStatus(true);
          }}
        >
          {promotion && (
            <div className={style["meal-menu-promotion"]}>
              <span>Акция</span>
            </div>
          )}
          <div className={style["meal-menu-img"]}>
            <img src={imgUrl} alt={name} />
          </div>
          <div className={style["meal-menu-price"]}>{price}₽</div>
          <div className={style["meal-menu-name"]}>{name}</div>
          <div className={style["meal-menu-weight"]}>{weight}</div>
        </div>
        <button
          onClick={() =>
            addItemCart(item, userUid, cartElements.data, upload, imgUrl)
          }
          className={style["meal-menu-btn"]}
        >
          Добавить
        </button>
        {modalProductStatus ? (
          <ModalProduct
            item={item}
            imgUrl={imgUrl}
            setModalProductStatus={setModalProductStatus}
            userUid={userUid}
          />
        ) : null}
      </div>
    </>
  );
}
