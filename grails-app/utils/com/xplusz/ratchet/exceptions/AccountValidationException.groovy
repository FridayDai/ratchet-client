package com.xplusz.ratchet.exceptions;

class AccountValidationException extends Exception {

    private Integer limitSeconds;

    public AccountValidationException() {
        super();
    }

    public AccountValidationException(String message) {
        super(message);
    }

    public AccountValidationException(String message, Integer time) {
        super(message);
        this.limitSeconds = time;
    }
}
