'use strict'

class storeUser {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required'
    }
  }
  get messages () {
    return {
      'email.required': 'Correo Electronico es Obligatorio.',
      'email.email': 'PorFavor Introduzca un Correo Valido.',
      'email.unique': 'Este Correo ya esta Registrado.',
      'password.required': 'Introduce una Contraseña'
    }
  }
}

module.exports = storeUser