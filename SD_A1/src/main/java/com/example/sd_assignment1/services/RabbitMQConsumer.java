package com.example.sd_assignment1.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.text.ParseException;

@Component
public class RabbitMQConsumer {
    private final MeasurementService measurementService;

    public RabbitMQConsumer(MeasurementService measurementService) {
        this.measurementService = measurementService;
    }

    @RabbitListener(queues = "${ds2020.rabbitmq.queue}")
    public void receiveMessage(String value) throws ParseException {
        //System.out.println("Recieved Message From RabbitMQ: " + value);
        measurementService.consumeAndStore(value);
    }
}
