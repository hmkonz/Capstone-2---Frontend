Just Real Food!! <br><br>
Deployed on Render.com: https://capstone-2-frontend-tqq5.onrender.com

About <br>
"Just Real Food" is a website that allows any visitor to the site to browse through all available dog and cat food products and the details of specific products. If a visitor wants to make a purchase, they have to login. Once logged in, they can add products to the cart, increase/decrease the quantities of items in the cart and/or remove products from the cart altogether. When ready to checkout, the customer is directed to a Stripe checkout page where they enter their credit card and shipping information and confirm their intent to purchase.
<br>

Website Features <br>
APIs
<br>
JustRealFoodApi, created by myself. All products and their details were added to a seed file in the backend and all possible api routes were added to the frontend. <br>
Stripe API for payment processing
<br>

User Flow<br>
Customers submit requests to one of the various JustRealFoodApi endpoints to receive relevant product choices to select from. When one of those products is clicked on, the customer can see the details about that product (i.e. price, ingredients, guaranteed analysis and calorie count).  Once products are addd to the cart and the customer proceeds to checkout, the customer is redirected to Stripe to process their payment. <br>

All Products Page<br>
When navigating to the 'All Products' page, customers/visitors are shown images of 9 different products of dog and cat foods that they can then click on to retrieve product details (i.e. price, ingredients, guaranteed analysis and calorie count). This list of all products is retrieved from the 'api/products' endpoint of JustRealFoodApi. <br>

Dog Food and Cat Food Pages<br>
When navigating to the Dog Food and Cat Food pages, customers/visitors are shown images of 6 dog food products or 3 cat food products, depending on which category is selected.  Visitors/customers can click on any of those products to retrieve product details (i.e. price, ingredients, guaranteed analysis and calorie count). These categories of food products are retrieved from the 'api/products/category/DogFood' or 'api/products/category/CatFood' endpoints of JustRealFoodApi. <br>

Specific Product Detail Page<br>
When a logged in customer clicks on a product shown on the All Products, Dog Food or Cat Food pages, the customer can add that product to the cart, increase/decrease its quantity or remove it from the cart.  The customer can continue shopping and select another product and add that to the cart. The details of a specific product are retrieved from the 'api/products/name/:name' endpoint of JustRealFoodApi. <br>

Cart icon in the Navbar<br>
When a customer clicks on the cart in the NavBar, if it's empty, a message shows in the modal saying cart is empty. If there are items in the cart, a summary of the items in the cart shows in the modal with a remove button for each item as well as a Proceed to Checkout button. When the Proceed to Checkout button is clicked, the customer is redirected to Stripe to complete the payment process. <br>


Sign Up/Log in Pages <br>
Customers sign up and log in with email and password. Password is hashed using Bcrypt. Only logged in customers are able to add items to the cart and checkout with Stripe. <br>

Tech Stack <br>
CSS, React js, Express, Node js, PostgreSQL, Bcrypt, jsonschema, Stripe <br>
