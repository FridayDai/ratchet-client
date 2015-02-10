package com.xplusz.ratchet.exceptions

class ApiReturnErrorException extends Exception {

    public ApiReturnErrorException() {
        super();
    }

    public ApiReturnErrorException(String message) {
        super(message);
    }
}
