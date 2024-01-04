const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const Cliente = require("./models/cliente");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");
module.exports = secretKey;

const app = express();
const port = 3000;
const url = "mongodb://127.0.0.1:27017/db_ecommerce";

// Importar las rutas
const clientesRouter = require("./routes/clientes");
const productosRouter = require("./routes/productos");
const pedidosRouter = require("./routes/pedidos");
const categoriasRouter = require("./routes/categorias");

// Configuración de Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./public"));

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((cliente, done) => {
  done(null, cliente._id);
});

passport.deserializeUser((id, done) => {
  Cliente.findById(id)
    .then((cliente) => {
      done(null, cliente);
    })
    .catch((error) => {
      done(error);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "correoElectronico",
      passwordField: "clave",
    },
    async (correoElectronico, clave, done) => {
      try {
        const cliente = await Cliente.findOne({ correoElectronico });

        if (!cliente) {
          return done(null, false, {
            message: "Correo electrónico o contraseña incorrectos",
          });
        }

        const isMatch = await cliente.comparePassword(clave);

        if (!isMatch) {
          return done(null, false, {
            message: "Correo electrónico o contraseña incorrectos",
          });
        }

        return done(null, cliente);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Rutas
app.use("/clientes", clientesRouter);
app.use("/productos", productosRouter);
app.use("/pedidos", pedidosRouter);
app.use("/categorias", categoriasRouter);

// Conexión a la base de datos y inicio del servidor
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a la base de datos E-Commerce");
    app.listen(port, function () {
      console.log("Servidor escuchando en el puerto:", port);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
