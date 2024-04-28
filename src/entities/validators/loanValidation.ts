import Joi from "joi";

const createLoanValidation = Joi.object({
  MemberID: Joi.string().required(),
  ISBN: Joi.string().required(),
});

const getLoanByIdValidation = Joi.object({
  LoanID: Joi.string().required(),
});

const getLoanValidation = Joi.object({
  MemberID: Joi.string().optional(),
  name: Joi.string().optional(),
})

export { createLoanValidation, getLoanByIdValidation, getLoanValidation };
