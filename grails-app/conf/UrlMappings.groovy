class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: "home", action: "index")
        "/login"(controller: "authentication", action: "login")
        "/logout"(controller: "authentication", action: 'logout')
        "/providers"(controller: "providers", action: "index")
        "/getProvider"(controller: "home", action: "getProvider")
        "/tools"(controller: "tools", action: "index")
        "/practice"(controller: "practice", action: "index")
        "/treatments"(controller: "treatments", action: "index")
        "/library"(controller: "library", action: "index")
        "/accounts"(controller: "accounts", action: "index")
        "500"(view: '/pages/error')

        "/providers/detail"(controller: "providers",action: "detail")
    }
}
