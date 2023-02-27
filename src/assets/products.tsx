type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number;
  rebatePercent: number;
  upsellProductId: string | null;
  image: string;
};

export type BasketItems = Product & {
  quantity: number;
  giftWrap: boolean;
};

const products: Product[] = [
  {
    id: "clear-whey-100",
    name: "Clear Whey 100, 1 kg",
    price: 150,
    currency: "DKK",
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    image: "/clear_whey.png"
  },
  {
    id: "valle-protion-whey-100-vanilla",
    name: "Whey-100 Vanilla, 1 kg",
    price: 170,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 25,
    upsellProductId: "vitamin-c-depot-500-250",
    image: "/vanilla_whey.png"
  },
  {
    id: "valle-protein-whey-100-chocolate",
    name: "Whey-100 Chocolate, 1 kg",
    price: 170,
    currency: "DKK",
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    image: "/chocolate_whey.png"
  },
  {
    id: "fish-oil-1000-120",
    name: "Omega 3 fiskeolie, 1000mg, 120 stk",
    price: 69,
    currency: "DKK",
    rebateQuantity: 5,
    rebatePercent: 10,
    upsellProductId: null,
    image: "/fiske_olie.png"
  },
  {
    id: "sugar-white-1kg",
    name: "Sukker, hvidt, 1000g",
    price: 30,
    currency: "DKK",
    rebateQuantity: 4,
    rebatePercent: 25,
    upsellProductId: "sugar-cane-1kg",
    image: "test"
  },
  {
    id: "sugar-cane-1kg",
    name: "Rørsukker, 1000g",
    price: 40,
    currency: "DKK",
    rebateQuantity: 4,
    rebatePercent: 25,
    upsellProductId: "sugar-organic-1kg",
    image: "test"
  },
  {
    id: "sugar-organic-1kg",
    name: "Rørsukker, økologisk, 1000g",
    price: 45,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: null,
    image: "test"
  },
];

export default products;

export const itemDict: { [key: string]: Product } = products.reduce(
  (acc, products) => ({ ...acc, [products.id]: products }),
  {}
);
