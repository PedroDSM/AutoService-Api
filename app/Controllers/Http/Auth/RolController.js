'use strict'

const Rol = use('App/Models/Rol');
const VistaRol = use('App/Models/VistaRol');
const Historial = use('App/Models/Historial');

const { validateAll } = use('Validator');

const storeRol = use('App/Validators/storeRol');
const validaciones = new storeRol();
const storeVistaRol = use('App/Validators/storeVistaRol');
const validacionesVistaRol = new storeVistaRol();

class RolController {
    
    async index ({ auth, response }){
        //const user = await auth.getUser();
        const roles = await Rol.query()
        .with('vistas')
        .fetch()
        return response.status(200).send({
            roles: roles,
        })
    }

    async store ({ auth, request, response }){
        //const user = await auth.getUser();
        try{
            const valid = await validateAll( request.only(Rol.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const roladata = request.only(Rol.store)

            await Rol.create(roladata)

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha creado el rol con los siguientes datos: rol_name: ${roladata.rol_name}, description: ${roladata.description}`;

            // Crear el historial
            await Historial.create({
                user_id: null,
                descripcion: historialDescripcion
            });

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
      
    async update({ auth, params, request, response }){
        const user = await auth.getUser();
        const roldata = request.only(Rol.store)
        let rol = await Rol.find(params.id)
        try {
            rol.merge(roldata)
            await rol.save()

            
            // Crear la descripción para el historial
            const historialDescripcion = `Se ha actualizado el rol ` + params.id + `con los siguientes datos: rol_name: ${roldata.rol_name}, description: ${roldata.description}`;

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            });

            return response.status(201).send({
                roldata: rol,
                message:"Rol Modificado Correctamente"
            })
        }catch (e) {
            console.log(e)
            return response.status(400).send({

                Fail:"Ha Ocurrido Un Error"

            })
        }
    }

    async destroy({ auth, params, response }) {
        const user = await auth.getUser();
        try {
          const R =  await Rol.findOrFail(params.id)
          let mensaje = ""
          if(R.status){ mensaje = "Estatus Inactivo" }
          if(!R.status){ mensaje = "Estatus Activo" }
          R.status = !R.status 
          await R.save()

          await Historial.create({
            user_id: user.id,
            descripcion: "Se ha cambiado el estatus del rol: " + params.id + " a: " + mensaje
        });

          return response.status(200).send({
            rol: R,
            mensaje:mensaje
          })
        }catch (e) {
            return response.status(400).send({
                Fail:"No Se Logro Cambiar El Estatus",
                error: e.code
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

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha creado la relacion VistaRol con rol_id: ${vrdata.rol_id}, vista_id: ${vrdata.vista_id}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })

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

    async updateVistaRol({ auth, params, request, response }){
        const user = await auth.getUser();
        const vrdata = request.only(VistaRol.vista_rol)
        let vr = await VistaRol.find(params.id)
        try {
            vr.merge(vrdata)
            await vr.save()

            // Crear la descripción para el historial
            const historialDescripcion = `Se ha actualizado la relacion VistaRol con rol_id: ${vrdata.rol_id}, vista_id: ${vrdata.vista_id}`

            // Crear el historial
            await Historial.create({
                user_id: user.id,
                descripcion: historialDescripcion
            })

            return response.status(201).send({
                vrdata: vr,
                message:"VistaRol Modificada Correctamente"
            })
        }catch (e) {
            return response.status(400).send({
                Fail:"Ha Ocurrido Un Error"
            })
        }
    }
}

module.exports = RolController