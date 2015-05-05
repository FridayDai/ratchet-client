import com.mashape.unirest.http.Unirest

class BootStrap {

    def grailsApplication

    def init = { servletContext ->
        // Set default timezone to UTC so that times are recorded properly in DB
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
        Unirest.setDefaultHeader("X-App-Type", 'client')
        Unirest.setDefaultHeader("X-Anonymous-Token", grailsApplication.config.ratchet.api.anonymous.token)
    }
    def destroy = {
    }
}
