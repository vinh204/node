const homeRouters = require("./home.route");
const productRouters = require("./product.route");

module.exports = (app) => {
    app.use('/', homeRouters);

    app.use("/products", productRouters);
}