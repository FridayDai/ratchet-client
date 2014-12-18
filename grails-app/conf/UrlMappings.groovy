class UrlMappings {

	static mappings = {
//        "/"(controller: "authentication", action: "index")
//        "/login"(view:'/pages/login')
//        "/home"(controller: 'home', action: 'index')
//
//        "/$controller/$action?/$id?(.$format)?"{
//            constraints {
//                // apply constraints here
//            }
//        }
//
//        "/auth"(controller: "authentication") {
//            action = [POST: 'login']
//        }
//
//        "/logout"(controller: "authentication") {
//            action = [GET: 'logout']
//        }
//
//        "/"(controller: "index", action: "index")
//
////
////        "/health_check"(controller: "health")
//
////        "/"(view:"/pages/login")
//        "500"(view:'/pages/error')
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: "home", action: "index")

        "/login"(controller: "authentication", action: "login")
        "/logout"(controller: "authentication",action: 'logout')


        "500"(view:'/pages/error')
	}
}
