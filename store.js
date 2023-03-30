// import {LocalStorage} from 'node-localstorage'
const { LocalStorage } = require("node-localstorage");

const bcrypt = require("bcrypt");

// constructor function to create a storage directory inside our project for all our localStorage setItem.
var localStorage = new LocalStorage("./scratch");

//Setting localStorage Item
async function storeItem(key, value) {
  localStorage.setItem(key, value);
}

module.exports = storeItem;
