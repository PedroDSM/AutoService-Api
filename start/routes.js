'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('/users', 'Auth/UserController.index')
    Route.post('/login', 'Auth/UserController.login');
    Route.post('/registro', 'Auth/UserController.store');
    Route.post('/logout', 'Auth/UserController.logout').middleware(['checktoken']);
    Route.get('/roles', 'Auth/RolController.index').middleware(['auth']);
    Route.post('/new_rol', 'Auth/RolController.create').middleware(['auth']);
}).prefix('api/v1');
