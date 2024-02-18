import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** JustRealFood API Class.
 *
 * Static class tying together methods used to get/send to the API.
 *
 */

class JustRealFoodApi {
  // the user token for interaction with the API will be stored here
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JustRealFoodApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("JustRealFood API Error:", err.response);
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

  /** Get a list of products by category */

  static async getProductByCategory(category) {
    let res = await this.request(`api/products/category/${category}`);
    return res.products;
  }

  /** User Signup */

  static async signup(data) {
    let res = await this.request("api/auth/user/register", data, "post");
    return res.token;
  }

  /** Get token for login from user email and password */

  static async login(data) {
    let res = await this.request(`api/auth/user/token`, data, "post");
    return res.token;
  }
}

export default JustRealFoodApi;
