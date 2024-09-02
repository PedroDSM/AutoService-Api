'use strict'

const Vehiculo = use('App/Models/Vehiculo');
const { validateAll } = use('Validator');

const storeVehiculo = use('App/Validators/storeVehiculo');
const validaciones = new storeVehiculo();

class VehiculoController {

    async index ({ auth, response }){
        //const user = await auth.getUser();
        const vehicles = await Vehiculo.query()
        .with('user')
        .fetch()
        return response.status(200).send({
            vehiculos: vehicles,
        })
         
    }

    async store ({ auth, request, response }){
        //const user = await auth.getUser();
        try{
            const valid = await validateAll( request.only(Vehiculo.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const vehicleData = request.only(Vehiculo.store)

            await Vehiculo.create(vehicleData)
            return response.status(201).send({
                Vehiculo: vehicleData,
                message:"Vehiculo Creado Correctamente",
            })
        }catch(e){
            return response.status(401).send({
                message:"Vehiculo No Creado",
                error:e
            })
        }

    }

    async update({ auth, params, request, response }){
        //const user = await auth.getUser();
        const vehicleData = request.only(Vehiculo.store)
        let vehicle =  await Vehiculo.find(params.id)
        try {
            vehicle.merge(vehicleData)
            await vehicle.save()

            return response.status(201).send({
                vehiculo: vehicle,
                message:"Vehiculo Modificado Correctamente"
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
          const vehicle = await Vehiculo.findOrFail(params.id)
    
            // Obtener el nuevo estado
            const { estado } = request.only(['estado'])

            let mensajeEstado = ''
            
            // Usar switch para asignar el estado y mensaje correspondiente
            switch (parseInt(estado)) {
            case Vehiculo.estados.ACTIVO:
                vehicle.estado = Vehiculo.estados.ACTIVO
                mensajeEstado = 'El vehículo está Activo.'
                break
            case Vehiculo.estados.INACTIVO:
                vehicle.estado = Vehiculo.estados.INACTIVO
                mensajeEstado = 'El vehículo está Inactivo.'
                break
            case Vehiculo.estados.EN_TALLER:
              vehicle.estado = Vehiculo.estados.EN_TALLER
              mensajeEstado = 'El vehículo está en Taller.'
              break
            case Vehiculo.estados.ACCIDENTADO:
              vehicle.estado = Vehiculo.estados.ACCIDENTADO
              mensajeEstado = 'El vehículo está Accidentado.'
              break
            case Vehiculo.estados.PERDIDA_TOTAL:
              vehicle.estado = Vehiculo.estados.PERDIDA_TOTAL
              mensajeEstado = 'El vehículo fue Perdida Total.'
              break
            case Vehiculo.estados.ROBADO:
              vehicle.estado = Vehiculo.estados.ROBADO
              mensajeEstado = 'El vehículo fue Robado.'
              break
            default:
              return response.status(400).send({
                error: 'Estado no válido'
              })
          }
          
          // Guardar cambios en la base de datos
          await vehicle.save()
      
          return response.status(200).send({
            vehiculo: vehicle,
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

module.exports = VehiculoController
