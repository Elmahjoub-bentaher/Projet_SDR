chmod +x Back_end/gradlew
echo "CORS_ALLOWED_ORIGIN=http://localhost:3000" >> Back_end/.env
COMPOSE_HTTP_TIMEOUT=200 docker-compose up --build -d
