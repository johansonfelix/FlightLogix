/*
package com.FlightLogix.Service.ExceptionMapper;

import com.FlightLogix.Core.Exception.ApiErrorDetails;
import com.FlightLogix.Repository.Exceptions.AuthenticationException;
import com.FlightLogix.Repository.Exceptions.RegistrationException;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.ExceptionMapper;

public class RegistrationExceptionMapper implements ExceptionMapper<RegistrationException> {


    @Context
    private UriInfo uriInfo;

    @Override
    public Response toResponse(RegistrationException exception) {

        Response.Status status = Response.Status.FORBIDDEN;

        return getResponse(status, exception.getMessage(), uriInfo, exception);
    }

    static Response getResponse(Response.Status status, String message, UriInfo uriInfo, RegistrationException exception) {
        ApiErrorDetails errorDetails = new ApiErrorDetails();
        errorDetails.setStatus(status.getStatusCode());
        errorDetails.setTitle(status.getReasonPhrase());
        errorDetails.setMessage(message);
        errorDetails.setPath(uriInfo.getAbsolutePath().getPath());

        return Response.status(status).entity(errorDetails).type(MediaType.APPLICATION_JSON).build();
    }
}
*/
