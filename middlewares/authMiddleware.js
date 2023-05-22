const ErrorHandler = require("../errors/errorHanlder");

const authMiddleware = (req, res, next) => {
    const Globalrole = 'admin';
    const { role } = req.query;
    if (role && (role === Globalrole)) {
        next();
    } else {
        next(ErrorHandler.Forbidden());
        // res.json({ message: 'Not Allowed!' })
    }
}

module.exports = authMiddleware;