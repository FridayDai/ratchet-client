package com.ratchethealth.client

class SecureFilters {
    def grailsApplication

    def filters = {
        all(controller:'*', action:'*') {
            before = {

            }
            after = { Map model ->
                def config = grailsApplication.config
                def cdnDomain = config?.cdn_domain
                def notSupportHTTPS = System.getProperty("NOT_SUPPORT_HTTPS")?.toBoolean()
                def RUMEnabled = System.getProperty("RUM_ENABLE")?.toBoolean()

                if (response?.contentType?.indexOf('text/html') == 0) {
                    response.setHeader('Cache-Control', 'no-store')
                    response.setHeader('X-Frame-Options', 'DENY')
                    response.setHeader('X-XSS-Protection', '1;mode=block')
                    response.setHeader('X-Content-Type-Options', 'nosniff')
                    response.setHeader('Content-Security-Policy',
                        "default-src 'self' 'unsafe-eval' 'unsafe-inline' " +
                                            "https://fonts.googleapis.com " +
                                            "https://fonts.gstatic.com " +
                                            "https://www.google-analytics.com " +
                                            "https://maxcdn.bootstrapcdn.com " +
                                            (cdnDomain ? cdnDomain + ' ' : '') +
                                            (RUMEnabled ? 'https://rum-static.pingdom.net https://rum-collector.pingdom.net ' : '') +
                        "form-action 'self'; frame-ancestors 'none';"
                    )

                    if (!notSupportHTTPS) {
                        response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
                    }
                }
            }
            afterView = { Exception e ->

            }
        }
    }
}
