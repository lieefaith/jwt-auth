const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided. Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "bazmaSecretKey", (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token. Permission denied",
      });
    }
    req.user = user;
    next();
  });
};

// async function verifyToken(req, res, next) {
//   const token = req.headers.authorization;
//   jwt.verify(token, "bazmaSecretKey", decode) {
//     if (err) {
//       return res.status(401).json({
//         message: "Invalid token. Unauthorized",
//       });
//     }
//   }
// }

module.exports = verifyToken ;
