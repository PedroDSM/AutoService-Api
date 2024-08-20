'use strict'

const Token = use('App/Models/Token')

class CheckToken {
  async handle({ auth, response }, next) {
    const token = auth.getAuthHeader();

    const tokenRecord = await Token.query().where('token', token).first();
    if (!tokenRecord || tokenRecord.is_revoked) {
      return response.status(401).json({ mensaje: 'Token inválido o revocado' });
    }

    await next();
  }
}

module.exports = CheckToken
