export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ message: "Usuario no autenticado" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: "Acceso denegado" });
    }
    next();
  };
};
