const jwt = require('jsonwebtoken');
const customAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req,res,next) =>{
    //we will take token from header
    //console.log(req.headers);
    //for reference : authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInVzZXJuYW1lIjoicmFqZSIsImlhdCI6MTY1OTE4ODI0NywiZXhwIjoxNjYxNzgwMjQ3fQ.8TPq4c35CG4Jg6Ve83FenLY59SCKjyjzGhtmOqIPZsQ'
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        throw new customAPIError('no token provided',401);
    }
    //we get token by authorization field
    const token = authHeader.split(' ')[1];

    //verifying token using jsonwebtoken package
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //console.log(decoded);   -> { id: 30, username: 'raje', iat: 1659188247, exp: 1661780247 }
        const {id, username} = decoded;
        req.user = {id, username};
        next();
    } catch (error) {
        throw new customAPIError('Not authorised to access this route',401);
    }
}

module.exports = authenticationMiddleware;