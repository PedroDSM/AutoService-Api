'use strict'

const Taller = use('App/Models/Taller');
const { validateAll } = use('Validator')

const storeTalleres = use('App/Validators/storeTalleres')
const validaciones = new storeTalleres()

class TallerController {

    async index ({ auth, response }){
        //const user = await auth.getUser();
        const talleres = await Taller.all()
        return response.status(200).send({
            talleres: talleres,
        })
    }

    async store ({ auth, request, response}){
        //const user = await auth.getUser();
        try{
            const valid = await validateAll( request.only(Taller.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const tallerdata = request.only(Taller.store)

            await Taller.create(tallerdata)
            return response.status(201).send({
                Taller: tallerdata,
                message:"Taller Registrado Correctamente",
            })
        }catch(e){
            return response.status(401).send({
                message:"Taller No Registrado",
                error:e
            })
        }
      
    }

    async update({ auth, params, request, response }){
        //const user = await auth.getUser();
        const tallerdata = request.only(Taller.store)
        let taller =  await Taller.find(params.id)
        try {
            taller.merge(tallerdata)
            await taller.save()

            return response.status(201).send({
                tallerdata: taller,
                message:"Taller Modificado Correctamente"
            })
        }catch (e) {
            return response.status(400).send({
                Fail:"Ha Ocurrido Un Error"
            })
        }
    }

    async destroy({ auth, params, response }) {
        //const user = await auth.getUser();
        try {
          const T =  await Taller.findOrFail(params.id)
          let mensaje = ""
          if(T.status){ mensaje = "Estatus Inactivo" }
          if(!T.status){ mensaje = "Estatus Activo" }
          T.status = !T.status 
          await T.save()
          return response.status(200).send({
            taller: T,
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

module.exports = TallerController
