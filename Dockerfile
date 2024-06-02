# Use uma imagem base Node.js 20
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta que o Vue usa por padrão
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "run", "serve"]
