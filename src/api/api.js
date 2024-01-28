import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JustRealFoodApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JustRealFoodApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user */

  static async getCurrentUser(email) {
    let res = await this.request(`api/users/${email}`);
    return res.user;
  }

  /** Get the current admin */

  static async getCurrentAdmin(email) {
    let res = await this.request(`api/admins/${email}`);
    return res.admin;
  }

  /** Get a list of all products (filtered by 'name' if not undefined)*/

  static async getAllProducts(name) {
    let res = await this.request("api/products", { name });
    return res.products;
  }

  /** Get details on a product by name  */

  static async getProductByName(name) {
    let res = await this.request(`api/products/name/${name}`);
    return res.products;
  }

  /** Get details on products by category */

  static async getProductByCategory(category) {
    let res = await this.request(`api/products/category/${category}`);
    return res.products;
  }

  /** Create a cart  */

  static async createCart(cart) {
    let res = await this.request(`api/cart`, cart, "post");
    return res.cart;
  }

  /** Get all carts   */
  static async getAllCarts() {
    let res = await this.request(`api/cart`);
    return res.cart;
  }

  /** Update cart details */

  // static async saveCartDetails(data) {
  //   let res = await this.request(`api/cart`, data, "patch");
  //   return res.cart;
  // }

  /** Get orders   */

  static async getUserOrders() {
    let res = await this.request(`api/account/orders`);
    return res.orders;
  }

  /** Get user order details */

  // static async getOrderDetails(orderId) {
  //   let res = await this.request(`api/orders/${orderId}`);
  //   return res.order;
  // }

  /** Signup for site */

  static async signup(data) {
    let res = await this.request("api/auth/user/register", data, "post");
    return res.token;
  }

  /** Get token for login from email and password */

  static async login(data) {
    let res = await this.request(`api/auth/user/token`, data, "post");
    return res.token;
  }

  /** Get token for admin login from email and password */

  static async adminSignin(data) {
    let res = await this.request(`api/auth/admin/signin`, data, "post");
    return res.token;
  }

  /** Save user account details  */

  static async saveUserAccountDetails(email, data) {
    let res = await this.request(`api/users/${email}`, data, "patch");
    return res.user;
  }
}

export default JustRealFoodApi;
