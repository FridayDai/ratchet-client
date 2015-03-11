package com.xplusz.ratchet

class LoggingFilters {

    def filters = {
        all(controller:'*', action:'*') {
            before = {
                log.info("${request.requestURI} params: ${params}, session: ${session.token}, ip: ${request.getRemoteAddr()}")
            }
            after = { Map model ->
            }
            afterView = { Exception e ->

            }
        }
    }
}

