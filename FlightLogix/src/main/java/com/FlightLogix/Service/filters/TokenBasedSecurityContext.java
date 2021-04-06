package com.FlightLogix.Service.filters;

import com.FlightLogix.Core.Security.AuthenticatedUser;
import com.FlightLogix.Core.Security.TokenDetails;
import com.FlightLogix.Core.User.Role;

import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

public class TokenBasedSecurityContext implements SecurityContext {

    private final AuthenticatedUser authenticatedUser;
    private final TokenDetails tokenDetails;
    private final boolean secure;

    public TokenBasedSecurityContext(AuthenticatedUser authenticatedUser, TokenDetails tokenDetails, boolean secure) {
        this.authenticatedUser = authenticatedUser;
        this.tokenDetails = tokenDetails;
        this.secure = secure;
    }

    @Override
    public Principal getUserPrincipal() {
        return authenticatedUser;
    }

    @Override
    public boolean isUserInRole(String s) {


        return authenticatedUser.getRole().equals(Role.valueOf(s));
    }

    @Override
    public boolean isSecure() {
        return secure;
    }

    @Override
    public String getAuthenticationScheme() {
        return "Bearer";
    }

    public TokenDetails getAuthenticationTokenDetails() {
        return tokenDetails;
    }
}