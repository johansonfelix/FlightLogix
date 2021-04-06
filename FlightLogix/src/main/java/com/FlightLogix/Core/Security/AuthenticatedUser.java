package com.FlightLogix.Core.Security;

import com.FlightLogix.Core.User.Role;

import javax.security.auth.Subject;
import java.security.Principal;

public final class AuthenticatedUser  implements Principal {

    private final String email;
    private final Role role;

    public AuthenticatedUser(String email, Role role) {
        this.email = email;
        this.role = role;
    }

    @Override
    public String getName() {
        return email;
    }

    public Role getRole(){
        return role;
    }

    @Override
    public boolean implies(Subject subject) {
        return false;
    }
}
