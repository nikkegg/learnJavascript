// Exporting module
const shippingCost = 10;
const cart = [];
const addToCart = (product, quantity) => {
  cart.push({product, quantity});
  console.log(`${quantity} ${product} has been added to cart`);
}
export { addToCart, cart, shippingCost }
