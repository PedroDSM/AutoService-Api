'use strict'

const Historial = use('App/Models/Historial');
const Servicio = use('App/Models/Servicio');
const { validateAll } = use('Validator')

const storeServicios = use('App/Validators/storeServicios')
const validaciones = new storeServicios()

class ServicioController {

    async index ({ auth, response }){
        const user = await auth.getUser();
        const servicios = await Servicio.all()
        return response.status(200).send({
            servicios: servicios,
        })
    }

    async store ({ auth, request, response}){
        const user = await auth.getUser();
        try{
            const valid = await validateAll( request.only(Servicio.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const serviciodata = request.only(Servicio.store)

            await Servicio.create(serviciodata)

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha creado el servicio con nombre: ${serviciodata.nombre}, categoría: ${serviciodata.categoria}, precio: ${serviciodata.precio}, duración: ${serviciodata.duracion}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })

            return response.status(201).send({
                Servicio: serviciodata,
                message:"Servicio Registrado Correctamente",
            })
        }catch(e){
            return response.status(401).send({
                message:"Servicio No Registrado",
                error:e
            })
        }
      
    }

    async update({ auth, params, request, response }){
        const user = await auth.getUser();
        const serviciodata = request.only(Servicio.store)
        let servicio =  await Servicio.find(params.id)
        try {
            servicio.merge(serviciodata)
            await servicio.save()

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha actualizado el servicio con id ${params.id} con nombre: ${serviciodata.nombre}, categoría: ${serviciodata.categoria}, precio: ${serviciodata.precio}, duración: ${serviciodata.duracion}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })

            return response.status(201).send({
                serviciodata: servicio,
                message:"Servicio Modificado Correctamente"
            })
        }catch (e) {
            return response.status(400).send({
                Fail:"Ha Ocurrido Un Error"
            })
        }
    }

    async destroy({ auth, params, response }) {
        const user = await auth.getUser();
        try {
            const S =  await Servicio.findOrFail(params.id)
            let mensaje = ""
            if(S.status){ mensaje = "Estatus Inactivo" }
            if(!S.status){ mensaje = "Estatus Activo" }
            S.status = !S.status 
            await S.save()

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha cambiado el estatus del servicio con id ${params.id} a: ${mensaje}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })

            return response.status(200).send({
                servicio: S,
                mensaje:mensaje
            })
        }catch (e) {
            return response.status(400).send({
                Fail:"No Se Logro Cambiar El Estatus",
                error: e.code
            })
        }
    }

}

module.exports = ServicioController
