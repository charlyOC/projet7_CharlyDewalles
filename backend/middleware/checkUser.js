const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

exports.valid = (req, res, next) => {
  const passwordSchema = new passwordValidator();
  passwordSchema
    .is()
    .min(8)
    .is()
    .max(20) 
    .has()
    .uppercase() 
    .has()
    .lowercase()
    .has()
    .not()
    .symbols(); 

  if (
    !emailValidator.validate(req.body.email) ||
    !passwordSchema.validate(req.body.password)
  ) {
    return res.status(400).send({
      error:
        "Vôtre adresse mail ou mot de passe ne sont pas valides, le mot de passe doit contenir au mininum 8 lettres et contenir minuscules et majuscules",
    });
  } else if (
    emailValidator.validate(req.body.email) ||
    passwordSchema.validate(req.body.password)
  ) {
    next();
  }
};
