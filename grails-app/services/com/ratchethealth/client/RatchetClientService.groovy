package com.ratchethealth.client

import com.mashape.unirest.http.HttpMethod
import com.mashape.unirest.http.exceptions.UnirestException
import com.mashape.unirest.request.GetRequest
import com.mashape.unirest.request.HttpRequestWithBody
import com.ratchethealth.client.exceptions.ApiAccessException
import com.ratchethealth.client.exceptions.ApiReturnException
import grails.converters.JSON

class RatchetClientService {

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

    def withReq(req, String token, Closure reqHandler)
            throws ApiAccessException, ApiReturnException
    {
        try {
            def reqObj

            if (token)
                reqObj = req.header("X-Auth-Token", token)
            else
                reqObj = req

            def (resp, result) = reqHandler.call(reqObj)

            if (result != null) {
                return result
            } else if (resp.status == 500 || resp.status == 502 || resp.status == 503) {
                String errorMessage = JSON.parse(resp.body)?.errors?.message
                throw new ApiAccessException(errorMessage?:resp.body)
            } else {
                String errorMessage = JSON.parse(resp.body)?.error?.errorMessage
                throw new ApiReturnException(errorMessage?:resp.body)
            }
        } catch (UnirestException e) {
            throw new ApiAccessException(e.message, e)
        }
    }
}
