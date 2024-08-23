'use strict'

const Cita = use('App/Models/Cita');
const { validateAll } = use('Validator')

const storeCitas = use('App/Validators/storeCitas')
const validaciones = new storeCitas()

class CitaController {
    async index ({ auth, response }){
        //const user = await auth.getUser();
        const citas = await Cita.query()
        .with('vehiculos')
        .with('talleres')
        .with('servicios')
        .fetch()
        return response.status(200).send({
            citas: citas,
        })
         
    }

    async store ({ auth, request, response }){
        //const user = await auth.getUser();
        try{
            const valid = await validateAll( request.only(Cita.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const citaData = request.only(Cita.store)

            await Cita.create(citaData)
            return response.status(201).send({
                Cita: citaData,
                message:"Cita Registrada Correctamente",
            })
        }catch(e){
            console.log(e);
            return response.status(401).send({
                message:"No se logro registrar la cita",
                error:e
            })
        }

    }

    async update({ auth, params, request, response }){
        //const user = await auth.getUser();
        const citaData = request.only(Cita.store)
        let cita =  await Cita.find(params.id)
        try {
            cita.merge(citaData)
            await cita.save()

            return response.status(201).send({
                cita: cita,
                message:"Cita Actualizada Correctamente"
            })
        }catch (e) {
            return response.status(400).send({
                Fail:"Ha Ocurrido Un Error"
            })
        }
    }

    async ChangeStatus({ auth, params, request, response }) {
        //const user = await auth.getUser();
        try {
          // Buscar el vehículo por ID
          const cita = await Cita.findOrFail(params.id)
    
            // Obtener el nuevo estado
            const { estado } = request.only(['estado'])

            let mensajeEstado = ''
            
            // Usar switch para asignar el estado y mensaje correspondiente
            switch (parseInt(estado)) {
            case Cita.estados.PENDIENTE:
                cita.estado = Cita.estados.PENDIENTE
                mensajeEstado = 'La cita está Pendiente.'
                break
            case Cita.estados.ENTRO_TALLER:
                cita.estado = Cita.estados.ENTRO_TALLER
                mensajeEstado = 'El vehículo Entro al Taller.'
                break
            case Cita.estados.SALIO_TALLER:
              cita.estado = Cita.estados.SALIO_TALLER
              mensajeEstado = 'El vehículo Salio del Taller.'
              break
            case Cita.estados.FINALIZADA:
              cita.estado = Cita.estados.FINALIZADA
              mensajeEstado = 'Cita Finalizada.'
              break
            case Cita.estados.CANCELADA:
            cita.estado = Cita.estados.CANCELADA
            mensajeEstado = 'Cita Cancelada.'
              break
            default:
              return response.status(400).send({
                error: 'Estado no válido'
            })
          }
          
          // Guardar cambios en la base de datos
          await cita.save()
      
          return response.status(200).send({
            cita: cita,
            message: mensajeEstado
          })
      
        } catch (e) {
            return response.status(400).send({
                Fail:"No Se Logro Cambiar El Estatus",
                error: e.code
            })
        }
    }

}

module.exports = CitaController
