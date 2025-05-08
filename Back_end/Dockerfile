# Use the official Eclipse Temurin image (recommended for Spring Boot)
# FROM eclipse-temurin:17-jdk-alpine

# The eclipse-temurin:17-jdk-alpine image you're using might be built for a newer architecture. You can try using a more compatible image by specifying a different version or architecture, such as using the openjdk base image, which is more widely supported across different CPUs.
FROM openjdk:17-jdk-alpine


# 1. Install essentials + Gradle
RUN apk add --no-cache bash git
WORKDIR /app

# 2. Copy build configuration files (preserves layer caching)
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

# Ensure gradlew is executable
RUN chmod +x gradlew

# 3. Build once (cache dependencies)
RUN ./gradlew build --no-daemon || return 0

# 4. Continuous development command
CMD ["./gradlew", "bootRun", "--continuous", "--no-daemon"]
