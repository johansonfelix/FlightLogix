package com.FlightLogix.Repository.AuthenticationOperations;

import com.FlightLogix.Core.Helpers.Helpers;
import com.FlightLogix.Core.Security.TokenDetails;
import com.FlightLogix.Core.User.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.ZonedDateTime;
import java.util.Date;


@ApplicationScoped
public class TokenService {


    @Inject
    TokenParser tokenParser;
    //Potentially remove expiration or extend expiration time/
    public String issueToken(String email, Role role){
        String tokenIdentifier = generateTokenIdentifier();
        ZonedDateTime issuedDate = ZonedDateTime.now();
        ZonedDateTime expirationDate = issuedDate.plusSeconds(36000);

        TokenDetails tokenDetails = new TokenDetails.Builder()
                .withId(tokenIdentifier)
                .withEmail(email)
                .withRole(role)
                .withIssuedDate(issuedDate)
                .withExpirationDate(expirationDate)
                .withRefreshCount(0)
                .withRefreshLimit(1)
                .build();

        return stringifyToken(tokenDetails);

    }



    private static String stringifyToken(TokenDetails tokenDetails) {
        return Jwts.builder()
                .setId(tokenDetails.getId())
                .setIssuer("https://FlightLogix.com")
                .setAudience("https://FlightLogix.com")
                .setSubject(tokenDetails.getEmail())
                .setIssuedAt(Date.from(tokenDetails.getIssuedDate().toInstant()))
                .setExpiration(Date.from(tokenDetails.getExpirationDate().toInstant()))
                .claim("role", tokenDetails.getRole())
                .claim("refreshCount", tokenDetails.getRefreshCount())
                .claim("refreshLimit", tokenDetails.getRefreshLimit())
                .signWith(SignatureAlgorithm.HS256, "secret")
                .compact();
    }


    public String refreshToken(TokenDetails currentTokenDetails) {

        if (!currentTokenDetails.isEligibleForRefreshment()) {
            return null;
           /* throw new AuthenticationTokenRefreshmentException("This token cannot be refreshed");*/
        }

        ZonedDateTime issuedDate = ZonedDateTime.now();
        ZonedDateTime expirationDate = issuedDate.plusSeconds(36000);

        TokenDetails newTokenDetails = new TokenDetails.Builder()
                .withId(currentTokenDetails.getId()) // Reuse the same id
                .withEmail(currentTokenDetails.getEmail())
                .withRole(currentTokenDetails.getRole())
                .withIssuedDate(issuedDate)
                .withExpirationDate(expirationDate)
                .withRefreshCount(currentTokenDetails.getRefreshCount() + 1)
                .withRefreshLimit(1)
                .build();

        return stringifyToken(newTokenDetails);

    }



    public TokenDetails parseToken(String token){

        return tokenParser.parseToken(token);
    }


    //Change
    private String generateTokenIdentifier() {
        return Helpers.stringToHash(Helpers.randomAlphaNumricString(16));}

}
