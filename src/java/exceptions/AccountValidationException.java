package exceptions;

class AccountValidationException extends Exception {

    public AccountValidationException() {
        super();
    }

    public AccountValidationException(String message) {
        super(message);
    }
}