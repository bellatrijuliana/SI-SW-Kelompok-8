const UserController = require('../controllers/UserControllers');

const _routes = [
    ['users',UserController]
]

const routes = (app) => {
    _routes.forEach(router => {
        const [ url, controller ] = router
        app.use(`/api/${url}`,controller)
    });
}

module.exports = routes