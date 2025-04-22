# Usar Node versão slim
FROM node:23-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e instalar dependências
COPY package.json ./
RUN npm install

# Copiar todo o código
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

