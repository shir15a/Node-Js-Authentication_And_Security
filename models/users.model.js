const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens:[{
        token:{
            type : String,
            required : true
        }
    }]

})


//for login (email)
userSchema.statics.findByCredentails = async(email, password)=>{
    const user = await userModel.findOne({email})
    if(!user){
        throw new Error('Unable to login- ther is no user with this email')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login- there is no match between passwords')
    }
    return user
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id : user._id.toString()}, 'thisismynewcourse');

    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}



// update for password
// Hash the palin text password begore saving
userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
	next();
});


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;