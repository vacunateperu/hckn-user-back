const Joi = require("@hapi/joi")
module.exports = {
    PollValidator: Joi.object({
        ocupacion: Joi.string().uppercase().required(), 
        fecha_nacimiento: Joi.string().required(), 
        sexo: Joi.string().uppercase().length(1).required(), 
        gestante: Joi.string().uppercase(), 
        contacto: Joi.string().uppercase().required(), 
        obesidad: Joi.string().uppercase().required(), 
        diabetes: Joi.string().uppercase().required(), 
        enfermedad_respitatoria: Joi.string().uppercase().required(), 
        enfermedad_cardiovascular: Joi.string().uppercase().required(), 
        insuficiencia_renal: Joi.string().uppercase().required(), 
        cancer: Joi.string().uppercase().required(), 
        hipertencion_arterial: Joi.string().uppercase().required(), 
        inmunodeficiencia: Joi.string().uppercase().required(), 
        vih: Joi.string().uppercase().required(), 
        enfermedad_cronica_higado: Joi.string().uppercase().required(), 
        direccion_domicilio: Joi.string().required(), 
        correo_electronico: Joi.string().required(), 
        distrito: Joi.string().required(), 
    }),
    DocumentValidator: Joi.object({
        dni: Joi.string().length(8).required(), 
    })
}