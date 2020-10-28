const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
mongoose.set('useCreateIndex', true);

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

UserSchema.virtual('password')
.set(function(password) {
    this.hash_password = bcrypt.hashSync(password, 10);
})

UserSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', UserSchema);