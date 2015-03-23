package com.xplusz.ratchet

import com.mashape.unirest.http.Unirest
import grails.converters.JSON
import grails.plugin.cache.Cacheable

class AnnouncementService {

	def grailsApplication

	@Cacheable('announcement')
	def checkAnnouncement() {
		String announcementsUrl = grailsApplication.config.ratchetv2.server.url.announcements

		def resp = Unirest.get(announcementsUrl)
				.queryString("latest", true)
				.asString()

		def result = JSON.parse(resp.body)

		if (resp.status == 200) {
			log.info("Get announcement success")
			return result?.items[0];
		}
	}
}
