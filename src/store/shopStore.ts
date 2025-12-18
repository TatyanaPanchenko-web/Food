import { makeAutoObservable, runInAction } from "mobx";
import { getData } from "@/services/FB";
import { DataProductsType, NavItemType } from "@/types";

type ProductsState = {
  data: DataProductsType[];
  status: boolean;
};

type CartState = {
  data: DataProductsType[];
  dataKeys: string[] | null;
  status: boolean;
};

class ShopStore {
  products: ProductsState = {
    data: [],
    status: false,
  };

  cartElements: CartState = {
    data: [],
    dataKeys: [],
    status: false,
  };

  status: boolean = false;

  activeTab = {
    img: "./nav/burgers.png",
    name: "Бургеры",
    product_name: "burgers",
  };

  get upload() {
    return {
      status: this.status,
      dataKeys: this.cartElements.dataKeys,
    };
  }

  constructor() {
    makeAutoObservable(this);
  }

  loadProductsAndCart = async (activeTab: NavItemType, uid?: string) => {
    const productsRequest = getData(`products/${activeTab.product_name}`);
    const cartRequest = uid ? getData(`cart/${uid}`) : Promise.resolve(null);

    const [productsResult, cartResult] = await Promise.allSettled([
      productsRequest,
      cartRequest,
    ]);
    runInAction(() => {
      if (
        productsResult.status === "fulfilled" &&
        productsResult.value &&
        Array.isArray(productsResult.value)
      ) {
        this.products.data = productsResult.value;
        this.products.status = true;
      }

      if (cartResult.status === "fulfilled" && cartResult.value) {
        this.cartElements.data = Object.values(cartResult.value);
        this.cartElements.dataKeys = Object.keys(cartResult.value);
        this.cartElements.status = true;
      } else if (
        cartResult.status === "fulfilled" &&
        cartResult.value === null
      ) {
        this.cartElements.data = [];
        this.cartElements.dataKeys = [];
        this.cartElements.status = true;
      }
    });

    runInAction(() => {
      if (!uid) {
        const storedCartStr = localStorage.getItem("cart");
        if (storedCartStr) {
          try {
            const localCart: DataProductsType[] = JSON.parse(storedCartStr);
            this.cartElements.data = localCart;
            this.cartElements.dataKeys = null;
            this.cartElements.status = true;
            // setCartElements({ data: localCart, dataKeys: null, status: true });
          } catch (error) {
            console.error("Ошибка парсинга корзины из localStorage:", error);
            this.cartElements.data = [];
            this.cartElements.dataKeys = null;
            this.cartElements.status = true;
            // setCartElements({ data: [], dataKeys: null, status: true });
          }
        } else {
          this.cartElements.data = [];
          this.cartElements.dataKeys = null;
          this.cartElements.status = true;
          // setCartElements({ data: [], dataKeys: null, status: true });
        }
      }
    });
  };

  setActiveTab = (item: NavItemType) => {
    this.activeTab = item;
  };
  changeUpload = () => {
    this.status = !this.status;
  };
}

export default new ShopStore();
