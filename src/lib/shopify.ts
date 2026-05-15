import Client from "shopify-buy";

export const shopifyClient = Client.buildClient({
  domain: "rq7r20-1j.myshopify.com",
  storefrontAccessToken: "bb1921abdade6d99be26b363b0c5d819",
  apiVersion: "2023-04",
});
