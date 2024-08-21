'use strict'

class storeLogin {

    get rules () {
        return {
          email: 'required|email',
          password: 'required'
        }
    }
    
      get messages () {
        return {
          'email.required': 'Correo Electrónico es obligatorio.',
          'email.email': 'Por favor, introduce un correo válido.',
          'password.required': 'La contraseña es obligatoria.'
        }
    }
}

module.exports = storeLogin