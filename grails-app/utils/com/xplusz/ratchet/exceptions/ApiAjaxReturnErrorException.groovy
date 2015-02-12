package com.xplusz.ratchet.exceptions

class ApiAjaxReturnErrorException extends Exception {

    private Integer statusId;

    public ApiAjaxReturnErrorException() {
        super();
    }

    public ApiAjaxReturnErrorException(String message) {
        super(message);
    }

    public ApiAjaxReturnErrorException (String message, Integer status) {
        super(message);
        this.statusId = status;
    }
}
