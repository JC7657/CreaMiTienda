const express = require("express");
const router = express.Router();
const Producto = require("../models/producto");
const Categoria = require("../models/categoria")
const bodyParser = require("body-parser");
const categoria = require("../models/categoria");
const jsonParser = bodyParser.json();
const verificarAdmin  = require("../middlewares/verificarAdmin")
const path = require('path');
const multer = require("multer"); // Librería para manejar la subida de archivos

// Configuración de multer para almacenar las imágenes en la carpeta "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Validar que el archivo sea una imagen
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo debe ser una imagen válida"), false);
  }
};

const upload = multer({ storage, fileFilter });



// Obtener productos desde la base de datos
router.get('/', (req, res) => {
  for (var key in req.query)
  { 
    req.query[key.toLowerCase()] = req.query[key];
  }
  const { categoria, precioMaximo, precioMinimo } = req.query;
  console.log(req.query);

  // Construir la consulta basada en los criterios de filtrado (Si es que existe alguno)

  let query = Producto.find();
  if (categoria) {
    query = query.where('categoria').equals(categoria);
  }
  if (precioMaximo) {
    query = query.where('precio').lt(precioMaximo);
  }
  if (precioMinimo) {
    query = query.where('precio').gt(precioMinimo)
  }
  // Ejecutar la consulta y devolver los resultados
  try {
    query.then((productos) => {
      res.status(200).send(productos);
    })
  }
  catch(err) {
    console.error(err);
    res.status(500).send('Error al obtener los productos');
  }
});

// Ingresar nuevo producto. Esto requiere que se utilice una categoría previamente existente

router.post("/", jsonParser, verificarAdmin,  async (req, res) => {
    try {
      console.log(req.body);
      categoriaNombre = await Categoria.findById(req.body.categoria);
      console.log(categoria);
      if(categoriaNombre == null) {
        throw new Error("No se ha encontrado la categoría seleccionada")
      }
      const nuevoProducto = new Producto({
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        imagenURL: req.body.imagenURL
      });
      nuevoProducto.save();
      res.json({ "msg": "Producto ingresado con éxito"})
    } catch (err) {
      console.error(err);
      res.status(500).json({
        msg: "Error al ingresar producto",
        error: err.message
      });
    }
  });

  //Modificar Producto 

  router.put('/:id', verificarAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, precio, stock, descripcion, categoria, imagenURL } = req.body;
  
      // Buscar el producto por su ID
      const producto = await Producto.findById(id);
  
      // Verificar si el producto existe
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      // Modificar los atributos del producto
      producto.nombre = nombre;
      producto.precio = precio;
      producto.stock = stock;
      producto.descripcion = descripcion;
      producto.categoria = categoria;
      producto.imagenURL = imagenURL;
  
      // Guardar los cambios en la base de datos
      await producto.save();
  
      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al modificar el producto' });
    }
  });

  // Eliminar producto utilizando el ID
  router.delete("/:id",  (req, res) => {
    const { id } = req.params;
  
    Producto.findByIdAndDelete(id)
      .then((producto) => {
        if (!producto) {
          res.status(404).send("Producto no encontrado");
        } else {
          res.status(200).json(producto);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          msg: "Error al eliminar producto",
          error: error.message
        })
      });
  });
  
  router.post("/upload-image", upload.single("imagen"), (req, res) => {
    console.log("Intentando subir imágen...")
    if (req.file) {
      res.json({ imageUrl: req.file.filename });
    } else {
      res.status(400).json({ error: "No se ha enviado ninguna imagen" });
    }
  });
  
  
  
module.exports = router;