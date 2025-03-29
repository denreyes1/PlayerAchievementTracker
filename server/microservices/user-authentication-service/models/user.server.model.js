const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'player' },
    createdAt: { type: Date, default: Date.now },
});

// ✅ Hash password before saving (ONLY if not already hashed)
UserSchema.pre('save', async function (next) {
    if (this.isModified('password') && !this.password.startsWith('$2b$')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// ✅ Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;