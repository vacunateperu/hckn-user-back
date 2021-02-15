const db = require("../config/init_db");
module.exports = {
    Create(obj) {
        console.log(obj)
        return db.query(`INSERT INTO public.persona(
            nombres, apellido_paterno, apellido_materno, f_nacimiento, sexo, direccion_domicilio, correo_electronico, documento_identidad, f_registro, id_distrito, code_ocupacion, prob_vulnerabilidad)
            VALUES ('${obj.nombres}', '${obj.apellido_paterno}', '${obj.apellido_materno}', '${obj.f_nacimiento}', '${obj.sexo}', '${obj.direccion_domicilio}', '${obj.correo_electronico}', '${obj.documento_identidad}', '${obj.f_registro}', '${obj.id_distrito}', '${obj.code_ocupacion}', '${obj.prob_vulnerabilidad}')`)
    },
    Read(dni) {
        return db.query(`SELECT * FROM public.persona  WHERE documento_identidad = '${dni}' LIMIT 1`)
    }
}