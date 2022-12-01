import Joi from "joi";
export const signIn = Joi.object().keys({
  username: Joi.string().alphanum().trim().min(6).max(25).required().label('Username'),
  password: Joi.string().alphanum().min(6).max(15).pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])/, 'password').required().trim().label('Password'),
  platform: Joi.string().lowercase().trim().valid('web','android','ios').required().label('Platform'),
});
