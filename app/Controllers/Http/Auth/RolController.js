'use strict'

const Rol = use('App/Models/Rol');

class RolController {
    
    async index ({ auth }){
        const user = await auth.getUser();
        return Rol.all();
    }

    async create({ auth, request, response }) {
        try {
          const user = await auth.getUser();
      
          const { rol_name, description } = request.all();
      
          const rol = new Rol();
          rol.rol_name = rol_name;
          rol.description = description;
      
          await rol.save();
      
          return response.status(201).json({ rol_creado: rol, mensaje: 'Rol creado exitosamente' });
        } catch (error) {
          console.error('Error capturado:', error);
          return response.status(401).json({ mensaje: 'No autorizado' });
        }
    }
      
      
}

module.exports = RolController
