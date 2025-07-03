import auth from "./auth-routes.js";
import category from "./category-routes.js";
import product from "./product-routes.js";
import cart from "./cart-routes.js";
import order from "./order-routes.js";
import discount from "./discount-routes.js";
import inventory from "./inventory-routes.js";
import payment from "./payment-routes.js";
import productVariant from "./product-variant-routes.js";
import option from "./option-routes.js";
import optionValue from "./option-value-routes.js";
import address from "./address-routes.js";
import review from "./review-routes.js";
import search from "./search-routes.js";
import user from "./user-routes.js";
import brand from "./brand-routes.js";
import shipping from "./shipping-routes.js";

// Exports the routes as a function
export const Routers = (app) => {
	app.use("/api/v1/auth", auth);
	app.use("/api/v1/category", category);
	app.use("/api/v1/brand", brand);
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
	app.use("/api/v1/search", search);
	app.use("/api/v1/user", user);
	app.use("/api/v1/shipping", shipping);
};
