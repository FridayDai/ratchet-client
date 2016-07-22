package com.ratchethealth.client

import com.amazonaws.AmazonClientException
import com.amazonaws.AmazonServiceException
import com.amazonaws.HttpMethod
import com.amazonaws.event.ProgressEvent
import com.amazonaws.event.ProgressEventType
import com.amazonaws.event.ProgressListener
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest
import com.amazonaws.services.s3.transfer.Upload
import org.joda.time.DateTimeConstants

class S3UploadService {

    final static PDF_LINK_EXPIRE_TIME = 5 * DateTimeConstants.MILLIS_PER_MINUTE

    def amazonWebService

    def grailsApplication

    def uploadPdfs(files, fileNames) {
        files.eachWithIndex { file, index ->
            def omd = new ObjectMetadata()

            omd.setContentType('application/pdf')
            omd.setSSEAlgorithm(ObjectMetadata.AES_256_SERVER_SIDE_ENCRYPTION)
            omd.setContentLength(file.inputStream.bytes.length)
            def fileName = fileNames[index]
            def bucketName = grailsApplication.config.ratchet.s3.scanned_pdf_bucket
            def putObjectRequest = new PutObjectRequest(bucketName, fileName, file.inputStream, omd)

            uploadFileToS3ByTransferManager(putObjectRequest, fileName, bucketName, [])
        }
    }

    def getPDFFileLink(key) {
        def bucketName = grailsApplication.config.ratchet.s3.pdf.generator.bucket.name
        getTemporaryS3FileLink(key, bucketName, PDF_LINK_EXPIRE_TIME)
    }

    def uploadFileToS3ByTransferManager(putObjectRequest, fileName, bucketName, temporaryFiles) {
        try {
            log.info "File upload starting: ${fileName} to ${bucketName}"
            Upload upload = amazonWebService.transferManager.upload(putObjectRequest)
            upload.addProgressListener(new ProgressListener() {
                @Override
                void progressChanged(ProgressEvent progressEvent) {
                    def eventType = progressEvent.eventType
                    switch (eventType) {
                        case ProgressEventType.TRANSFER_COMPLETED_EVENT:
                            log.info "File upload completed: ${fileName}."
                            temporaryFiles?.each {
                                it.delete()
                            }
                            break
                        case ProgressEventType.TRANSFER_FAILED_EVENT:
                            def exc = upload.waitForException()
                            log.error "File upload failed: ${fileName} for reason: ${exc.message}."
                            break
                        default:
                            log.debug "File upload event for ${fileName}\n" +
                                    "Event is ${eventType}\n" +
                                    "Progress: ${upload.progress.percentTransferred}%"
                            break
                    }
                }
            })
        } catch (AmazonServiceException e) {
            log.error("File upload service error: ${e.message}")
        } catch (AmazonClientException e) {
            log.error("File upload client error: ${e.message}")
        }
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

    def exists(key, bucketName) {
        try {
            AmazonS3 s3client = amazonWebService.s3
            s3client.getObjectMetadata(bucketName, key)
        } catch(AmazonServiceException e) {
            return false
        }
        true
    }
}
