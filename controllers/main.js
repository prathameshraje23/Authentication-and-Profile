//here we check username, password in post(login) request.body
//if exists then create new JWT
//send back to front-end

//setup authentication, so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const customAPIError = require('../errors/custom-error');

const login = async (req,res) => {
    //validation can be done by
    //mongo
    //Joi
    //check in controller
    const {username, password} = req.body;
    if(!username || !password)
    {
        throw new customAPIError('Please provide username & password',400);
    }

    //just for demo, normally provided by DB!!!
    const id = new Date().getDate();

    //try to keep payload small, better experience for user, dont pass password as it is credential
    //just for demo, in production use long, complex, unguessable string value in secret i.e. in .env !!!!!
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'});

    res.status(200).json({msg:'user created',token});   //we are sending token in response
}

//we need to handle token on frontend -> local storage


//dashboard is messed up & if we need authorization for another route same code is required
//so, instead of writing again, we will create a middleware & invoke it in route e.g. routes folder -> main.js
//we comment his and see next one

// const dashboard = async (req,res) => {
//     //we will take token from header
//     //console.log(req.headers);
//     //for reference : authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInVzZXJuYW1lIjoicmFqZSIsImlhdCI6MTY1OTE4ODI0NywiZXhwIjoxNjYxNzgwMjQ3fQ.8TPq4c35CG4Jg6Ve83FenLY59SCKjyjzGhtmOqIPZsQ'
//     const authHeader = req.headers.authorization;
//     if(!authHeader || !authHeader.startsWith('Bearer '))
//     {
//         throw new customAPIError('no token provided',401);
//     }
//     //we get token by authorization field
//     const token = authHeader.split(' ')[1];

//     //verifying token using jsonwebtoken package
//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         //console.log(decoded);   -> { id: 30, username: 'raje', iat: 1659188247, exp: 1661780247 }
//         const luckyNumber = Math.floor(Math.random()*100);
//         res.status(200).json({msg:`Hello ${decoded.username}`, secret:`Here is your authorised data. Your lucky number is ${luckyNumber}`})
//     } catch (error) {
//         throw new customAPIError('Not authorised to access this route',401);
//     }
    
// }

const dashboard = async (req,res) => {
    //we will get username from req.user property
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg:`Hello ${req.user.username}`, secret:`Here is your authorised data. Your lucky number is ${luckyNumber}`})
}

module.exports = {login, dashboard};