import fs from "fs/promises";

class ProductManager {
  static ultId = 0;
  //Variable estatica que almacena el ultimo ID usado.

  //Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  //Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
  async addProduct({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  }) {
    try {
      const arrayProducts = await this.readArchivo();

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
      if (arrayProducts.some((item) => item.code === code)) {
        console.log("The code must be unique");
        return;
      }

      //Creamos el nuevo objeto:

      const newProduct = {
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: "no image for now",
      };

      if (arrayProducts.length > 0) {
        ProductManager.ultId = arrayProducts.reduce(
          (maxId, product) => Math.max(maxId, product.id),
          0
        );
      }

      newProduct.id = ++ProductManager.ultId;

      //Lo agrego al arra y lo guardo en el archivoy:
      arrayProducts.push(newProduct);
      await this.saveArchivo(arrayProducts);
    } catch (error) {
      console.log("An error was produced, the product was not loaded", error);
      throw error;
    }
  }

  //Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
  async getProducts() {
    try {
      const arrayProducts = await this.readArchivo();
      return arrayProducts;
    } catch (error) {
      console.log("Error reading the file", error);
      throw error;
    }
  }

  //Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
  async getProductById(id) {
    try {
      const arrayProducts = await this.readArchivo();
      const found = arrayProducts.find((item) => item.id === id);

      if (!found) {
        console.log("Product was not found");
        return null;
      } else {
        console.log("Producto was found");
        return found;
      }
    } catch (error) {
      console.log("Error reading the file", error);
      throw error;
    }
  }

  //Métodos auxiliares para leer, guardar, actualizar y eliminar archivos:
  async readArchivo() {
    try {
      const response = await fs.readFile(this.path, "utf-8");
      const arrayProducts = JSON.parse(response);
      return arrayProducts;
    } catch (error) {
      console.log("Error reading the file", error);
      throw error;
    }
  }

  async saveArchivo(arrayProducts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
    } catch (error) {
      console.log("Error saving the file", error);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const arrayProducts = await this.readArchivo();

      const index = arrayProducts.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProducts[index] = { ...arrayProducts[index], ...updatedProduct };
        await this.saveArchivo(arrayProducts);
        console.log("Product was updated");
      } else {
        console.log("The product was not found");
      }
    } catch (error) {
      console.log("Error updating the product", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProducts = await this.readArchivo();

      const index = arrayProducts.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProducts.splice(index, 1);
        await this.saveArchivo(arrayProducts);
        console.log("Product was eliminated");
      } else {
        console.log("The product was not found");
      }
    } catch (error) {
      console.log("Error eliminating the product", error);
      throw error;
    }
  }
}

export default ProductManager;
