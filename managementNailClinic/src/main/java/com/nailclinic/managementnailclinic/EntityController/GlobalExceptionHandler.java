package com.nailclinic.managementnailclinic.EntityController;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//Exception Lists:
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.AccountStatusException;



import org.springframework.http.ProblemDetail; // Tools to use, to return useful informations back to the user


@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleSecurityException(Exception exception){
        ProblemDetail errorDetail = null;

        exception.printStackTrace();

        if(exception instanceof BadCredentialsException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), exception.getMessage());
            errorDetail.setProperty("message", "The username or password is incorrect");
            return errorDetail;
        }

        if(exception instanceof AccountStatusException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("message", "The account is locked");
        }

        if(exception instanceof AccessDeniedException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("message", "You are not authorized to access this resource");
        }

        if(exception instanceof SignatureException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("message", "The JWT signature is invalid");
        }
        if(exception instanceof ExpiredJwtException){
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("message", "The JWT has expired");
        }

        return errorDetail;
    }



}
