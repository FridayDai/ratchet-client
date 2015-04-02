package com.ratchethealth.client

class AnnouncementController {

	def close() {
		session.announcementLastUpdated = params.announcementLastUpdated

		render status: 200
	}
}
