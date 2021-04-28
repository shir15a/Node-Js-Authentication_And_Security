const jwt = require('jsonwebtoken');
const User = require('../models/users.model');


const auth = async (req, res, next) => {
    // console.log('auth middleware');
    // next()

    try {
        const token = req.header("Authorization").replace('Bearer ', '');
        console.log(token);
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});

        if(!user){
            throw new Error()
        }
        req.user = user;
        next()
    }
    catch (e) {
        res.status(401).send("error: 'Please authentication ' ")
    }
}

module.exports = auth;