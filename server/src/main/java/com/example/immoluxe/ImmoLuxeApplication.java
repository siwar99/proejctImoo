package com.example.immoluxe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;



//@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@SpringBootApplication
public class ImmoLuxeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImmoLuxeApplication.class, args);

    }
}
