import auth from "./auth_routes.js";
import category from "./category_routes.js";
import product from "./product_routes.js";
import cart from "./cart_routes.js";
import order from "./order_routes.js";
import discount from "./discount_routes.js";
import inventory from "./inventory_routes.js";
import payment from "./payment_routes.js";
import productVariant from "./product_variant_routes.js";
import option from "./option_routes.js";
import optionValue from "./option_value_routes.js";
import address from "./address_routes.js";
import review from "./review_routes.js";

// Exports the routes as a function
export const Routers = (app) => {
	app.use("/api/v1/auth", auth);
	app.use("/api/v1/category", category);
	app.use("/api/v1/product", product);
	app.use("/api/v1/cart", cart);
	app.use("/api/v1/order", order);
	app.use("/api/v1/discount", discount);
	app.use("/api/v1/inventory", inventory);
	app.use("/api/v1/payment", payment);
	app.use("/api/v1/productvariant", productVariant);
	app.use("/api/v1/option", option);
	app.use("/api/v1/optionvalue", optionValue);
	app.use("/api/v1/address", address);
	app.use("/api/v1/review", review);

};
