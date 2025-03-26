const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');
   const User = require('./models/User');

   const signup = async (username, email, password) => {
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = new User({ username, email, password: hashedPassword });
       await user.save();
       return jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
   };

   const login = async (email, password) => {
       const user = await User.findOne({ email });
       if (!user) throw new Error('User not found');
       const valid = await bcrypt.compare(password, user.password);
       if (!valid) throw new Error('Invalid password');
       return jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
   };

   module.exports = { signup, login };