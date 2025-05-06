# Use the official Eclipse Temurin image (recommended for Spring Boot)
FROM eclipse-temurin:17-jdk-alpine


# 1. Install essentials + Gradle
RUN apk add --no-cache bash git
WORKDIR /app

# 2. Copy build configuration files (preserves layer caching)
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

# 3. Build once (cache dependencies)
RUN ./gradlew build --no-daemon || return 0

# 4. Continuous development command
CMD ["./gradlew", "bootRun", "--continuous", "--no-daemon"]
