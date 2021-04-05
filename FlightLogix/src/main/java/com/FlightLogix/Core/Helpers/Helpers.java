package com.FlightLogix.Core.Helpers;

import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Random;

public class Helpers {
    public static String stringToHash(String string){
        String hashed = Hashing.sha256()
                .hashString(string, StandardCharsets.UTF_8)
                .toString();
        return hashed;
    }

    public static String randomNumber(){
        SecureRandom random = new SecureRandom();

        int number = random.nextInt(9999999);

        return String.format("%06d", number);

    }

    public static String randomAlphaNumricString(int len){
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }

    public static boolean checkPassword(String plainTextPassword, String hashedPassword){

        return (hashedPassword.equals(stringToHash(plainTextPassword)));
    }
}
