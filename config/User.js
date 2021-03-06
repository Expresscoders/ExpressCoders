const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 15;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {

    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

mongoose.model('User', UserSchema,"users");