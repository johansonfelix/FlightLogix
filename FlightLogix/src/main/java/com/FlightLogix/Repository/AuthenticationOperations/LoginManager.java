package com.FlightLogix.Repository.AuthenticationOperations;

import com.FlightLogix.Core.User.User;
import com.FlightLogix.Repository.Exceptions.AuthenticationException;
import com.FlightLogix.Repository.Utils.ResponseCode;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class LoginManager {

    @Inject
    UsernamePasswordValidator usernamePasswordValidator;
    @Inject
    TokenService tokenService;


    public String logIn(String email, String password){

        User user = usernamePasswordValidator.validateCredentials(email, password);
        if(user == null){
            throw new AuthenticationException(ResponseCode.INVALID_CREDENTIALS.toString());
        }

        return tokenService.issueToken(user.getEmail(), user.getRole());
    }

   /* public String logOut(String authToken){
        if(emails.containsKey(authToken)){
            String email = emails.get(authToken);
            emails.remove(authToken);
            tokens.remove(email);
            System.out.print("Logged out");
        }
        return ResponseCode.SUCCESS.toString();
    }*/
}
