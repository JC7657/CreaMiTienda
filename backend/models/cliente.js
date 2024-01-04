const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


//Creación de Esquemas: Para la validación de que los datos entrantes sean correctos, cada objeto y sus propiedades se definen y se validan
//utilizando el método de mongoose [Schema].

const clienteSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, default : () => new mongoose.Types.ObjectId},
    rut: {type: String, unique: true},
    nombre: {type: String, required: true},
    apellidoPaterno: {type: String, required: true},
    apellidoMaterno: {type: String, required: true},
    correoElectronico: {type: String, required: true},
    telefono: {type: Number, required: true},
    direccion: {type: String, required: true},
    tipoUsuario: { type:String, enum: ['normal', 'administrador'], default: 'normal', required: true}
  }, {
    versionKey:false
  });

  clienteSchema.methods.comparePassword = function (password) {
    return new Promise((resolve, reject) => {
      this.authenticate(password, (error, cliente, options) => {
        if (error) {
          return reject(error);
        }
        if (!cliente) {
          return resolve(false);
        }
        return resolve(true);
      });
    });
  };

  
  clienteSchema.plugin(passportLocalMongoose, {
    usernameField: 'correoElectronico',
  });

//Definir el modelo: Posteriormente se relacionan las colecciones ya existentes en la base de datos con los Schemas respectivos. Se utiliza
//el método de mongoose [model]. Se utiliza además el módulo [export] para que el esquema sea utilizable en todo el proyecto.

module.exports = mongoose.model("Cliente", clienteSchema);