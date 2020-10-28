const jwt = require('jsonwebtoken');

exports.requireSignin = (request,response,next) => {
    if (request.headers.authorization) {
        const token = request.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        request.user = user;
    }
    else{
        return response.status(401).json({ message: 'Authorization required' });
    }

    next();
}