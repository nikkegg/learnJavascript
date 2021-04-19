// Importing module
import { addToCart } from './shoppingCart.js';
// importing everything. Still have to export things from the other file, otherwise
// error will be thrown.
import * as ATC from './shoppingCart.js';
addToCart('bread', 5)
console.log(ATC.cart)
