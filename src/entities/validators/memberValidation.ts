import Joi from "joi";

const registerMemberValidation = Joi.object({
  Name: Joi.string().min(5).max(100).required(),
  Address: Joi.string().min(10).max(100).required(),
  Email: Joi.string().email().max(100).required(),
  Phone: Joi.string().min(8).max(100).required(),
});

const updateMemberValidation = Joi.object({
  Name: Joi.string().min(5).max(100).optional(),
  Address: Joi.string().min(10).max(100).optional(),
  Email: Joi.string().email().max(100).optional(),
  Phone: Joi.string().min(8).max(100).optional(),
});

const getMemberByIdValidation = Joi.object({
  MemberID: Joi.string().required(),
});

export {
  registerMemberValidation,
  updateMemberValidation,
  getMemberByIdValidation,
};
