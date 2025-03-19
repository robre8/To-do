FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy maven executable and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Build all dependencies for offline use
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Package the application
RUN ./mvnw package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=0 /app/target/*.jar app.jar

# Set the startup command to execute the jar
ENTRYPOINT ["java", "-jar", "app.jar"]