const { Router } = require("express");
/* const EventClient = require("../handlers/Event_Client/event_client.handler")*/

const customerRoute = Router(); 
customerRoute.get("/", (req, res) => {
  res.send({ data: "client" });
});
/* customerRoute.get("/", EventClient.AddcustomerRoute);
customerRoute.get("/:id", EventClient.AddcustomerRouteById);
customerRoute.post("/", EventClient.CreatecustomerRoute);
customerRoute.put("/:id", EventClient.UpdatecustomerRoute); */

module.exports = customerRoute;
