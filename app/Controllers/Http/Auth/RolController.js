'use strict'

const Rol = use('App/Models/Rol');
const { validateAll } = use('Validator')

const storeRol = use('App/Validators/storeRol')
const validaciones = new storeRol()

class RolController {
    
    async index ({ auth }){
        const user = await auth.getUser();
        return Rol.all();
    }

    async create({ auth, request, response }) {

      try{
        const user = await auth.getUser();
        const valid = await validateAll( request.only(Rol.store), validaciones.rules, validaciones.messages)
        if(valid.fails()){
            return response.status(401).send({message:valid.messages()})
        }
        const roldata = request.only(Rol.store)
        await Rol.create(roldata)

        // Devolver la respuesta
        return response.status(201).json({ rol_creado: rol, mensaje: 'Rol creado exitosamente' });
      }catch (error) {
        console.error('Error capturado:', error);
        return response.status(401).json({ mensaje: 'No autorizado' });
      }

    }
      
      
}

module.exports = RolController
