'use strict'

const Vista = use('App/Models/Vista');
const { validateAll } = use('Validator')

const storeVista = use('App/Validators/storeVista')
const validaciones = new storeVista()

class VistaController {

    async index ({ auth, response }){
        const user = await auth.getUser();
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
}

module.exports = VistaController
