package com.tracker.BugTracker.config;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.tracker.BugTracker.service.AuthService;

@EnableWebSecurity
@Configuration 
public class SecurityConfig {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private JWTFilter jwtFilter;

	@Bean
	public BCryptPasswordEncoder pwdEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public DaoAuthenticationProvider authProvider() {
		DaoAuthenticationProvider authProvider= new DaoAuthenticationProvider();
		authProvider.setPasswordEncoder(pwdEncoder());
		authProvider.setUserDetailsService(authService);
		return authProvider;	
	}
	
	@Bean
	public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception{
		return config.getAuthenticationManager();
	}
	
	@Bean
	public SecurityFilterChain security(HttpSecurity http) throws Exception{ 
		http.authorizeHttpRequests((req) ->{ req
			.requestMatchers("/bugtrackerapi/register","/bugtrackerapi/login","/bugtracker/**").permitAll()
			.requestMatchers("/bugtrackerapi/admin/**").hasAuthority("ADMIN")
			.requestMatchers("/bugtrackerapi/manager/**").hasAuthority("MANAGER")
			.requestMatchers("/bugtrackerapi/developer/**").hasAuthority("DEVELOPER")
			.requestMatchers("/bugtrackerapi/tester/**").hasAuthority("TESTER")
			.anyRequest()
			.authenticated();
		})
//		.formLogin(Customizer -> Customizer.loginPage("/login.html").successHandler((request, response, authentication) -> {
//			Set<String> roles= AuthorityUtils.authorityListToSet(authentication.getAuthorities());
//			if(roles.contains("ADMIN")) {
//				response.sendRedirect("/admin/adminDashboard.html");
//			} else if(roles.contains("MANAGER")) {
//				response.sendRedirect("/manager/managerDashboard.html");
//			} else if(roles.contains("DEVELOPER")) {
//				response.sendRedirect("/developer/developerDashboard.html");
//			} else {
//				response.sendRedirect("/tester/testerDashboard.html");
//			}
//		}))
		.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class)
		.headers(Customizer -> Customizer.frameOptions(frameCustomizer -> frameCustomizer.disable()))
		.csrf(Customizer -> Customizer.disable());
		return http.build();
	}
	
}
