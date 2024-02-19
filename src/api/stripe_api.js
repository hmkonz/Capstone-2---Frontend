import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 *Stripe API Class
 */

class StripeApi {
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("Stripe API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** customer checkout in Stripe */

  // 'items' and 'userId' (passed in as props from checkout function in NewNavBar component) are sent along with the POST request as the body of the request
  static async checkout(items, userId) {
    let res = await this.request(
      `api/stripe/checkout`,
      { items, userId },
      "post"
    );
    return res.url;
  }
}

export default StripeApi;
