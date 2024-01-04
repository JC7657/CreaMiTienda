const express = require("express");
const router = express.Router();
const Cliente = require("../models/cliente");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secretKey = require("../app");
const autenticarToken = require("../middlewares/autenticarToken");
const verificarAdmin = require("../middlewares/verificarAdmin");

//Método para obtener una lista de los clientes registrados en la base de datos

router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find().lean();
    if (clientes.length > 0) {
      res.status(200).send(clientes);
    } else {
      res.json({ msg: "No hay clientes registrados" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al buscar clientes");
  }
});

//Método para ingresar clientes.

router.post("/register", (req, res) => {
  const {
    rut,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    correoElectronico,
    clave,
    telefono,
    direccion,
    tipoUsuario,
  } = req.body;

  const nuevoCliente = new Cliente({
    rut,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    correoElectronico,
    telefono,
    direccion,
    tipoUsuario,
  });

  // Registrar el cliente sin proporcionar un username
  Cliente.register(nuevoCliente, clave, (error, cliente) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Error al registrar el cliente",
          error,
        });
    }

    // Iniciar sesión automáticamente después del registro
    passport.authenticate("local")(req, res, () => {
      res.json({ success: true, message: "Registro exitoso", cliente });
    });
  });
});

//Ruta de express para eliminar un cliente en una base de datos mongoose, utilizando el id?

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Cliente.findByIdAndDelete(id)
    .then((cliente) => {
      if (!cliente) {
        res.status(404).send("Cliente");
      } else {
        res.status(200).json(cliente);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        msg: "Error al eliminar el cliente",
        error: error.message,
      });
    });
});

// Iniciar Sesión
router.post("/login", passport.authenticate("local"), async (req, res) => {
  // Si el inicio de sesión es exitoso, se llegará a esta función.
  // Aquí puedes generar un token JWT, redirigir al usuario o enviar una respuesta JSON, según tus necesidades.
  try {
    console.log("Logueandote");
    const cliente = await Cliente.findOne({
      correoElectronico: req.user.correoElectronico,
    });
    const tipo = cliente.tipoUsuario;
    const token = jwt.sign(
      {
        userId: req.user._id,
        correoElectronico: req.user.correoElectronico,
        tipoUsuario: tipo,
      },
      secretKey,
      { expiresIn: "1h" }
    );
    console.log("token:" + token);
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      token: token,
      id: req.user._id,
      nombre: cliente.nombre,
      correoElectronico: cliente.correoElectronico,
      apellidoPaterno: cliente.apellidoPaterno,
      apellidoMaterno: cliente.apellidoMaterno,
      rut: cliente.rut,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      tipo: tipo,
    });
  } catch (err) {
    console.error(err);
  }
});

//

router.get("/autenticar-token", autenticarToken, async (req, res) => {
  res.json({ message: "Acceso otorgado" });
});

router.get("/autenticar-admin", verificarAdmin, async (req, res) => {
  res.json({ message: "Acceso otorgado" });
});

module.exports = router;
