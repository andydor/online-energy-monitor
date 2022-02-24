FROM maven:3.6.3-jdk-11 AS builder

COPY ./src/ /root/src
COPY ./pom.xml /root/
COPY ./checkstyle.xml /root/
WORKDIR /root
RUN mvn package
RUN java -Djarmode=layertools -jar /root/target/SD_Assignment1-0.0.1-SNAPSHOT.jar list
RUN java -Djarmode=layertools -jar /root/target/SD_Assignment1-0.0.1-SNAPSHOT.jar extract
RUN ls -l /root

FROM openjdk:11.0.6-jre

ENV TZ=UTC
ENV DB_IP=ec2-176-34-105-15.eu-west-1.compute.amazonaws.com
ENV DB_PORT=5432
ENV DB_USER=grqkjpwxulipwj
ENV DB_PASSWORD=f5b7f3bbf3c9119fab2e86c3cad3a1528b77c6d765f7081d48acc9a894ebfd4d
ENV DB_DBNAME=d29cbr6mdn9hc


COPY --from=builder /root/dependencies/ ./
COPY --from=builder /root/snapshot-dependencies/ ./

RUN sleep 10
COPY --from=builder /root/spring-boot-loader/ ./
COPY --from=builder /root/application/ ./
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher","-XX:+UseContainerSupport -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=1 -Xms512m -Xmx512m -XX:+UseG1GC -XX:+UseSerialGC -Xss512k -XX:MaxRAM=72m"]
