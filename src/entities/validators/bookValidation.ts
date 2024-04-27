import Joi from "joi";

const insertBookValidation = Joi.object({
  ISBN: Joi.string().required(),
  Title: Joi.string().required(),
  Author: Joi.string().required(),
  Category: Joi.string().required(),
  PublishYear: Joi.number().required(),
  Publisher: Joi.string().required(),
  AvailableCopies: Joi.number().required(),
});

const getBookByISBNValidation = Joi.object({
  ISBN: Joi.string().required(),
});

const updateBookValidation = Joi.object({
  ISBN: Joi.string().optional(),
  Title: Joi.string().optional(),
  Author: Joi.string().optional(),
  Category: Joi.string().optional(),
  PublishYear: Joi.number().optional(),
  Publisher: Joi.string().optional(),
  AvailableCopies: Joi.number().optional(),
});

export { 
    insertBookValidation,
    getBookByISBNValidation,
    updateBookValidation,
}