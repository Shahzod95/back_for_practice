const argon2 = require('argon2');
const jwt = require('../utils/jwtHelper');
const { createUser, findUserByUsername } = require('../models/userModel');

// Ro'yxatdan o'tish
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Iltimos, foydalanuvchi nomi va parolni kiriting!' });
  }

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Bunday foydalanuvchi allaqachon mavjud!' });
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = await createUser(username, hashedPassword);

    res.status(201).json({ message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!", user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
};

// Tizimga kirish
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Iltimos, foydalanuvchi nomi va parolni kiriting!' });
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Foydalanuvchi topilmadi!' });
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return res.status(400).json({ message: "Noto'g'ri parol!" });
    }

    const token = jwt.generateToken(user);
    res.status(200).json({ message: 'Tizimga muvaffaqiyatli kirdingiz!', token });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
};
