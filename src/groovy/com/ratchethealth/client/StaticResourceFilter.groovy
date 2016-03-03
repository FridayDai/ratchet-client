package com.ratchethealth.client
import javax.servlet.*

class StaticResourceFilter implements Filter {

    void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
        response.setHeader('X-Content-Type-Options', 'nosniff')
        chain.doFilter(request, response)
    }

    void init(FilterConfig config) { }
    void destroy() { }
}
