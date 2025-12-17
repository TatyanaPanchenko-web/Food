export type UserInfoType = {
  name: string;
  email: string;
  uid: string;
  data: string;
  agreement?: boolean;
  promo?: false;
};

export type DataProductsType = {
  id: string;
  count: number;
  description: string;
  ingredients: string[];
  name: string;
  price: string;
  promotion: boolean;
  weight: string;
  colorie?: string;
  imgUrl?: string;
};

export type RegFormType = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  data: string;
  agreement: boolean | undefined;
  promo: boolean | undefined;
};

export type ModalFormType = {
  address: string;
  delivery: string;
  firstName: string;
  floor: string;
  intercom: string;
  phone: string;
  point?: string;
};

export type dataAuthType = {
  email: string;
  password: string;
};

export type NavItemType = {
  img: string;
  name: string;
  product_name: string;
};
