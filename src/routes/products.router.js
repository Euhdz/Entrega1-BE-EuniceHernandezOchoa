import { Router } from "express";
const router = Router();

import fs from "fs/promises";

//Array para guardar los datos:
const products = [];

class ProductManager {
  static ultId = 0;
  //Variable estatica que almacena el ultimo ID usado.

  //Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  //Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    // Validamos que se agregaron todos los campos.
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !thumbnails
    ) {
      console.log("All fields are mandatory");
      return;
    }

    // Validar que no se repita el campo “code”
    if (this.products.some((item) => item.code === code)) {
      console.log("The code must be unique");
      return;
    }

    //Creamos el nuevo objeto:

    const newProduct = {
      id: ++ProductManager.ultId,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails,
    };

    //Lo agrego al array:
    this.products.push(newProduct);

    //Nuevo pasito: lo guardo en el archivo:
    await this.saveArchivo(this.products);
  }

  //Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
  async getProducts() {
    let arrayProducts = await this.readArchivo();
    return arrayProducts;
  }

  //Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
  getProductById(id) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      console.error("Not Found");
    } else {
      console.log("Found product:", product);
    }
  }

  //Métodos auxiliares para guardarArchivo y leerArchivo:
  async saveArchivo(arrayProducts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
    } catch (error) {
      console.log("Error saving file: ", error);
    }
  }

  async readArchivo() {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const array = JSON.parse(response);
      return array;
    } catch (error) {
      console.log("Error reading file: ", error);
    }
  }
}

// Para pedir el listado de productos que tiene mi sistema.
//OJO:antes de get va el nombre del archivo en que estamos
router.get("/", (req, res) => {
  res.json(products); //aquí estamos pidiendo el array de productos. Lo vemos en el navegador
});

// Para cargar un producto usamos el método POST. OJO:antes de post va el nombre del archivo en que estamos
router.post("/", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.send("Product was successfully created");
});

//Se debe exportar para que lo lea el resto de la app
export default router;
