// Importing module
import { addToCart } from './shoppingCart.js';
// importing everything. Still have to export things from the other file, otherwise
// error will be thrown.
import * as ATC from './shoppingCart.js';
// default export are used when only one thing from a module needs to be imported. Default imports do no use curly braces
addToCart('bread', 5);
addToCart('mustard', 5);
console.log(ATC.cart)

// importing and exporting in node.js

// to export: export.itemName is exported
// to import: const { itemName} = require('./rel_path')
