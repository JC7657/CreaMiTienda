const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creación de Esquemas: Para la validación de que los datos entrantes sean correctos, cada objeto y sus propiedades se definen y se validan
//utilizando el método de mongoose [Schema].

const pedidosSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, default : () => new mongoose.Types.ObjectId},
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    productos: [{ 
      _id: {type: Schema.Types.ObjectId, default : () => new mongoose.Types.ObjectId},
      producto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true},
      cantidad: { type: Number, required: true}
    }],
    direccionEnvio: { type: String, required: true },
    entregado: { type: Boolean, default: false },
    fechaCompra: { type: Date, default: Date.now },
    total: {type: Number, required: true}
  },{
    versionKey: false,
  });

//Definir el modelo: Posteriormente se relacionan las colecciones ya existentes en la base de datos con los Schemas respectivos. Se utiliza
//el método de mongoose [model]. Se utiliza además el módulo [export] para que el esquema sea utilizable en todo el proyecto.

module.exports = mongoose.model("pedidos", pedidosSchema);