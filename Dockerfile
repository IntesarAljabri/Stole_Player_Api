FROM openjdk:17-jdk-alpine

WORKDIR /app

RUN apk add --no-cache maven

COPY . /app

RUN mvn clean install

EXPOSE 8080

CMD ["java", "-jar", "./target/stolen-game-api-0.0.1.jar"]
