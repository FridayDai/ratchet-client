package com.ratchethealth.client.exceptions;

class AccountValidationException extends Exception {

    int limitSeconds;

    public AccountValidationException() {
        super();
    }

    public AccountValidationException(String message) {
        super(message);
    }

    public AccountValidationException(String message, int time) {
        super(message);
        this.limitSeconds = time;
    }
}
