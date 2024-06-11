import { Router } from "express";
const router = Router();

import ProductManager from "../managers/product-manager.js";
const productManager = new ProductManager("./src/data/products.json");

//1) Listar todos los productos.
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error("Error obtaining the products", error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

//2) Traer solo un producto por id:
router.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const product = await productManager.getProductById(parseInt(id));
    if (!product) {
      return res.json({
        error: "Product was not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Error obtaining the products", error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

//3) Agregar nuevo producto:
router.post("/", async (req, res) => {
  const newProduct = req.body;

  try {
    await productManager.addProduct(newProduct);
    res.status(201).json({
      message: "Product was successfully added ",
    });
  } catch (error) {
    console.error("Error adding product", error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

//4) Actualizar por ID
router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const updatedProduct = req.body;

  try {
    await productManager.updateProduct(parseInt(id), productoActualizado);
    res.json({
      message: "Product was successfully updated",
    });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

//5) Eliminar producto:
router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    await productManager.deleteProduct(parseInt(id));
    res.json({
      message: "Product was successfully eliminated",
    });
  } catch (error) {
    console.error("Error eliminating the product", error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

export default router;
