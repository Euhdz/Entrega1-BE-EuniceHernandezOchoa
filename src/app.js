//Levantamos servidor:

import express from "express";
const app = express();
const PORT = 8080;

//Como separamos las rutas, acá importamos los módulos y abajo en la parte de rutas usamos estos módulos:
import productsRouter from "./routes/products.router.js";

// Para recibir datos en formato json

app.use(express.json());

app.use(express.urlencoded({ extended: true })); //Para analizar los datos en la url y los convierte en un objeto de JS a través de req.body

//Acá usamos los módulos de rutas que creamos:
app.use("/api/products", productsRouter);

// Servidor escuchando

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});
