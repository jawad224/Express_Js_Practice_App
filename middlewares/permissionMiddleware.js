import ErrorHandler from "../errors/errorHanlder.js";

export const authMiddleware = (req, res, next) => {
    const Globalrole = 'admin';
    const { role } = req.query;
    if (role && (role === Globalrole)) {
        next();
    } else {
        next(ErrorHandler.Forbidden());
        // res.json({ message: 'Not Allowed!' })
    }
}

export const downloadMiddleware = (req, res, next) => {
    const Globalrole = 'true';
    const { isAccess } = req.query;
    if (isAccess && (isAccess === Globalrole)) {
        next();
    } else {
        res.json({ message: 'Not Allowed!' })
    }
}