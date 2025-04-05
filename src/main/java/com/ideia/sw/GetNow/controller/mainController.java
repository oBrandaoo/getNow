package com.ideia.sw.GetNow.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class mainController {
    
    @GetMapping("/hello")
    public String index() {
        return "Hello World!";
    }
}
