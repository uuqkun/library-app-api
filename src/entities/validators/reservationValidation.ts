import Joi from "joi";

const createReservationValidation = Joi.object({
  ReservationID: Joi.string().required(),
  Status: Joi.string().valid("cancel", "fulfill").required(),
});

export { createReservationValidation };
