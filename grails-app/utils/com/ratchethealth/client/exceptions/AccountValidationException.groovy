package com.ratchethealth.client.exceptions;

class AccountValidationException extends Exception {

    private String limitSeconds;

    public AccountValidationException() {
        super();
    }

    public AccountValidationException(String message) {
        super(message);
    }

    public AccountValidationException(String message, String time) {
        super(message);
        this.limitSeconds = time;
    }
}
