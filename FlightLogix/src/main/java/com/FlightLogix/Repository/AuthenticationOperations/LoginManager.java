package com.FlightLogix.Repository.AuthenticationOperations;

import com.FlightLogix.Core.Security.TokenDetails;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Repository.Exceptions.AccessDeniedException;
import com.FlightLogix.Repository.Exceptions.AuthenticationException;
import com.FlightLogix.Repository.Exceptions.RegistrationException;
import com.FlightLogix.Repository.Utils.ResponseCode;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class LoginManager {

    private final ConcurrentHashMap<String, TokenDetails> tokenRepository = new ConcurrentHashMap<>();

    @Inject
    private UsernamePasswordValidator usernamePasswordValidator;
    @Inject
    private TokenService tokenService;


    public String logIn(String email, String password){

        User user = usernamePasswordValidator.validateCredentials(email, password);
        if(user == null){
            throw new AuthenticationException(ResponseCode.INVALID_CREDENTIALS.toString());
        }
        String token = tokenService.issueToken(user.getEmail(), user.getRole());
        TokenDetails tokenDetails = tokenService.parseToken(token);
        tokenRepository.put(tokenDetails.getEmail(),tokenDetails);

        return tokenService.issueToken(user.getEmail(), user.getRole());
    }


    public void invalidateToken(String email){


        if(tokenRepository.containsKey(email)){
            tokenRepository.remove(email);
            System.out.println("Removing token from repo");
        }
        else{
            throw new AccessDeniedException(ResponseCode.INVALID_AUTH_TOKEN.toString());
        }
    }

    public void validateToken(String email){
        if(tokenRepository.containsKey(email)){
            return;
        }

        else{
            throw new RegistrationException(ResponseCode.INVALID_AUTH_TOKEN.toString());
        }
    }

}
