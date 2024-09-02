'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Historial extends Model {
    static get table () {
        return 'historiales'
    }

    // Un rol puede estar asociado a muchos usuarios
    users () {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Historial
