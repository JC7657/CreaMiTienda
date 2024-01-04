const express = require("express");
const router = express.Router();
const Pedido = require("../models/pedido");
const Producto = require("../models/producto");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", async (req,res) => {
    try {
        // Solicitar todos los pedidos disponibles en la base de datos
        const pedidos = await Pedido.find().lean();
        // Si existe al menos un pedido, devolver el resultado en formato json
        // Si no existen pedidos, devolver un mensaje que lo indique
        if(pedidos.length > 0) {
            res.status(200).send(pedidos);
        }
        else {
            res.json({ msg: "No se encontraron pedidos en la base de datos"})
        }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Error al buscar pedidos")
    }
})

router.post('/', jsonParser, async (req, res) => {
    try {
      console.log("Body del Request: " + req.body)
      const { cliente, productos, direccionEnvio, total } = req.body;
  
      // Crear un array de productos con sus cantidades correspondientes
      const productosPedido = productos.map(producto => ({
        producto: producto.producto,
        cantidad: producto.cantidad
      }));

  
      // Crear el objeto de pedido con los datos recibidos
      const nuevoPedido = new Pedido({
        cliente,
        productos: productosPedido,
        direccionEnvio,
        total
      });
  
      // Guardar el pedido en la base de datos
      const pedidoGuardado = await nuevoPedido.save();

      // Actualizar el stock de los productos comprados
    for (const producto of productosPedido) {
        const { producto: productoId, cantidad } = producto;
  
        // Buscar y actualizar el producto en la base de datos
        await Producto.findOneAndUpdate(
          { _id: productoId },
          { $inc: { stock: -cantidad } }
        );
      }
  
      res.status(201).json(pedidoGuardado);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al guardar el pedido');
    }
  });

  router.put('/:id/entregar', async (req, res) => {
    try {
      const pedidoId = req.params.id;
  
      // Buscar el pedido por su ID
      const pedido = await Pedido.findById(pedidoId);
  
      if (!pedido) {
        return res.status(404).send('Pedido no encontrado');
      }
  
      // Actualizar el estado de entrega a true
      pedido.entregado = true;
  
      // Guardar los cambios en la base de datos
      const pedidoActualizado = await pedido.save();
  
      res.json(pedidoActualizado);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al actualizar el estado de entrega del pedido');
    }
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    Pedido.findByIdAndDelete(id)
      .then((pedido) => {
        if (!pedido) {
          res.status(404).send("Pedido no encontrado");
        } else {
          res.status(200).json({
            msg: 'Pedido eliminado',
            pedido: pedido
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          msg: "Error al eliminar pedido",
          error: error.message
        })
      });
  });

  router.get("/promedio", async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$fechaCompra" } },
            valorPromedio: { $avg: "$total" },
          },
        },
        {
          $project: {
            _id: 0,
            mes: "$_id",
            valorPromedio: 1,
          },
        },
        { $sort: { mes: 1 } }, // Ordenar por mes ascendente
      ];
  
      const result = await Pedido.aggregate(pipeline);
  
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.json({ msg: "No se encontraron datos de valor promedio de pedidos" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al obtener el valor promedio de los pedidos");
    }
  });

  router.get("/ventas-mensuales", async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$fechaCompra" } },
            cantidadVentas: { $sum: 1 }, // Sumamos 1 por cada pedido para contar las ventas
          },
        },
        {
          $project: {
            _id: 0,
            mes: "$_id",
            cantidadVentas: 1,
          },
        },
        { $sort: { mes: 1 } }, // Ordenar por mes ascendente
      ];
  
      const result = await Pedido.aggregate(pipeline);
  
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.json({ msg: "No se encontraron datos de cantidad de ventas por mes" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al obtener la cantidad de ventas por mes");
    }
  });
  
  

module.exports = router;