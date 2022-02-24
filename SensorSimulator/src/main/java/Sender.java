import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeoutException;

public class Sender {
    static int index = 10;
    static final String url = "amqps://gdzncbkx:mMTeO_R8EezBUHRva63Acv8ofWq5oAo0@roedeer.rmq.cloudamqp.com/gdzncbkx";

    private static List<String> parseCSV(String filename, int idSensor) {
        List<String> records = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                LocalDateTime dateTime = LocalDateTime.now().minus(Duration.of(6, ChronoUnit.DAYS)).plus(Duration.of(index, ChronoUnit.MINUTES));
                Date tmfn = Date.from(dateTime.atZone(ZoneId.systemDefault()).toInstant());
                String dateString = format.format(tmfn);
                records.add(idSensor + ";" + dateString + ";" + line.trim());
                index += 10;

            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return records;
    }

    public static void main(String[] args) throws IOException, TimeoutException, URISyntaxException, NoSuchAlgorithmException, KeyManagementException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri(new URI(url));

        try (Connection connection = factory.newConnection()) {
            Channel channel = connection.createChannel();
            channel.queueDeclare("hello-world", false, false, false, null);

            String filename = args[0];
            int idSensor = Integer.parseInt(args[1]);
            List<String> messageList = parseCSV(filename, idSensor);

            for (String s : messageList) {
                channel.basicPublish("", "hello-world", false, null, s.getBytes());
                Thread.sleep(100);
                System.out.println(s + " sent");
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
