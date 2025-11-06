
# --STAGE 1: build the Spring Boot app with Maven--
    FROM maven:3.9-eclipse-temurin-21 AS build
    WORKDIR /app
    COPY pom.xml .
    RUN mvn -q -DskipTests dependency:go-offline
    COPY src ./src
    RUN mvn -q -DskipTests package


# --STAGE 2: run the Spring Boot app JRE--
    FROM eclipse-temurin:21-jre-alpine
    WORKDIR /app
    RUN apk add --no-cache curl
    COPY --from=build /app/target/*.jar app.jar

    EXPOSE 8080
    CMD ["java", "-jar", "/app/app.jar"]
