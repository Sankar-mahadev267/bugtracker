package com.tracker.BugTracker.service;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
	
	private String secretKey;
	
	public JWTService() throws NoSuchAlgorithmException {
		KeyGenerator keyGen= KeyGenerator.getInstance("HmacSHA256");
		SecretKey sk= keyGen.generateKey();
		secretKey= Base64.getEncoder().encodeToString(sk.getEncoded());
	}
	
	public String generateToken(String username) {
		Map<String, Object> claims= new HashMap<>();
		return Jwts.builder()
				.claims()
				.add(claims)
				.subject(username)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis()+ 23 * 60 * 60 * 1000))
				.and()
				.signWith(getKey())
				.compact();
	}
	
	public SecretKey getKey() {
		byte[] bytes= Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(bytes);
	}
	
	public boolean validateToken(String token) {
		return !isTokenExpired(token);
	}

	private boolean isTokenExpired(String token) {
		return extractClaim(token,Claims::getExpiration).before(new Date());
	}

	private <T>T extractClaim(String token, Function<Claims, T> claimResolver) {
		Claims allclaims = exctractAllClaims(token);
		return claimResolver.apply(allclaims);
	}

	private Claims exctractAllClaims(String token) {
		return Jwts.parser()
				.verifyWith(getKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
}
