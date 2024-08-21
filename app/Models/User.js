'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  // Relación de muchos a uno con roles (cada usuario pertenece a un rol)
  rol () {
    return this.hasOne('App/Models/Rol', 'rol_id', 'id')
  }

  static get store(){
    return[
    'username', 
    'email', 
    'password', 
    'status',
    'rol_id'
  ]
}
static get login(){
  return[
  'email', 
  'password']
}
  
}

module.exports = User
