// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
// bg-white border-white
// bg-orange-400 border-orange-400

import { PRODUCT_PRICES } from "@/config/products";

export const COLORS = [
  { label: "Black", value: "black", tw: "zinc-900" },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  { label: "Rose", value: "rose", tw: "rose-950" },
  { label: "White", value: "white", tw: "white" },
  { label: "Orange", value: "orange", tw: "orange-400" },
] as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Default",
      value: "default",
      description: "Same as provided",
      price: PRODUCT_PRICES.finish.default,
    },
    {
      label: "Silk Matte",
      value: "silk",
      description: "Smooth, but non-gloss finish",
      price: PRODUCT_PRICES.finish.silk,
    },
    {
      label: "Coarse Matte",
      value: "coarse",
      description: "Non-gloss, but has a rough texture that you can feel",
      price: PRODUCT_PRICES.finish.coarse,
    },
    {
      label: "Gloss",
      value: "gloss",
      description: "Shiny, with a high-sheen gloss finish",
      price: PRODUCT_PRICES.finish.gloss,
    },
    {
      label: "Foil",
      value: "foil",
      description: "Metal appearance finish",
      price: PRODUCT_PRICES.finish.foil,
    },
  ],
} as const;
