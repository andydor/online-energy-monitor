package com.example.sd_assignment1.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class TokenService {
    private final Map<String, Authentication> cache = new HashMap<>();

    public void put(String token, Authentication authentication) {
        cache.put(token, authentication);
        log.info("putToken: size = " + cache.size() + " tokens: " + cache);
    }

    public Authentication getAuth(String token) {
        return cache.getOrDefault(token, null);
    }

    public void deleteToken(String token) {
        cache.remove(token);
        log.info("deleteToken: size = " + cache.size() + " tokens: " + cache);
    }
}