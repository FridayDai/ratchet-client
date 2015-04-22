import com.mashape.unirest.http.Unirest

class BootStrap {

    def init = { servletContext ->
        // Set default timezone to UTC so that times are recorded properly in DB
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
        Unirest.setDefaultHeader("X-App-Type", 'client')
    }
    def destroy = {
    }
}
