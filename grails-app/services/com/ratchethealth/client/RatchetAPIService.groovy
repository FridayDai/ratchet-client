package com.ratchethealth.client

import com.mashape.unirest.http.HttpMethod
import com.mashape.unirest.http.exceptions.UnirestException
import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiIpBlockException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON
import org.codehaus.groovy.grails.web.util.WebUtils

class RatchetAPIService {

    def messageSource

    def withGet(String url, Closure reqHandler) {
        GetRequest get = new GetRequest(HttpMethod.GET, url)

        withReq(get, null, reqHandler)
    }

    def withGet(String token, String url, Closure reqHandler) {
        GetRequest get = new GetRequest(HttpMethod.GET, url)

        withReq(get, token, reqHandler)
    }

    def withPost(String url, Closure reqHandler) {
        HttpRequestWithBody post = new HttpRequestWithBody(HttpMethod.POST, url)

        withReq(post, null, reqHandler)
    }

    def withPost(String token, String url, Closure reqHandler) {
        HttpRequestWithBody post = new HttpRequestWithBody(HttpMethod.POST, url)

        withReq(post, token, reqHandler)
    }

    def withDelete(String token, String url, Closure reqHandler) {
        HttpRequestWithBody delete = new HttpRequestWithBody(HttpMethod.DELETE, url)

        withReq(delete, token, reqHandler)
    }

    def handleError(resp) {
        if (!resp || !resp.status?.toString()?.isNumber()) {
            throw new ApiAccessException(messageSource.getMessage("api.errors.not.access", null, Locale.ENGLISH))
        }

        def body
        try {
            body = JSON.parse(resp?.body?.toString())
        } catch (e) {
            body = [:]
        }

        if (resp.status == 506) {
            throw new ApiIpBlockException()
        } else if (resp.status > 500) {
            String errorMessage = body?.errors?.message
            throw new ApiAccessException(errorMessage?:resp.body)
        } else if (resp.status >= 400 && resp.status <= 500) {
            String errorMessage = body?.error?.errorMessage
            throw new ApiReturnException(resp.status, errorMessage?:resp.body)
        }
    }

    def parseRespBody(resp) {
        def result

        try {
            result = JSON.parse(resp?.body)
        } catch (e) {
            log.error("JSON parse failed: " + e)
            throw new ApiReturnException(e.message, e);
        }

        result
    }

    def withReq(req, String token, Closure reqHandler) {
        try {
            def reqObj

            def request = WebUtils?.retrieveGrailsWebRequest()?.getCurrentRequest()

            if (request) {
                req.header("X-Forwarded-For", request.getRemoteAddr())
            }

            if (token) {
                reqObj = req.header("X-Auth-Token", token)
            } else {
                reqObj = req
            }

            reqHandler.call(reqObj)
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message, e)
        }
    }
}
