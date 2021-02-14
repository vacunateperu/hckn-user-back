const handlerError = require("http-errors");
// https://apiperu.dev/api/dni/{numero} 
 
const fetch = require("node-fetch");
module.exports = {
    async query(req, res, next){
        try {
            if(!req.query.dni)  return next(handlerError.BadRequest("Este campo es requerido"))
            const result = await fetch(`https://apiperu.dev/api/dni/${req.query.dni}`, 
            { method: 'GET', 
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${process.env.KEY_API_PERU_DEV}` 
            } 
        }).then(res => res.json())
        console.log(result)
        if(!result.success)  return next(handlerError.BadRequest(result.message))
            const user = result.data;
            delete user.origen;
            delete user.nombre_completo;
            delete user.codigo_verificacion;
            res.status(200).send(Object.assign(user, {
                "direccion_domicilio": (req.body.direccion_domicilio)?req.body.direccion_domicilio:"Av. Siempre Viva",
                "correo_electronico": (req.body.correo_electronico)?req.body.correo_electronico:"charcapito@gmail.com",
                "distrito": (req.body.distrito)?req.body.distrito:"021801",
                "ocupacion": (req.body.ocupacion)?req.body.ocupacion:"NI",
                "fecha_nacimiento": (req.body.fecha_nacimiento)?req.body.fecha_nacimiento:"NI",
                "sexo": (req.body.sexo)?req.body.sexo:"M",
                "gestante": (req.body.gestante)?req.body.gestante:"NO",
                "contacto": (req.body.contacto)?req.body.contacto:"NO",
                "obesidad": (req.body.obesidad)?req.body.obesidad:"SI",
                "diabetes": (req.body.diabetes)?req.body.diabetes:"NO",
                "enfermedad_respitatoria": (req.body.enfermedad_respitatoria)?req.body.enfermedad_respitatoria:"NI",
                "hipertencion": (req.body.hipertencion)?req.body.hipertencion:"NO",
                "insuficiencia_renal": (req.body.insuficiencia_renal)?req.body.insuficiencia_renal:"NO",
                "enfermedad_cardiovascular": (req.body.enfermedad_cardiovascular)?req.body.enfermedad_cardiovascular:"NO",
                "cancer": (req.body.cancer)?req.body.cancer:"NO",
                "Inmunodeficiencia": (req.body.Inmunodeficiencia)?req.body.Inmunodeficiencia:"NO",
                "vih": (req.body.vih)?req.body.vih:"NO"
            }))
        } catch (error) {
            next(error)
        }
    }
}