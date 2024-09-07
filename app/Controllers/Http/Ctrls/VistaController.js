'use strict'

const Vista = use('App/Models/Vista');
const { validateAll } = use('Validator')

const storeVista = use('App/Validators/storeVista')
const validaciones = new storeVista()
const Historial = use('App/Models/Historial');

class VistaController {

    async index ({ auth, response }){
        //const user = await auth.getUser();
        const vistas = await Vista.query()
        .with('roles')
        .fetch()
        return response.status(200).send({
            vistas: vistas,
        })
    }

    async store ({ auth, request, response}){
        const user = await auth.getUser();
        try{
            const valid = await validateAll( request.only(Vista.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const vistadata = request.only(Vista.store)

            await Vista.create(vistadata)

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha creado la Vista con nombre: ${vistadata.nombre}, icono: ${vistadata.icono}, ruta: ${vistadata.ruta}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })

            return response.status(201).send({
                Vista: vistadata,
                message:"Vista Creada Correctamente",
            })
        }catch(e){
            return response.status(401).send({
                message:"Vista No Creada",
                error:e
            })
        }
      
    }

    async update({ auth, params, request, response }){
        const user = await auth.getUser();
        const vistadata = request.only(Vista.store)
        let vista =  await Vista.find(params.id)
        try {
            vista.merge(vistadata)
            await vista.save()

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha actualizado el Vista con id ${params.id} con nombre: ${vistadata.nombre}, icono: ${vistadata.icono}, ruta: ${vistadata.ruta}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })


            return response.status(201).send({
                vistadata: vista,
                message:"Vista Modificada Correctamente"
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
          const V =  await Vista.findOrFail(params.id)
          let mensaje = ""
          if(V.status){ mensaje = "Estatus Inactiva" }
          if(!V.status){ mensaje = "Estatus Activa" }
          V.status = !V.status 
          await V.save()

          // Crear la descripción para el historial
          const historialDescripcion = `Se ha cambiado el estatus de la vista con id ${params.id} a: ${mensaje}`

          // Crear el historial
          await Historial.create({
              user_id: user.id,
              descripcion: historialDescripcion
          })

          return response.status(200).send({
            vista: V,
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

module.exports = VistaController
