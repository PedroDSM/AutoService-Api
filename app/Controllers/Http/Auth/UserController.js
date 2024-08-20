'use strict'

const User = use('App/Models/User');
const Token = use('App/Models/Token');
const { validateAll } = use('Validator')

const storeUser = use('App/Validators/storeUser')
const validaciones = new storeUser()

class UserController {

    async index ({response}){

        const users = await User.query()
        .with('rol')
        .fetch()
        return response.status(200).send({
            usuario: users,
        })
         
    }
    
    async login({ request, response, auth }) {
        const userdata = request.only(User.login)
      
        try {
            // Autenticación del usuario
            const { token } = await auth.attempt(email, password);

            // Obtener el usuario con la información del token
            const user = await User.findBy('email', userdata.email);
            if (!user) {
                return response.status(400).json({ mensaje: 'Usuario no encontrado' });
            }

            // Guarda el token en la base de datos
            await Token.create({ user_id: user.id, token, type: 'jwt' });

            return response.status(200).json({ token, mensaje: 'Inicio de sesión exitoso' });
        } catch (error) {
            console.error('Error de autenticación:', error);
            return response.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }
    }
      
    async store({ request, response }) {
        try{
            const valid = await validateAll( request.only(User.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }
            const userdata = request.only(User.store)
            const user = await User.create(userdata)

            // Devolver la respuesta
            return response.status(201).send({"mensaje":"Usuario Creado Exitosamente", "user":user})
        }catch (error) {
            return response.status(400).send({
                Fail:"Ha Ocurrido Un Error"
            })
        }
    }

    async logout({ request, auth, response }) {
        const token = auth.getAuthHeader();
    
        // Revocar el token en la base de datos
        await Token.query().where('token', token).update({ is_revoked: true });
    
        return response.status(200).json({ mensaje: 'Cierre de sesión exitoso' });
    }
}

module.exports = UserController
