package com.FlightLogix.Service.filters;

import com.FlightLogix.Core.Security.AuthenticatedUser;
import com.FlightLogix.Core.Security.TokenDetails;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Repository.AuthenticationOperations.LoginManager;
import com.FlightLogix.Repository.AuthenticationOperations.TokenService;
import com.FlightLogix.Repository.Utils.ResponseCode;
import org.json.JSONObject;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.AccessDeniedException;
import java.util.stream.Collectors;

@InvalidateToken
@Provider
public class VerificationFilter implements ContainerRequestFilter {

    @Inject
    TokenService tokenService;

    @Inject
    LoginManager loginManager;

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {

        String authorizationHeader = containerRequestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String authenticationToken = authorizationHeader.substring(7);
            System.out.println("Token: "+authenticationToken);
            TokenDetails tokenDetails = tokenService.parseToken(authenticationToken);
            String tokenEmail = tokenDetails.getEmail();
            loginManager.invalidateToken(tokenEmail);

        }

    }


}
