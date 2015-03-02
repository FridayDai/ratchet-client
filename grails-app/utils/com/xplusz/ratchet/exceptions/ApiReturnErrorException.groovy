package com.xplusz.ratchet.exceptions

class ApiReturnErrorException extends Exception {

    private Integer statusId;

    public ApiReturnErrorException() {
        super();
    }

    public ApiReturnErrorException(String message) {
        super(message);
    }

    public ApiReturnErrorException(String message, Integer status) {
        super(message);
        this.statusId = status;
    }
}
