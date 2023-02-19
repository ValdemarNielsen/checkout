type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number;
  rebatePercent: number;
  upsellProductId: string | null;
  quantity: number;
};

const products: Product[] = [
  {
    id: "vitamin-d-90-100",
    name: "D-vitamin, 90ug, 100 stk",
    price: 116,
    currency: "DKK",
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "vitamin-c-500-250",
    name: "C-vitamin, 500mg, 250 stk",
    price: 150,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 25,
    upsellProductId: "vitamin-c-depot-500-250",
    quantity: 1,
  },
  {
    id: "vitamin-c-depot-500-250",
    name: "C-vitamin Depot, 500mg, 250 stk",
    price: 175,
    currency: "DKK",
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "fish-oil-1000-120",
    name: "Omega 3 fiskeolie, 1000mg, 120 stk",
    price: 69,
    currency: "DKK",
    rebateQuantity: 5,
    rebatePercent: 10,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "coffee-grinder",
    name: "Kaffekværn",
    price: 145,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: "coffee-grinder-pro",
    quantity: 1,
  },
  {
    id: "coffee-grinder-pro",
    name: "Kaffekværn Præcision",
    price: 320,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "toothbrush",
    name: "Tandbørste, 5stk",
    price: 40,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: "toothbrush-bamboo",
    quantity: 1,
  },
  {
    id: "toothbrush-bamboo",
    name: "Tandbørste i bambus, 3stk",
    price: 40,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "trimmer",
    name: "Barbermaskine",
    price: 200,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: "trimmer-battery",
    quantity: 1,
  },
  {
    id: "trimmer-battery",
    name: "Barbermaskine m batteri",
    price: 350,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "hair-clip",
    name: "Hårklemme",
    price: 25,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 20,
    upsellProductId: "hair-clip-large",
    quantity: 1,
  },
  {
    id: "hair-clip-large",
    name: "Hårklemme, stor",
    price: 45,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "scarf-cotton",
    name: "Tørklæde, bomuld",
    price: 100,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: "scarf-wool",
    quantity: 1,
  },
  {
    id: "scarf-wool",
    name: "Tørklæde, uld",
    price: 150,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: "scarf-silk",
    quantity: 1,
  },
  {
    id: "scarf-silk",
    name: "Tørklæde, silke",
    price: 250,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "cap",
    name: "Kasket",
    price: 150,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: "cap-flat",
    quantity: 1,
  },
  {
    id: "cap-flat",
    name: "Kasket, sixpence",
    price: 590,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "teddy",
    name: "Plysbamse",
    price: 75,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: "teddy-large",
    quantity: 1,
  },
  {
    id: "teddy-large",
    name: "Plysbamse, stor",
    price: 150,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "kids-songbook",
    name: "De små synger",
    price: 120,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: "kids-songbook-hardcover",
    quantity: 1,
  },
  {
    id: "kids-songbook-hardcover",
    name: "De små synger, indbundet",
    price: 180,
    currency: "DKK",
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "coffeebeans-500g",
    name: "Kaffebønner",
    price: 50,
    currency: "DKK",
    rebateQuantity: 4,
    rebatePercent: 25,
    upsellProductId: "coffeebeans-organic-500g",
    quantity: 1,
  },
  {
    id: "coffeebeans-organic-500g",
    name: "Kaffebønner, økologiske",
    price: 60,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "the-english-100g",
    name: "Sort te, 100g",
    price: 20,
    currency: "DKK",
    rebateQuantity: 4,
    rebatePercent: 25,
    upsellProductId: "the-darjeeling-100g",
    quantity: 1,
  },
  {
    id: "the-darjeeling-100g",
    name: "Sort te, Darjeeling, 100g",
    price: 30,
    currency: "DKK",
    rebateQuantity: 4,
    rebatePercent: 25,
    upsellProductId: "the-organic-100g",
    quantity: 1,
  },
  {
    id: "the-organic-100g",
    name: "Sort te, Darjeeling, økologisk, 100g",
    price: 35,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: null,
    quantity: 1,
  },
  {
    id: "sugar-white-1kg",
    name: "Sukker, hvidt, 1000g",
    price: 30,
    currency: "DKK",
    rebateQuantity: 4,
    rebatePercent: 25,
    upsellProductId: "sugar-cane-1kg",
    quantity: 1,
  },
  {
    id: "sugar-cane-1kg",
    name: "Rørsukker, 1000g",
    price: 40,
    currency: "DKK",
    rebateQuantity: 4,
    rebatePercent: 25,
    upsellProductId: "sugar-organic-1kg",
    quantity: 1,
  },
  {
    id: "sugar-organic-1kg",
    name: "Rørsukker, økologisk, 1000g",
    price: 45,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 10,
    upsellProductId: null,
    quantity: 1,
  },
];

export default products;

//Create a function that takes the products price for all products and returns the total price of all products.

function totalPrice(product: any) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price;
  }
  return total;
}

//Make the totalPrice function return the total price of all products with a rebate based on correct quantity of products.

function totalPriceRebate(product: any) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].quantity >= products[i].rebateQuantity) {
      total += products[i].price * (1 - products[i].rebatePercent / 100);
    } else {
      total += products[i].price;
    }
  }
  return total;
}
