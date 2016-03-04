package com.ratchethealth.client

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import javax.servlet.*

class StaticResourceFilter implements Filter {
    protected final Logger log = LoggerFactory.getLogger(getClass())

    void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
        response.setHeader('X-Content-Type-Options', 'nosniff')
        chain.doFilter(request, response)
    }

    void init(FilterConfig config) {
        log.info("StaticResourceFilter init")
    }

    void destroy() {
        log.info("StaticResourceFilter destroy")
    }
}
