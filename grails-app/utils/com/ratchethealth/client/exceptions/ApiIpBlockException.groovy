package com.ratchethealth.client.exceptions

class ApiIpBlockException extends RuntimeException {
    public ApiIpBlockException() {
        super();
    }

    public ApiIpBlockException(String message) {
        super(message);
    }

    public ApiIpBlockException(String message, Throwable cause) {
        super(message, cause);
    }
}
