const { LocalStorage } = require("node-localstorage");

// constructor function to create a storage directory inside our project for all our localStorage setItem.
var localStorage = new LocalStorage("./scratch");

//console.log localStorage item with the key Name

function getStorageItem(key) {
  return localStorage.getItem(key);
}

module.exports = getStorageItem;
