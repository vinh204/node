const express = require('express');
const methodOverride = require('method-override');
require("dotenv").config();

const database = require("./config/database");
const systemConfig = require("./config/system");

const routeAdmin = require('./routes/admin/index.route');
const route = require('./routes/client/index.route');
const bodyParser = require('body-parser');

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false}));

app.set('views', './views');
app.set('view engine', 'pug');

//App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static('public'));


//Routes
routeAdmin(app)
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
