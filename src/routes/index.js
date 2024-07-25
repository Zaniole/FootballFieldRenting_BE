const UserRouter = require('./UserRouter');
const FieldRouter = require('./FieldRouter');

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/field', FieldRouter);
}

module.exports = routes