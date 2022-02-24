package com.example.sd_assignment1;

import com.googlecode.jsonrpc4j.JsonRpcParam;
import com.googlecode.jsonrpc4j.JsonRpcService;

import java.util.List;

@JsonRpcService("/calculator")
public interface ExampleServerAPI {
    List<String> getMeasurements(@JsonRpcParam(value = "username") String username, @JsonRpcParam(value = "days") int days);

    List<String> getBaseline(@JsonRpcParam(value = "username") String username);

    String optimalProgramme(@JsonRpcParam(value = "username") String username, @JsonRpcParam(value = "interval") int interval);
}
