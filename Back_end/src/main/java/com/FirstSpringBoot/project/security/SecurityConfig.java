package com.FirstSpringBoot.project.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;
import io.github.cdimascio.dotenv.Dotenv;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final Dotenv dotenv = Dotenv.load();

    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for stateless REST APIs
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS
            .authorizeHttpRequests(authorize -> authorize
                // Allow public access to authentication endpoints
                .requestMatchers("/").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                // Require ADMIN role for admin-specific endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                // Require USER_STANDARD or ADMIN role for user-specific endpoints
                .requestMatchers("/api/users/**").permitAll()
				.requestMatchers("/api/commandes/**").permitAll()
				.requestMatchers("/api/fournisseurs/**").permitAll()
				.requestMatchers("/api/utilisateurs/**").permitAll()
				.requestMatchers("/api/lignes-commande/**").permitAll()
				.requestMatchers("/api/livraisons/**").permitAll()
				.requestMatchers("/api/factures/**").permitAll()
                // All other requests must be authenticated
                .anyRequest().authenticated()
            )
            .userDetailsService(customUserDetailsService) // Use our custom UserDetailsService
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Use stateless sessions for APIs

        return http.build();
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
		String originFromEnv = dotenv.get("CORS_ALLOWED_ORIGIN", "http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:3000"); // Allow all origins (for development)
        configuration.addAllowedOrigin(originFromEnv); // Allow all origins (for development)
        configuration.addAllowedMethod("*"); // Allow all HTTP methods
        configuration.addAllowedHeader("*"); // Allow all headers
        configuration.setAllowCredentials(true); // Set to true if using cookies/session with frontend

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
//	@Bean
//	public UrlBasedCorsConfigurationSource corsConfigurationSource() {
//		String originFromEnv = dotenv.get("CORS_ALLOWED_ORIGIN", "http://localhost:3000");
//
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowedOrigins(List.of("http://localhost:3000", originFromEnv)); 
//		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//		config.setAllowedHeaders(List.of("*"));
//		config.setAllowCredentials(true); 
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", config);
//		return source;
//	}

}
