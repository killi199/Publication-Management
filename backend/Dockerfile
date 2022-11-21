#
# Build stage
#
FROM maven:3.8.6-openjdk-18-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -Dmaven.test.skip

#
# Package stage
#
FROM openjdk:19-alpine
COPY --from=build /home/app/target/*.jar /usr/local/lib/library.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/library.jar"]