const server = require("./src/config/app");
const { APP_PORT } = require("./src/config/variable.env");
require("./src/config/database");
const port = APP_PORT || process.env.PORT;

server.listen(port, () => {
  console.log(`your application runing on port: ${port}`);
});
