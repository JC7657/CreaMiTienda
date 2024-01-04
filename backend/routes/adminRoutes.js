const express = require("express");
const router = express.Router();
const { verificarAdmin } = require("../middlewares/verificarAdmin");

// Ruta para el panel de administración
router.get("/ctrlpanel", verificarAdmin, (req, res) => {
  // Lógica para el panel de administración
});

// Otras rutas relacionadas con el panel de administración
router.post("/agregar-producto", verificarAdmin, (req, res) => {
  // Lógica para agregar un producto (solo accesible para admins)
});

router.put("/editar-producto/:id", verificarAdmin, (req, res) => {
  // Lógica para editar un producto (solo accesible para admins)
});

router.delete("/eliminar-producto/:id", verificarAdmin, (req, res) => {
  // Lógica para eliminar un producto (solo accesible para admins)
});

module.exports = router;