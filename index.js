const server = require("./src/config/app");

server.listen(process.env.PORT, () => {
  console.log(
    `your application runing! check here 🔥  => http://localhost:${port}`
  );
});
