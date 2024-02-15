import React, { createContext, useState } from "react";
import JustRealFoodApi from "./api/just_real_food_api";

// initialize CartContext by creating an object containing everything you want other components to be able to access and export it
export const NewCartContext = createContext({
  items: [],
  // functions are not defined within Context, they are defined below. These are just placeholders. The functions are passed to the values of the Provider as ContextValues
  getProductQuantity: () => {},
  addOneItemToCart: () => {},
  removeOneItemFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: async () => {},
  getProductData: async () => {},
});

// any components wrapped by CartProvider are the {children}
export function CartProvider({ children }) {
  // initialize piece of state 'cartProducts' to an empty array. It will store all the items and their ids, names, prices and quantities that have been added to the cart (i.e. [{id:price_1OhYS8DDC8UyWYkq9owqgv54, name: 'Beef & Salmon', price: 98.49, quantity:1}, {id:price_1OhYS8DDC8UyWYkq9owqgv54 , name: 'Chicken & Turkey', price: 98.49, quantity:2}, ...])
  const [cartProducts, setCartProducts] = useState([]);

  async function getProductData(id) {
    // retreive all products
    let productsArray = await JustRealFoodApi.getAllProducts();

    // .find() loops over every 'product' in productsArray and looks to see if the product.id equals the 'id' passed in from the parameters. The product object with matching id is returned.
    // (i.e. for product with id=price_1OhYS8DDC8UyWYkq9owqgv54, productData = {id: 'price_1OhYS8DDC8UyWYkq9owqgv54', name: 'Chicken & Turkey', ingredients: 'Chicken, turkey, chicken hearts, flaxseed, sweet p…d yeast, mixed tocopherols (natural preservative)', calorie_count: '349 kcal/cup', category: 'DogFood'})
    let productData = productsArray.find((product) => product.id === id);

    // if there are no products with an id of 'id' return undefined
    if (productData === undefined) {
      console.log("Product data does not exist for ID: " + id);
      return undefined;
    }
    console.log("THis is productData in NewCartContext", productData);
    // returns the data of a product 'productData' that has an id that equals the 'id' passed in as a prop
    return productData;
  }

  // Get the quantity of a product with a specific 'id' in the cart and return the quantity
  function getProductQuantity(id) {
    // .find() goes through every product object in the piece of state 'CartProducts' array to see if there's a product with the same id as 'id' that's passed in as a prop. The ? means, if there is, then return its quantity. If not, return 0 as the quantity
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  // adds a product with an id equal to the id passed in as a prop to the piece of state 'cartProducts' array
  async function addOneItemToCart(id) {
    // call the function above 'getProductQuantity' for a specific product with 'id' in piece of state cartProducts
    const quantity = getProductQuantity(id);
    // call the function above 'getProductData' to retrieve the data of a product 'productData' that has an id that matches 'id' passed in as a prop
    const productData = await getProductData(id);

    // if the quantity of the product with 'id' is zero (means it's not in the cart)
    if (quantity === 0) {
      // add a new object (containing the product id, name, price and a quantity of 1 for the product with an id equaling the id passed in) to all the objects already in the piece of state 'cartProducts' array
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          name: productData.name,
          price: productData.price,
          quantity: 1,
        },
      ]);
    } else {
      // if product with 'id' is in the piece of state 'cartProducts' array (has a quantity > 0), map over all the product objects in 'cartProducts', and for every object, check to see if its id matches the id passed in as a prop. If so, overwrite its quantity property by adding 1 to its current value and add it to 'cartProducts' along with the other properties of 'product' (i.e. id). If there isn't a product with 'id', add that product to the cartProducts array

      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
      console.log("THis is cartProducts", cartProducts);
    }
  }

  // removes a product with an id equal to the id passed in as a prop from the piece of state 'cartProducts' array
  function removeOneItemFromCart(id) {
    // get the quantity of a specific product with 'id'
    const quantity = getProductQuantity(id);

    // if the product with a specific 'id' has a quantity of 1, it should be deleted from the cart altogether (since if remove 1 from its quantity, it will have a quantity of 0) so call deleteFromCart function
    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      // if product with a specific 'id' has a quantity > 1, map over all the product objects in the piece of state 'cartProducts' array, and for every object, check to see if its id matches the id passed in as a prop. If so, overwrite its quantity property by subtracting 1 from its current value and add it to cartProducts along with the other properties of 'product' (i.e. id). If there isn't a product with 'id', add that product to the cartProducts array.
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  // deletes all products with the same id as the id passed in as a prop from the piece of state 'cartProducts' array
  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      // .filter() starts with an empty array and will pass over all the product objects in the piece of state 'cartProducts' array, and for every product with an id that does not match the id passed in as a prop (products to be deleted), add that product object to the new array. Everything added to that new array will be the products that are not to be deleted. Then reset cartProducts with that new array.
      cartProducts.filter((product) => {
        return product.id != id;
      })
    );
  }

  async function getTotalCost() {
    // initialize totalCost
    let totalCost = 0;
    // map over all the product objects in the piece of state 'cartProducts' array, and for every object, call the getProductData function with the product.id passed in as a prop. This function returns all the data pertaining to that specific product with 'id' (i.e. product price).
    // ** Need to add 'async' and 'await' as getProductData is an async function and it needs to wait for Api call before returning productData
    const totalCostArray = cartProducts.map(async (product) => {
      const productData = await getProductData(product.id);
      totalCost += productData.price * product.quantity;
    });
    await Promise.all(totalCostArray);
    console.log("This is totalCost", totalCost, cartProducts);
    return totalCost;
  }

  // items is set equal to piece of state 'cartProducts'
  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneItemToCart,
    removeOneItemFromCart,
    deleteFromCart,
    getTotalCost,
    getProductData,
  };

  return (
    // Provider gives any component wrapped in it access to everything in CartContext with the contextValue (i.e. items, getProductQuantity(), addOneToCart(), etc). In the App.js file, CartProvider is wrapped around the whole app (NavBar and all Routes)
    <NewCartContext.Provider value={contextValue}>
      {children}
    </NewCartContext.Provider>
  );
}

export default CartProvider;
