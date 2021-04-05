package com.FlightLogix.Repository;

import com.FlightLogix.Core.Helpers.Helpers;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Persistence.User.UserDAO;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Random;

public class LoginManager {
    @Inject
        UserDAO userDAO;
    public enum ResponseCode{
        SUCCESS,
        INVALID_CREDENTIALS /*we don't specify if it was the email or the password that was wrong*/,
        INVALID_AUTH_TOKEN /* for logout*/
    }
    private static LoginManager loginManager = new LoginManager();
    private HashMap<String, String> tokens = new HashMap<>();
    private HashMap<String, String> emails = new HashMap<>();
    private LoginManager(){

    }
    public static LoginManager getInstance(){
        return loginManager;
    }
    private String generateToken(String email, String password){

        User user = userDAO.findUserByEmail(email);
        if(user == null){
            return ResponseCode.INVALID_CREDENTIALS.toString();
        }
        Random rand = new Random();
        int salt = rand.nextInt();
        String authToken = Helpers.stringToHash(email + password + salt);
        tokens.put(email,authToken);
        emails.put(authToken, email);
        return ResponseCode.SUCCESS.toString();

    }
    public String logIn(String email, String password){
        return generateToken(email,password);
    }
    public String logOut(String authToken){
        if(emails.containsKey(authToken)){
            String email = emails.get(authToken);
            emails.remove(authToken);
            tokens.remove(email);
            System.out.print("Logged out");
        }
        return ResponseCode.SUCCESS.toString();
    }
}
