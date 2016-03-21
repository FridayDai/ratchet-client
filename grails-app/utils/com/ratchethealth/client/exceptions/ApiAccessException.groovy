package com.ratchethealth.client.exceptions

class ApiAccessException extends RuntimeException {

    public ApiAccessException() {
        super();
    }

    public ApiAccessException(String message) {
        super(message);
    }

    public ApiAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}
