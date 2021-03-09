const fetch = require("node-fetch");
const handlerError = require("http-errors");
const moment = require("moment")
const { PollValidator, DocumentValidator } = require("../helpers/document_helper")
const { Read, Create, Update } = require("../schemes/persona_Scheme") 
module.exports = {
    async query(req, res, next){
        try {
            const poll = await PollValidator.validateAsync(req.body)
            const age = moment().diff(poll.fecha_nacimiento, 'years')
            const diagnostic = await fetch(`${process.env.HOST_TO_PREDICTION}`, 
                    { method: 'POST', 
                    headers: { 
                        'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({
                        "ocup":(poll.ocupacion !== "NI")?"RI":"NI",
                        "edad": (age >= 60)?"RI":"NI",
                        "sexo": poll.sexo,
                        "gestante": (poll.sexo === "F")?(poll.gestante)?poll.gestante:"NO":"NO",
                        "contacto": poll.contacto,
                        "obesidad": poll.obesidad,
                        "diabetes": poll.diabetes,
                        "respi": poll.enfermedad_respitatoria,
                        "hiper_arterial": poll.hipertencion_arterial,
                        "cadio": poll.enfermedad_cardiovascular,
                        "renal": poll.insuficiencia_renal,
                        "cancer": poll.cancer,
                        "inmu_defi": poll.inmunodeficiencia,
                        "vih": poll.vih,
                        "enf_cro_hi": poll.enfermedad_cronica_higado
                    })
                }).then(res => res.json())
            const doc = await DocumentValidator.validateAsync(req.query)
            const registro = await Read(doc.dni);
            if(registro.rows .length < 1) {
                const result = await fetch(`https://apiperu.dev/api/dni/${doc.dni}`, 
                                { method: 'GET', 
                                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.KEY_API_PERU_DEV}` } 
                                }).then(res => res.json())
                if(!result.success)  return next(handlerError.BadRequest(result.message))
                    const user = result.data;
                    delete user.origen;
                    delete user.nombre_completo;
                    delete user.codigo_verificacion;
                        if(!diagnostic)  return next(handlerError.FailedDependency('Uno de nuestros servicios esta en mantenimiento, intentar mas tarde'))
                        resultDiagnostic = {
                            nombres: user.nombres,
                            apellido_paterno: user.apellido_paterno,
                            apellido_materno: user.apellido_materno,
                            f_nacimiento: Object.assign({f:user.fecha_nacimiento},{f:poll.fecha_nacimiento}).f,
                            sexo: Object.assign({f:user.sexo},{f:poll.sexo}).f,
                            direccion_domicilio: poll.direccion_domicilio,
                            correo_electronico: poll.correo_electronico,
                            documento_identidad: doc.dni,
                            f_registro: moment().utc(),
                            id_distrito: poll.distrito,
                            code_ocupacion: poll.ocupacion,
                            prob_vulnerabilidad: parseFloat(diagnostic.predict).toFixed(4),
                            hiper_arterial: poll.hipertencion_arterial,
                            inmu_defi: poll.inmunodeficiencia,
                            vih: poll.vih,
                            enf_cro_hi: poll.enfermedad_cronica_higado
                        }
                    const record = await Create(resultDiagnostic,doc.dni);
                    const selectRecord = await Read(doc.dni);
                    res.status(200).send(response(selectRecord.rows[0]));
            } else {
                const record = await Update(parseFloat(diagnostic.predict).toFixed(4),doc.dni);
                const selectRecord = await Read(doc.dni);
                res.status(200).send(response(selectRecord.rows[0]));
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    async identity(req, res, next){
        try {
            const doc = await DocumentValidator.validateAsync(req.query)
            const result = await fetch(`https://apiperu.dev/api/dni/${doc.dni}`, 
                            { method: 'GET', 
                            headers: { 
                                'Content-Type': 'application/json', 
                                'Authorization': `Bearer ${process.env.KEY_API_PERU_DEV}` 
                            } 
                            }).then(res => res.json())
            if(!result.success)  return next(handlerError.BadRequest(result.message))
                res.status(200).send({user: result.data});
        } catch (error) {
            next(error)
        }
    }
}

function response(user) {
    return {
        nombres: user.nombres,
        apellido_paterno: user.apellido_paterno,
        apellido_materno: user.apellido_materno,
        fecha_nacimiento: user.f_nacimiento,
        sexo: user.sexo,
        direccion_domicilio: user.direccion_domicilio,
        correo_electronico: user.correo_electronico,
        documento_identidad: user.documento_identidad,
        registro: user.f_registro,
        distrito: user.id_distrito,
        ocupacion: user.code_ocupacion,
        probabilidad_vulnerabilidad: user.prob_vulnerabilidad
    }
}