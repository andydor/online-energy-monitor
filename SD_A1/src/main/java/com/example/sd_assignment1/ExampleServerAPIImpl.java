package com.example.sd_assignment1;

import com.example.sd_assignment1.dtos.response.HourlyEnergyDTO;
import com.example.sd_assignment1.entities.Client;
import com.example.sd_assignment1.entities.Device;
import com.example.sd_assignment1.entities.Measurement;
import com.example.sd_assignment1.entities.User;
import com.example.sd_assignment1.repositories.ClientRepository;
import com.example.sd_assignment1.repositories.MeasurementRepository;
import com.example.sd_assignment1.repositories.UserRepository;
import com.google.gson.Gson;
import com.googlecode.jsonrpc4j.spring.AutoJsonRpcServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@AutoJsonRpcServiceImpl
public class ExampleServerAPIImpl implements ExampleServerAPI {
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;
    private final MeasurementRepository measurementRepository;

    @Autowired
    public ExampleServerAPIImpl(ClientRepository clientRepository, UserRepository userRepository, MeasurementRepository measurementRepository) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.measurementRepository = measurementRepository;
    }

    @Override
    public List<String> getMeasurements(String username, int days) {
        Optional<User> user = userRepository.findByUsername(username);
        List<Device> user_devices = new ArrayList<>();
        List<Measurement> user_measurements = new ArrayList<>();

        if (user.isPresent()) {
            Optional<Client> client = clientRepository.findClientByUserId(user.get().getId());
            if (client.isPresent()) {
                user_devices = client.get().getDevices();
            }
        }
        for (Device d : user_devices) {
            if (d.getSensor() != null)
                user_measurements.addAll(measurementRepository.findMeasurementsBySensorId(d.getSensor().getId()));
        }

        List<String> json_res = new ArrayList<>();
        Gson gson = new Gson();
        int aux_days = days;
        HashMap<Date, List<Double>> measurementsByHour = new HashMap<>();
        while (aux_days > -1) {
            for (int i = 0; i < 24; i++) {
                for (Measurement m : user_measurements) {
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(m.getTimestamp());

                    Calendar m_date = Calendar.getInstance();
                    m_date.set(Calendar.YEAR, calendar.get(Calendar.YEAR));
                    m_date.set(Calendar.MONTH, calendar.get(Calendar.MONTH));
                    m_date.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH));
                    m_date.set(Calendar.HOUR_OF_DAY, calendar.get(Calendar.HOUR_OF_DAY));
                    m_date.set(Calendar.MINUTE, 0);
                    m_date.set(Calendar.SECOND, 0);

                    if (calendar.get(Calendar.DAY_OF_MONTH) == (Calendar.getInstance(TimeZone.getDefault()).get(Calendar.DAY_OF_MONTH) - aux_days)) {
                        if (calendar.get(Calendar.HOUR) == i) {
                            if (measurementsByHour.containsKey(m_date.getTime())) {
                                measurementsByHour.get(m_date.getTime()).add(m.getValue());
                            } else {
                                List<Double> values = new ArrayList<>();
                                values.add(m.getValue());
                                measurementsByHour.put(m_date.getTime(), values);
                            }
                        }

                    }
                }
            }
            aux_days--;
        }
        TreeMap<Date, List<Double>> sorted = new TreeMap<>(measurementsByHour);

        for (Map.Entry<Date, List<Double>> entry : sorted.entrySet()) {
            Date key = entry.getKey();
            List<Double> value = entry.getValue();
            json_res.add(gson.toJson(new HourlyEnergyDTO(key.toString(), value.get(value.size() - 1))));
        }
        return json_res;
    }

    @Override
    public List<String> getBaseline(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        List<Device> user_devices = new ArrayList<>();
        List<Measurement> user_measurements = new ArrayList<>();

        if (user.isPresent()) {
            Optional<Client> client = clientRepository.findClientByUserId(user.get().getId());
            if (client.isPresent()) {
                user_devices = client.get().getDevices();
            }
        }
        for (Device d : user_devices) {
            if (d.getSensor() != null)
                user_measurements.addAll(measurementRepository.findMeasurementsBySensorId(d.getSensor().getId()));
        }

        List<String> json_res = new ArrayList<>();
        Gson gson = new Gson();
        HashMap<Integer, List<Double>> measurementsByHour = new HashMap<>();

        for (int j = 0; j < 24; j++) { //ora
            List<Double> values = new ArrayList<>();
            measurementsByHour.put(j, values);
        }

        for (int k = 6; k >= 0; k--) {
            for (int i = 0; i < 24; i++) {
                Double x = 0D;
                for (Measurement m : user_measurements) {
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(m.getTimestamp());

                    if (calendar.get(Calendar.HOUR_OF_DAY) == i && calendar.get(Calendar.DAY_OF_MONTH) == Calendar.getInstance(TimeZone.getDefault()).get(Calendar.DAY_OF_MONTH) - k) {
                        x = m.getValue();
                    }
                }
                if (measurementsByHour.containsKey(i)) {
                    measurementsByHour.get(i).add(x);
                }
            }
        }

        System.out.println(Arrays.toString(measurementsByHour.entrySet().toArray()));

        for (Map.Entry<Integer, List<Double>> entry : measurementsByHour.entrySet()) {
            Integer key = entry.getKey();
            List<Double> value = entry.getValue();
            Double medie = value.stream()
                    .reduce(0D, Double::sum) / 7;
            json_res.add(gson.toJson(new HourlyEnergyDTO(key.toString(), medie)));
        }
        System.out.println(json_res);
        return json_res;
    }

    @Override
    public String optimalProgramme(String username, int interval) {
        Gson gson = new Gson();

        List<String> hourEnergyDTOs = getBaseline(username);
        System.out.println(hourEnergyDTOs);
        List<HourlyEnergyDTO> hourlyEnergyDTOS = new ArrayList<>();

        for (String s : hourEnergyDTOs) {
            hourlyEnergyDTOS.add(gson.fromJson(s, HourlyEnergyDTO.class));
        }

        System.out.println(hourlyEnergyDTOS);
        double minim = Double.MAX_VALUE;
        String intervalOptim = "";
        for (int i = 0; i < 24 - interval; i++) {
            double suma = 0;
            for (int j = i; j < i + interval; j++)
                suma += hourlyEnergyDTOS.get(j).getValue();

            if (suma < minim) {
                minim = suma;
                intervalOptim = i + " " + (i + interval);
                System.out.println(i + " " + (i + interval));
            }
        }
        return intervalOptim;
    }

//    @Override
//    public List<String> getBaseline(String username) {
//        Optional<User> user = userRepository.findByUsername(username);
//        List<Device> user_devices = new ArrayList<>();
//        List<Measurement> user_measurements = new ArrayList<>();
//
//        if (user.isPresent()) {
//            Optional<Client> client = clientRepository.findClientByUserId(user.get().getId());
//            if (client.isPresent()) {
//                user_devices = client.get().getDevices();
//            }
//        }
//        for (Device d : user_devices) {
//            if (d.getSensor() != null)
//                user_measurements.addAll(measurementRepository.findMeasurementsBySensorId(d.getSensor().getId()));
//        }
//
//        List<String> json_res = new ArrayList<>();
//        Gson gson = new Gson();
//        int aux_days = 7;
//        HashMap<Date, List<Double>> measurementsByHour = new HashMap<>();
//
//        while (aux_days > -1) {
//
//            for (Measurement m : user_measurements) {
//                for (int i = 0; i < 24; i++) {
//                    boolean flag = false;
//                    Calendar calendar = Calendar.getInstance();
//                    calendar.setTime(m.getTimestamp());
//                    //System.out.println(m.getTimestamp().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().getDayOfMonth());
//
//                    Calendar m_date = Calendar.getInstance();
//                    m_date.set(Calendar.YEAR, calendar.get(Calendar.YEAR));
//                    m_date.set(Calendar.MONTH, calendar.get(Calendar.MONTH));
//                    m_date.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH));
//                    m_date.set(Calendar.HOUR_OF_DAY, calendar.get(Calendar.HOUR_OF_DAY));
//                    m_date.set(Calendar.MINUTE, 0);
//                    m_date.set(Calendar.SECOND, 0);
//                    //System.out.println(calendar.get(Calendar.DAY_OF_MONTH) + " " + (Calendar.getInstance(TimeZone.getDefault()).get(Calendar.DAY_OF_MONTH) - aux_days) + " " + i);
//
//                    if (calendar.get(Calendar.DAY_OF_MONTH) == (Calendar.getInstance(TimeZone.getDefault()).get(Calendar.DAY_OF_MONTH) - aux_days)) {
//                        if (calendar.get(Calendar.HOUR) == i) {
//                            flag=true;
//                            if (measurementsByHour.containsKey(m_date.getTime())) {
//                                measurementsByHour.get(m_date.getTime()).add(m.getValue());
//                            } else {
//                                List<Double> values = new ArrayList<>();
//                                values.add(m.getValue());
//                                measurementsByHour.put(m_date.getTime(), values);
//                            }
//
//                        }
//                        else {
//                            m_date.set(Calendar.HOUR_OF_DAY, i);
//                            if (measurementsByHour.containsKey(m_date.getTime())) {
//                                //measurementsByHour.get(m_date.getTime()).add();
//                            } else {
//                                List<Double> values = new ArrayList<>();
//                                measurementsByHour.put(m_date.getTime(), values);
//                            }
//
//                        }
//                    }
//                }
//            }
//            aux_days--;
//        }
//        TreeMap<Date, List<Double>> sorted = new TreeMap<>(measurementsByHour);
//
//        System.out.println(Arrays.toString(sorted.entrySet().toArray()));
//
//        for (Map.Entry<Date, List<Double>> entry : sorted.entrySet()) {
//            Date key = entry.getKey();
//            List<Double> value = entry.getValue();
//            json_res.add(gson.toJson(new HourlyEnergyDTO(key.toString(), value.get(value.size() - 1))));
//        }
//        return json_res;
//    }
}
