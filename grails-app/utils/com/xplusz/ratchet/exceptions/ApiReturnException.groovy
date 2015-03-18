package com.xplusz.ratchet.exceptions

class ApiReturnException extends Exception {

    private Integer statusId;

    public ApiReturnException() {
        super();
    }

    public ApiReturnException(String message) {
        super(message);
    }

    public ApiReturnException(Integer status) {
        super();
        this.statusId = status
    }

    public ApiReturnException(Integer status, String message) {
        super(message);
        this.statusId = status;
    }
}
