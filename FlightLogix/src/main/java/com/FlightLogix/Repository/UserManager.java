package com.FlightLogix.Repository;

import com.FlightLogix.Core.User.User;
import com.FlightLogix.Persistence.User.UserDAO;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

/**
 * A singleton class that handles user operations
 */
public class UserManager {
    @Inject
    UserDAO userDAO;
    private static UserManager userManager = new UserManager();
    public enum ResponseCode{
        SUCCESS,
        EMAIL_ALREADY_EXISTS
    }
    private UserManager(){

    }
    public static UserManager getInstance(){
        return userManager;
    }
    public String register(User user){
        User foundUser = userDAO.findUserByEmail(user.getEmail());
        if(foundUser != null){
            return ResponseCode.EMAIL_ALREADY_EXISTS.toString();
        }
        userDAO.createUser(user);
        return ResponseCode.SUCCESS.toString();
    }
    public List<User> findAllCustomers(){
        return userDAO.findAllCustomers();
    }


}
