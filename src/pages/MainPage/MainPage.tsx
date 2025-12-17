import { useEffect } from "react";
import MealMenu from "@/components/MealMenu/MealMenu";
import Cart from "@/components/Cart/Cart";
import Firstscreen from "@/components/Firstscreen/Firstscreen";
import Nav from "@/components/Nav/Nav";
import Loader from "@/components/Loader/Loader";
import { UserInfoType } from "@/types/index";
import shopStore from "@/store/shopStore";
import style from "./mainPage.module.scss";

type MainPagePropsType = {
  dataAuth: UserInfoType | null;
};

export default function MainPage({ dataAuth }: MainPagePropsType) {
  const { products, cartElements, status, activeTab, loadProductsAndCart } =
    shopStore;

  useEffect(() => {
    loadProductsAndCart(activeTab, dataAuth?.uid);
  }, [status, activeTab, dataAuth?.uid]);

  return (
    <>
      <Firstscreen />
      <Nav />
      {!cartElements.status || !products.status ? (
        <section className={style.main}>
          <div className={style.loading}>
            <Loader />
          </div>
        </section>
      ) : (
        <section className={style.main}>
          <div className={style["main-container"]}>
            <div className={style["main-wrapper"]}>
              <Cart dataAuth={dataAuth} />
              <MealMenu userUid={dataAuth?.uid} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
