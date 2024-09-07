'use strict'

const Kilometraje = use('App/Models/Kilometraje');
const Vehiculo = use('App/Models/Vehiculo');
const { validateAll } = use('Validator')

const storeKilometrajes = use('App/Validators/storeKilometrajes')
const validaciones = new storeKilometrajes()
const Historial = use('App/Models/Historial');

class KilometrajeController {

    async index ({ auth, response }){
        const user = await auth.getUser();
        const km = await Kilometraje.query()
        .with('vehiculos')
        .fetch()
        return response.status(200).send({
            kilometrajes: km,
        })
         
    }

    async store ({ auth, request, response }){
        const user = await auth.getUser();
        try{
            const valid = await validateAll( request.only(Kilometraje.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const kmData = request.only(Kilometraje.store)

            await Kilometraje.create(kmData)

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha creado el kilometraje con vehiculo_id: ${kmData.vehiculo_id}, kilometraje: ${kmData.kilometraje}, km_recorridos: ${kmData.km_recorridos}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })

            let vehicle = await Vehiculo.findOrFail(kmData.vehiculo_id)
            
            if(vehicle){
                vehicle.kilometraje = kmData.kilometraje
                await vehicle.save()
            }

            return response.status(201).send({
                Kilometraje: kmData,
                message:"Kilometraje Registrado Correctamente",
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
        const user = await auth.getUser();
        const kmData = request.only(Kilometraje.store)
        let km =  await Kilometraje.find(params.id)
        try {
            km.merge(kmData)
            await km.save()

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha actualizado el kilometraje con el id ${params.id} vehiculo_id: ${kmData.vehiculo_id}, kilometraje: ${kmData.kilometraje}, km_recorridos: ${kmData.km_recorridos}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })

            return response.status(201).send({
                km: km,
                message:"Kilometraje Actualizado Correctamente"
            })
        }catch (e) {
            return response.status(400).send({
                Fail:"Ha Ocurrido Un Error"
            })
        }
    }

}

module.exports = KilometrajeController
