package com.ratchethealth.client

class SecureFilters {
    def grailsApplication

    def filters = {
        all(controller:'*', action:'*') {
            before = {

            }
            after = { Map model ->
                def cdnDomain = grailsApplication.config?.cdn_domain
                if (response?.contentType?.indexOf('text/html') == 0) {
                    response.setHeader('Cache-Control', 'private, max-age=0, no-cache, no-store')
                    response.setHeader('Pragma', 'no-store')
                    response.setHeader('X-Frame-Options', 'DENY')
                    response.setHeader('X-XSS-Protection', '1;mode=block')
                    response.setHeader('X-Content-Type-Options', 'nosniff')
                    response.setHeader('Content-Security-Policy',
                        "default-src 'self' 'unsafe-eval' 'unsafe-inline' " +
                                            "https://fonts.googleapis.com " +
                                            "https://fonts.gstatic.com " +
                                            "https://maxcdn.bootstrapcdn.com " +
                                            (cdnDomain ? cdnDomain + ' ' : '') +
                        "form-action 'self'; frame-ancestors 'none';"
                    )
                }
            }
            afterView = { Exception e ->

            }
        }
    }
}
