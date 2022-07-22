const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoutes = require("../routes/dogRoute");
const tempRoutes = require("../routes/tempRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", dogRoutes);
router.use("/", tempRoutes);

module.exports = router;
