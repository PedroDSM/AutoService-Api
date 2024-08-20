'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rol extends Model {
    static get table () {
        return 'roles'
    }

    // Un rol puede estar asociado a muchos usuarios
    users () {
        return this.hasMany('App/Models/User', 'id', 'rol_id')
    }

    vistas() {
        return this.belongsToMany('App/Models/Vista')
        .pivotTable('vistas_roles')
    }
}

module.exports = Rol
