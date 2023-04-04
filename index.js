const server = require("./src/config/app");
const port = 3001 || process.env.PORT;

server.listen(port, () => {
  console.log(
    `your application runing! check here :) => http://localhost:${port}`
  );
});
