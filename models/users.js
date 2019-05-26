const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    landline: Number,
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(5, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash;
                next();
            })
        });
    }else{
        next();
    }
});

module.exports = mongoose.model('users', UserSchema);