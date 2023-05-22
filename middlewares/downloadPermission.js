const downloadMiddleware = (req, res, next) => {
    const Globalrole = 'true';
    const { isAccess } = req.query;
    if (isAccess && (isAccess === Globalrole)) {
        next();
    } else {
        res.json({ message: 'Not Allowed!' })
    }
}

module.exports = downloadMiddleware;