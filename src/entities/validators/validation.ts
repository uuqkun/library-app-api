import Joi from "joi";
import { ResponseError } from "../../error/ResponseError";

const validate = (schema: Joi.ObjectSchema, request: any) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
