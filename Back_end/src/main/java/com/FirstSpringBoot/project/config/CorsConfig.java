//package com.FirstSpringBoot.project.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import io.github.cdimascio.dotenv.Dotenv;
//
//@Configuration
//public class CorsConfig {
//
//    private final Dotenv dotenv = Dotenv.load();
//
//    @Value("${CORS_ALLOWED_ORIGIN:http://localhost:3000}")
//    private String externalOrigin;
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                String origin = dotenv.get("CORS_ALLOWED_ORIGIN", "http://localhost:3000");
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:3000", origin)
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }
//}
