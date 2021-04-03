package com.FlightLogix.Helpers;

import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

public class Helpers {
    public static String stringToHash(String string){
        String hashed = Hashing.sha256()
                .hashString(string, StandardCharsets.UTF_8)
                .toString();
        return hashed;
    }

    public static String randomNumber(){
        SecureRandom random = new SecureRandom();

        int number = random.nextInt(999999);

        return String.format("%06d", number);

    }
}
