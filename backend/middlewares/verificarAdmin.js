//Middleware autenticarToken

const jwt = require('jsonwebtoken');
const secretKey = require('../app');

function verificarAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Extraemos el token del encabezado

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // El token es válido, puedes almacenar la información decodificada en el objeto `req` para su uso posterior en las rutas protegidas
    req.usuario = decoded;
    console.log(req.usuario)
    if(req.usuario.tipoUsuario !== 'administrador') {
      return res.status(403).json({ message: 'Solo los administradores pueden acceder a esta ruta'})
    }

    // Llama a `next()` para continuar con el siguiente middleware o ruta
    next();
  });
}

module.exports = verificarAdmin;