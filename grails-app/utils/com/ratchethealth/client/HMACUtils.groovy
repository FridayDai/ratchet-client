package com.ratchethealth.client

import groovy.util.logging.Log4j
import org.apache.http.client.utils.DateUtils
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.security.InvalidKeyException
import java.security.SecureRandom
import org.apache.http.client.utils.DateUtils

/**
 * Created by sky on 1/15/16.
 */
@Log4j
class HMACUtils {

    static hmac_sha256(String secretKey, String data) {
        try {
            Mac mac = Mac.getInstance('HmacSHA256')
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.bytes, 'HmacSHA256')
            mac.init(secretKeySpec)
            byte[] digest = mac.doFinal(data.bytes)
            return digest.encodeBase64().toString()
        } catch (InvalidKeyException e) {
            log.error 'Invalid key exception while converting to HMac SHA256.'
        }
    }

    static generateAuthenticationInfo(String clientSecret, String requestMethod, String requestURL) {

        def now = new Date()
        // Tue, 15 Oct 2015 10:06:31 GMT
        def dateString = DateUtils.formatDate(now)

        def nonceNumber = Math.abs(new SecureRandom().nextInt() % 10000000 + 1)

        def data = requestMethod + requestURL + dateString + nonceNumber
        def expectedHash = hmac_sha256(clientSecret, data)

        [nonce : nonceNumber,
         digetst : expectedHash,
         date : dateString]
    }

}

