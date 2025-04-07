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

# Banco em memória
http://localhost:8080/h2-console/login.do?jsessionid=006cc0dd42187b099136864763d46310