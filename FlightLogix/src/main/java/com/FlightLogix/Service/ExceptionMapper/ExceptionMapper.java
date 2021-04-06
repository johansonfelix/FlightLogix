package com.FlightLogix.Service.ExceptionMapper;

import com.FlightLogix.Core.Exception.ApiErrorDetails;


import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.Provider;

@Provider
public class ExceptionMapper implements javax.ws.rs.ext.ExceptionMapper<RuntimeException>{


    @Context
    private UriInfo uriInfo;

    @Override
    public Response toResponse(RuntimeException e) {

        Response.Status status = Response.Status.FORBIDDEN;

        return getResponse(status, e.getMessage(), uriInfo, e);
    }

    static Response getResponse(Response.Status status, String message, UriInfo uriInfo, RuntimeException exception) {
        ApiErrorDetails errorDetails = new ApiErrorDetails();
        errorDetails.setStatus(status.getStatusCode());
        errorDetails.setTitle(status.getReasonPhrase());
        errorDetails.setMessage(message);
        errorDetails.setPath(uriInfo.getAbsolutePath().getPath());

        return Response.status(status).entity(errorDetails).type(MediaType.APPLICATION_JSON).build();
    }
}
