const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtHelper');
const { createUser, findUserByUsername } = require('../models/userModel');

exports.register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Iltimos, foydalanuvchi nomi va parolni kiriting!' });
  }

  findUserByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ message: 'Server xatosi', error: err.message });
    if (user) return res.status(400).json({ message: 'Bunday foydalanuvchi allaqachon mavjud!' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Server xatosi', error: err.message });

      createUser(username, hashedPassword, (err, newUser) => {
        if (err) return res.status(500).json({ message: 'Server xatosi', error: err.message });
        res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi!', user: newUser });
      });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Iltimos, foydalanuvchi nomi va parolni kiriting!' });
  }

  findUserByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ message: 'Server xatosi', error: err.message });
    if (!user) return res.status(400).json({ message: 'Foydalanuvchi topilmadi!' });

    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err) return res.status(500).json({ message: 'Server xatosi', error: err.message });
      if (!isValid) return res.status(400).json({ message: 'Noto\'g\'ri parol!' });

      const token = jwt.generateToken(user);
      res.status(200).json({ message: 'Tizimga muvaffaqiyatli kirdingiz!', token });
    });
  });
};
