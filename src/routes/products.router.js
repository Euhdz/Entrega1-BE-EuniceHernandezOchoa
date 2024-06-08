import { Router } from "express";
const router = Router();

//Array para guardar los datos:
const products = [];

// Para pedir el listado de productos que tiene mi sistema.
//OJO:antes de get va el nombre del archivo en que estamos
//originalmente estaba "/api.pets", pero pa simplificar se deja "/" y en app.js se pone app.use("/api.pets", petsRouter)
router.get("/", (req, res) => {
  res.json(products); //aquí estamos pidiendo el array de productos. Lo vemos en el navegador
});

// Para cargar una mascota usamos el método POST. OJO:antes de post va el nombre del archivo en que estamos
//originalmente estaba "/api.pets", pero pa simplificar se deja "/" y en app.js se pone app.use("/api.pets", petsRouter)
router.post("/", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.send("Product was successfully created");
});

//Se debe exportar para que lo lea el resto de la app
export default router;
