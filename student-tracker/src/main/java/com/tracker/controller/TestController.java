package com.tracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "Spring Boot backend is running!");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/auth-test")
    public ResponseEntity<Map<String, Object>> authTest() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Authentication is working!");
        response.put("authenticated", true);
        return ResponseEntity.ok(response);
    }
}