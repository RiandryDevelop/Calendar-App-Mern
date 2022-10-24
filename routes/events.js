/*
    Event Routes
    /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

const router = Router();

// They all have to go through JWT validation
router.use(validarJWT);

// get events
router.get("/", getEventos);

// Create a new event
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Update event
router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

// Delete event
router.delete("/:id", eliminarEvento);

module.exports = router;
