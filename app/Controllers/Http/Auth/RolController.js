'use strict'

const Rol = use('App/Models/Rol');
const VistaRol = use('App/Models/VistaRol');

const { validateAll } = use('Validator');

const storeRol = use('App/Validators/storeRol');
const validaciones = new storeRol();
const storeVistaRol = use('App/Validators/storeVistaRol');
const validacionesVistaRol = new storeVistaRol();

class RolController {
    
    async index ({ auth, response }){
        const user = await auth.getUser();
        const roles = await Rol.query()
        .with('vistas')
        .fetch()
        return response.status(200).send({
            roles: roles,
        })
    }

    async store ({ auth, request, response }){
            const user = await auth.getUser();
        try{
            const valid = await validateAll( request.only(Rol.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const roladata = request.only(Rol.store)

            await Rol.create(roladata)
            return response.status(201).send({
                Roles: roladata,
                message:"Rol Creado Correctamente",
            })
        }catch(e){
            return response.status(401).send({
                message:"Rol No Creado",
                error:e
            })
        }

    }
      
    
    async VistaRol({ auth, request, response }){
        const user = await auth.getUser();

        try{
            const valid = await validateAll( request.only(VistaRol.vista_rol), validacionesVistaRol.rules, validacionesVistaRol.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const vrdata = request.only(VistaRol.vista_rol)

            await VistaRol.create(vrdata)
            return response.status(201).send({
                vista_rol: vrdata,
                message:"Vista Asignada al Rol Correctamente",
            })
        }catch(e){
            return response.status(401).send({
                message:"Rol No Creado",
                error:e
            })
        }

    }
}

module.exports = RolController