package com.FlightLogix.Repository.AuthenticationOperations;

import com.FlightLogix.Core.Helpers.Helpers;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Persistence.User.UserDAO;
import com.FlightLogix.Repository.Exceptions.AuthenticationException;
import com.FlightLogix.Repository.Utils.ResponseCode;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;


@ApplicationScoped
public class UsernamePasswordValidator {

    @Inject
    private UserDAO users;

    public User validateCredentials(String email, String password){

        User user = users.findUserByEmail(email);

        if(user==null){
           throw new AuthenticationException(ResponseCode.INVALID_CREDENTIALS.toString());
        }


        if(!Helpers.checkPassword(password, user.getHashedPassword())){
           throw new AuthenticationException(ResponseCode.INVALID_CREDENTIALS.toString());
        }

        return user;

    }



}
