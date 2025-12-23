import { getItemsCount } from "@/common/cartHandler";
import { useCartDetails } from "@/bll/useCartDetails";
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
  const { cartElements } = shopStore;
  const {
    modalDeliveryStatus,
    changeModalDeliveryStatus,
    submittedSuccess,
    changeSubmittedSuccess,
    checkPromo,
    handleOrder,
    handleDeleteCart,
  } = useCartDetails(dataAuth);

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
          <ModalSuccess changeSubmittedSuccess={changeSubmittedSuccess} />
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
          dataAuth={dataAuth}
          changeSubmittedSuccess={changeSubmittedSuccess}
          changeModalDeliveryStatus={changeModalDeliveryStatus}
        />
      )}
    </div>
  );
}
