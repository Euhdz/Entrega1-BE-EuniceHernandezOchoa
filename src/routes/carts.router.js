import { Router } from "express";
const router = Router();

//Array para guardar los datos:

const carts = [];

// Para pedir el listado de carritos que tiene mi sistema.
//OJO:antes de get va el nombre del archivo en que estamos
//originalmente estaba "/api.carts", pero pa simplificar se deja "/" y en app.js se pone app.use("/api.carts", petsRouter)
router.get("/", (req, res) => {
  res.json(carts); //aquí estamos pidiendo el array de carritos. Lo vemos en el navegador
});

// Para cargar una carrito usamos el método POST. OJO:antes de post va el nombre del archivo en que estamos
//originalmente estaba "/api.carts", pero pa simplificar se deja "/" y en app.js se pone app.use("/api.carts", petsRouter)
router.post("/", (req, res) => {
  const newCart = req.body;
  carts.push(newCart);
  res.send("Cart was successfully created");
});

//Se debe exportar para que lo lea el resto de la app
export default router;
