package com.FlightLogix.Service.filters;

import com.FlightLogix.Core.Security.AuthenticatedUser;
import com.FlightLogix.Core.Security.TokenDetails;
import com.FlightLogix.Core.User.User;
import com.FlightLogix.Persistence.User.UserDAO;
import com.FlightLogix.Repository.AuthenticationOperations.LoginManager;
import com.FlightLogix.Repository.AuthenticationOperations.TokenService;

import javax.annotation.Priority;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;


@Provider
@Dependent
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Inject
    private UserDAO userDAO;

    @Inject
    private TokenService tokenService;

    @Inject
    private LoginManager loginManager;


    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {

        String authorizationHeader = containerRequestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        System.out.println(authorizationHeader);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String authenticationToken = authorizationHeader.substring(7);
            handleTokenBasedAuthentication(authenticationToken, containerRequestContext);
            System.out.println("here");
            return;
        }

    }


    private void handleTokenBasedAuthentication(String authenticationToken, ContainerRequestContext containerRequestContext){
        TokenDetails tokenDetails = tokenService.parseToken(authenticationToken);
        User user = userDAO.findUserByEmail(tokenDetails.getEmail());
        AuthenticatedUser authenticatedUser = new AuthenticatedUser(user.getEmail(), user.getRole());

        boolean isSecure = containerRequestContext.getSecurityContext().isSecure();
        SecurityContext securityContext = new TokenBasedSecurityContext(authenticatedUser, tokenDetails, isSecure);
        containerRequestContext.setSecurityContext(securityContext);
    }
}
