# Rasm yaratish uchun bazaviy Node.js image
FROM node:18

# Ishlash uchun katalog yaratish
WORKDIR /usr/src/app

# Paketlarni o'rnatish
COPY package*.json ./
RUN npm install

# Loyiha kodlarini ko'chirish
COPY . .

# Paketlarni o'rnatish va bcrypt'ni kompilyatsiya qilish
RUN npm install --build-from-source

# Port ochish
EXPOSE 3000

# Ilovani ishga tushirish
CMD ["npm", "start"]
