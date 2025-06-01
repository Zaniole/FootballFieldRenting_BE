const UserRouter = require('./user.routes');
const FieldRouter = require('./field.routes');
const BookingRouter = require('./booking.routes');
const FieldServiceRouter = require('./fieldService.routes');
const PaymentRouter = require('./payment.routes');

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/field', FieldRouter);
    app.use('/api/booking', BookingRouter);
    app.use('/api/field-service', FieldServiceRouter);
    app.use('/api/payment', PaymentRouter);
}

module.exports = routes