package com.example.sd_assignment1.services;

import com.example.sd_assignment1.entities.Measurement;
import com.example.sd_assignment1.entities.Sensor;
import com.example.sd_assignment1.repositories.MeasurementRepository;
import com.example.sd_assignment1.repositories.SensorRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

@Service
public class MeasurementService {
    private final SensorRepository sensorRepository;
    private final MeasurementRepository measurementRepository;
    private final SimpMessagingTemplate smTemplate;

    public MeasurementService(SensorRepository sensorRepository, MeasurementRepository measurementRepository, SimpMessagingTemplate smTemplate) {
        this.sensorRepository = sensorRepository;
        this.measurementRepository = measurementRepository;
        this.smTemplate = smTemplate;
    }

    public void consumeAndStore(String value) throws ParseException {
        String[] values = value.split(";");
        Optional<Measurement> lastEntry = measurementRepository.findTopByOrderByIdDesc();
        Measurement last = new Measurement();
        Optional<Sensor> s = sensorRepository.findById(Long.parseLong(values[0]));
        if (s.isPresent()) {
            Sensor sensor = s.get();
            Measurement m = new Measurement();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = format.parse(values[1]);
            if (lastEntry.isPresent()) {
                last = lastEntry.get();
                if (last.getSensor().getId() == sensor.getId()) {
                    Double peak = (Double.parseDouble(values[2]) - last.getValue()) / ChronoUnit.MINUTES.between(last.getTimestamp().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime(), date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
                    System.out.println(peak + "     " + sensor.getMaxValue());
                    if (peak > sensor.getMaxValue()) {
                        smTemplate.convertAndSend("/topic/message", "Sensor with id " + sensor.getId() + " had a peak at " + date);
                        return;
                    }
                }
            }
            m.setTimestamp(date);
            m.setValue(Double.parseDouble(values[2]));
            Measurement id = measurementRepository.save(m);
            sensor.getMeasurements().add(id);
            sensorRepository.save(sensor);
            id.setSensor(sensor);
            measurementRepository.save(id);
        }
    }
}
