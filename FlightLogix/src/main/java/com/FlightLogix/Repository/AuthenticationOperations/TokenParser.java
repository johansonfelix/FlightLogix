package com.FlightLogix.Repository.AuthenticationOperations;

import com.FlightLogix.Core.Security.TokenDetails;
import com.FlightLogix.Core.User.Role;
import com.FlightLogix.Repository.Exceptions.InvalidAuthenticationTokenException;
import io.jsonwebtoken.*;

import javax.enterprise.context.ApplicationScoped;
import javax.validation.constraints.NotNull;
import java.time.ZoneId;
import java.time.ZonedDateTime;


@ApplicationScoped
public class TokenParser {

    public TokenDetails parseToken(String token) {

        try {

            Claims claims = Jwts.parser()
                    .setSigningKey("secret")
                    .requireAudience("https://FlightLogix.com")
                    .setAllowedClockSkewSeconds(10)
                    .parseClaimsJws(token)
                    .getBody();

            return new TokenDetails.Builder()
                    .withId(extractTokenIdFromClaims(claims))
                    .withEmail(extractEmailFromClaims(claims))
                    .withRole(extractRoleFromClaims(claims))
                    .withIssuedDate(extractIssuedDateFromClaims(claims))
                    .withExpirationDate(extractExpirationDateFromClaims(claims))
                    .withRefreshCount(extractRefreshCountFromClaims(claims))
                    .withRefreshLimit(extractRefreshLimitFromClaims(claims))
                    .build();

        } catch (UnsupportedJwtException | MalformedJwtException | IllegalArgumentException | SignatureException e) {
            System.out.println("invalid token");
            throw new InvalidAuthenticationTokenException("Invalid token", e);
        } catch (ExpiredJwtException e) {
            System.out.println("expired token");
            throw new InvalidAuthenticationTokenException("Expired token", e);
        } catch (InvalidClaimException e) {
            System.out.println("invalid value for claim");
            throw new InvalidAuthenticationTokenException("Invalid value for claim \"" + e.getClaimName() + "\"", e);
        } catch (Exception e) {

/*
            throw new InvalidAuthenticationTokenException("Invalid token", e);
*/
        }
    return null;
    }


    /**
     * Extract the token identifier from the token claims.
     *
     * @param claims
     * @return Identifier of the JWT token
     */
    private String extractTokenIdFromClaims(@NotNull Claims claims) {
        return (String) claims.get(Claims.ID);
    }

    /**
     * Extract the username from the token claims.
     *
     * @param claims
     * @return Username from the JWT token
     */
    private String extractEmailFromClaims(@NotNull Claims claims) {
        return claims.getSubject();
    }

    /**
     * Extract the user authorities from the token claims.
     *
     * @param claims
     * @return User authorities from the JWT token
     */
    private Role extractRoleFromClaims(@NotNull Claims claims) {

       return Role.valueOf((String)claims.get("role"));

    }

    /**
     * Extract the issued date from the token claims.
     *
     * @param claims
     * @return Issued date of the JWT token
     */
    private ZonedDateTime extractIssuedDateFromClaims(@NotNull Claims claims) {

        return ZonedDateTime.ofInstant(claims.getIssuedAt().toInstant(), ZoneId.systemDefault());
    }

    /**
     * Extract the expiration date from the token claims.
     *
     * @param claims
     * @return Expiration date of the JWT token
     */
    private ZonedDateTime extractExpirationDateFromClaims(@NotNull Claims claims) {
        return ZonedDateTime.ofInstant(claims.getExpiration().toInstant(), ZoneId.systemDefault());
    }

    /**
     * Extract the refresh count from the token claims.
     *
     * @param claims
     * @return Refresh count from the JWT token
     */
    private int extractRefreshCountFromClaims(@NotNull Claims claims) {
        return (int) claims.get("refreshCount");
    }

    /**
     * Extract the refresh limit from the token claims.
     *
     * @param claims
     * @return Refresh limit from the JWT token
     */
    private int extractRefreshLimitFromClaims(@NotNull Claims claims) {


        return (int) claims.get("refreshLimit");
    }
}
