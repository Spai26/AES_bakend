const { Router } = require("express");
/* const EventClient = require("../handlers/Event_Client/event_client.handler")*/

const customerRoute = Router();
customerRoute.get("/", (req, res) => {
  res.send({ data: "client" });
});

//formularios eventos - especialistas - instituciones  - organizacion
/**
 * nombre
 * apellido
 * email
 */

/**
 {
  event_id :2222,
  description: ---
  title: ----
  customer :[
    {customer_id},
    {customer_id},
    {customer_id}

  ]
 }
 */

//registro evento
/* customerRoute("/register", (req, res)=>{
  const {nombre, apellido, email, origin} = req.body
  
 }) */
//especialista
/* customerRoute("/especialista", (req, res)=>{
  const {nombre, apellido, email pais, celular} = req.body
 }) */
/* customerRoute.get("/", EventClient.AddcustomerRoute);
customerRoute.get("/:id", EventClient.AddcustomerRouteById);
customerRoute.post("/", EventClient.CreatecustomerRoute);
customerRoute.put("/:id", EventClient.UpdatecustomerRoute); */

module.exports = customerRoute;
