# Versão do Node utilizada:
v20.11.1

# Comando para rodar back end
./mvnw spring-boot:run

# Comando para reinstalar dependencias
./mvnw clean install

# Comando para rodar front end
npm run dev

# Queries para teste em prod
INSERT INTO users (id, name, email, password) VALUES (1, 'Usuário Teste', 'teste@teste.com', 'senha123');