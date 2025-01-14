
# 1. Build Stage
FROM maven:3.9.4-eclipse-temurin-21 AS builder
LABEL authors="thuon"

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src

RUN mvn clean package -DskipTests

# 2. Runtime Stage
FROM eclipse-temurin:21-jre

WORKDIR /app

#Copy the JAR File from the builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]