const express = require("express");
const router = express.Router();
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const bodyParser = require("body-parser");
const categoria = require("../models/categoria");
const jsonParser = bodyParser.json();

//Método para obtener las categorías disponibles en la base de datos.

router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find().lean();
    if (categorias.length > 0) {
      res.status(200).send(categorias);
    } else {
      res.json({ msg: "No se encontraron categorías en la tienda." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Error al listar categorías",
      error: err.message,
    });
  }
});

//Encontrar una categoría específica utilizando su ID

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Categoria.findById(id)
    .then((categoria) => {
      if (!categoria) {
        res.status(404).send("Categoría no encontrada");
      } else {
        res.status(200).json(categoria.nombre);
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
      res.status(500).json({
        msg: "Ha ocurrido un error",
        error: error,
      });
    });
});

//Método para crear una nueva categoría de productos en la base de datos, con un ID único.

router.post("/", jsonParser, async (req, res) => {
  try {
    const nuevaCategoria = new Categoria({
      nombre: req.body.nombre,
    });
    nuevaCategoria.save();
    res.json({ msg: "Categoría ingresado con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Error al ingresar categoría",
      error: err.message,
    });
  }
});

//Metodo para eliminar categorías (Solo funciona si no hay productos en la base de datos con la categoría a eliminar)

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Producto.find({ categoria: id }).then((producto) => {
      if (producto.length > 0) {
        hayProducto = true;
        console.log("Hay productos relacionados. No se puede eliminar");
        res.status(400).send("No se puede eliminar. Hay productos asociados")
      } else {
        console.log("No hay productos. Eliminando...");
        Categoria.findByIdAndDelete(id).then((categoria) => {
          if (!categoria) {
            res.status(404).send("Categoría no encontrada");
          } else {
            res.status(200).send("Categoría eliminada");
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar categoria",
      error: error.message,
    });
  }
});

module.exports = router;
