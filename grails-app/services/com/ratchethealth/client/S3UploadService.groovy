package com.ratchethealth.client

import com.amazonaws.HttpMethod
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest
import org.joda.time.DateTimeConstants

class S3UploadService {

    final static PDF_LINK_EXPIRE_TIME = 5 * DateTimeConstants.MILLIS_PER_MINUTE

    def amazonWebService

    def grailsApplication

    def getPDFFileLink(key) {
        def bucketName = grailsApplication.config.ratchet.s3.pdf.generator.bucket.name
        getTemporaryS3FileLink(key, bucketName, PDF_LINK_EXPIRE_TIME)
    }

    def getTemporaryS3FileLink(key, bucketName, duration) {
        def expiration = new Date()
        long milliSeconds = expiration.time
        milliSeconds += duration
        expiration.setTime(milliSeconds)

        def generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucketName, key)
        generatePresignedUrlRequest.setMethod(HttpMethod.GET)
        generatePresignedUrlRequest.setExpiration(expiration)

        AmazonS3 s3client = amazonWebService.s3
        s3client.generatePresignedUrl(generatePresignedUrlRequest)
    }
}
