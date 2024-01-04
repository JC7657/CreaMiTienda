const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creación de Esquemas: Para la validación de que los datos entrantes sean correctos, cada objeto y sus propiedades se definen y se validan
//utilizando el método de mongoose [Schema].

const categoriaSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, default : () => new mongoose.Types.ObjectId},
  nombre: String,
  },{
    versionKey: false
  });

//Definir el modelo: Posteriormente se relacionan las colecciones ya existentes en la base de datos con los Schemas respectivos. Se utiliza
//el método de mongoose [model]. Se utiliza además el módulo [export] para que el esquema sea utilizable en todo el proyecto.

module.exports = mongoose.model("categorias", categoriaSchema);