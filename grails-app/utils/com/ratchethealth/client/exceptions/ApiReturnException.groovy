package com.ratchethealth.client.exceptions

class ApiReturnException extends Exception {

    private Integer statusId;
    private String errorFileName;

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

    public ApiReturnException(Integer status, String message, String errorFileName) {
        super(message);
        this.statusId = status;
        this.errorFileName = errorFileName
    }
}
