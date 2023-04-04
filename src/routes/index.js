const { Router } = require("express");
const authRoute = require("./Auth.routes");
const userRoute = require("./users.routes");
const countryRoute = require("./Country.routes");
const eventRoute = require("./event.routes");
const event_client = require("./event_client.routes");
const blogRoute = require("./Blogs.routes");
const errohander = require("../middleware/handlerError");
const categoryRoutes = require('./Category.routes')

const routes = Router();

routes.use("/users", userRoute);
routes.use("/auth", authRoute);
routes.use("/event", eventRoute);
routes.use("/event_client", event_client);
routes.use("/blogs", blogRoute);
routes.use("/country", countryRoute);
routes.use('/categoryBlogs', categoryRoutes)
routes.use(errohander);

routes.get("/", (req, res) => {
  res.send("this root page");
});

module.exports = routes;
