import { useState } from "react";
import { getItemsCount } from "@/common/cartHandler";
import { deleteAllCart } from "@/services/FB";
import { useNavigate } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import ModalDelivery from "../ModalDelivery/ModalDelivery";
import ModalSuccess from "../ModalSuccess/ModalSuccess";
import shopStore from "@/store/shopStore";
import { UserInfoType } from "@/types/index";
import style from "./cart.module.scss";

type CartPropsType = {
  dataAuth: UserInfoType | null;
};

export default function Cart({ dataAuth }: CartPropsType) {
  const { cartElements, changeUpload } = shopStore;
  const [modalDeliveryStatus, setModalDeliveryStatus] =
    useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const checkPromo = cartElements.data.filter(
    (item) => item.promotion === true
  );
  const handleOrder = () => {
    if (!dataAuth?.uid) {
      navigate("/authorization");
    }
    setModalDeliveryStatus(true);
  };

  const handleDeleteCart = (uid: string | undefined) => {
    if (!uid) {
      localStorage.removeItem("cart");
      changeUpload();
      return;
    }
    deleteAllCart(uid);
    changeUpload();
  };

  if (cartElements.data.length === 0) {
    return (
      <div className={style.cart}>
        <div className={style["cart-wrapper"]}>
          <div className={style["cart-top"]}>
            <div className={style["cart-title"]}>Корзина</div>
            <div className={style["cart-totalCount"]}>
              <span>0</span>
            </div>
          </div>
          <div className={style["cart-empty"]}>Тут пока пусто :(</div>
        </div>
        {submittedSuccess && (
          <ModalSuccess setSubmittedSuccess={setSubmittedSuccess} />
        )}
      </div>
    );
  }
  return (
    <div className={style.cart}>
      <div className={style["cart-wrapper"]}>
        <div className={style["cart-top"]}>
          <div className={style["cart-title"]}>Корзина</div>
          <div className={style["cart-totalCount"]}>
            <span>{getItemsCount(cartElements.data)}</span>
          </div>
        </div>
        <div className={style["cart-inner"]}>
          <div className={style["cart-items"]}>
            {cartElements.data.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  indexElement={index}
                  item={item}
                  userUid={dataAuth?.uid}
                />
              );
            })}
          </div>
        </div>
        <div className={style["cart-bottom"]}>
          <div
            className={style["cart-delete"]}
            onClick={() => {
              handleDeleteCart(dataAuth?.uid);
            }}
          >
            Очистить корзину
          </div>
          <div className={style["cart-total"]}>
            <span>Итого</span>
            <div className={style["cart-totalPrice"]}>
              {getItemsCount(cartElements.data, true)}₽
            </div>
          </div>
          <button className={style["cart-order"]} onClick={handleOrder}>
            Оформить заказ
          </button>
          {checkPromo.length > 0 ||
          getItemsCount(cartElements.data) > 3 ||
          getItemsCount(cartElements.data, true) > 1000 ? (
            <div className={style["cart-delivery"]}>Бесплатная доставка</div>
          ) : null}
        </div>
      </div>

      {modalDeliveryStatus && dataAuth?.uid && (
        <ModalDelivery
          setModalDeliveryStatus={setModalDeliveryStatus}
          setSubmittedSuccess={setSubmittedSuccess}
          dataAuth={dataAuth}
        />
      )}
    </div>
  );
}
