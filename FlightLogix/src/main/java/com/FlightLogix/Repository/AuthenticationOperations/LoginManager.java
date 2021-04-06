package com.FlightLogix.Repository.AuthenticationOperations;

import com.FlightLogix.Core.Security.TokenDetails;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Repository.Exceptions.AuthenticationException;
import com.FlightLogix.Repository.Utils.ResponseCode;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class LoginManager {

    private static ConcurrentHashMap<String, String> tokenRepository = new ConcurrentHashMap<>();

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
        tokenRepository.put(tokenDetails.getEmail(),tokenDetails.getId());
        System.out.println("Size of repo:"+tokenRepository.size());
        return tokenService.issueToken(user.getEmail(), user.getRole());
    }

   public void logOut(String email){
       // To print the keys and values
       tokenRepository.forEach((K,V)->{                 // mapofmaps entries

               System.out.println(K+" "+V);       // print key and value of inner Hashmap
           });


       System.out.println(tokenRepository.containsKey(email));
        if(tokenRepository.containsKey(email)){
            tokenRepository.remove(email);
            System.out.print("Logged out");
        }
        else {

            throw new AuthenticationException("User has already logged out");
        }
    }


}
