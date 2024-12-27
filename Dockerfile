# Rasm yaratish uchun bazaviy Node.js image
FROM node:18

# Ishlash uchun katalog yaratish
WORKDIR /usr/src/app

# Paketlarni o'rnatish
COPY package*.json ./
RUN npm install

# Loyiha kodlarini ko'chirish
COPY . .

# Port ochish
EXPOSE 3000

# Ilovani ishga tushirish
CMD ["npm", "start"]
