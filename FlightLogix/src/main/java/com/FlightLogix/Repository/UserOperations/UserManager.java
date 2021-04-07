package com.FlightLogix.Repository.UserOperations;

import com.FlightLogix.Core.User.User;
import com.FlightLogix.Core.User.UserRegistration;
import com.FlightLogix.Persistence.User.UserDAO;
import com.FlightLogix.Repository.Exceptions.RegistrationException;
import com.FlightLogix.Repository.Utils.ResponseCode;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.validation.constraints.NotNull;

import java.util.List;

/**
 * A singleton class that handles user operations
 */

@ApplicationScoped
public class UserManager {

    @Inject
    UserDAO userDAO;


    public void register(@NotNull UserRegistration user){
        User foundUser = userDAO.findUserByEmail(user.getEmail());

        if(foundUser != null){
            throw new RegistrationException(ResponseCode.EMAIL_ALREADY_EXISTS.toString());
        }
        userDAO.createUser(user);

    }

    public List<User> findAllCustomers(){
        return userDAO.findAllCustomers();
    }


}
