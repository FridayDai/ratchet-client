class BootStrap {

    def init = { servletContext ->
        // Set default timezone to UTC so that times are recorded properly in DB
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
    }
    def destroy = {
    }
}
