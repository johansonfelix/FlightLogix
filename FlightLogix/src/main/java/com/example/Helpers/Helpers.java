package com.example.Helpers;

import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;

public class Helpers {
    public static String stringToHash(String string){
        String hashed = Hashing.sha256()
                .hashString(string, StandardCharsets.UTF_8)
                .toString();
        return hashed;
    }
}
