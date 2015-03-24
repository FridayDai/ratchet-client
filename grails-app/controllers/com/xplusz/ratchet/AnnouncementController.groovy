package com.xplusz.ratchet

class AnnouncementController {

	def close() {
		session.announcementLastUpdated = params.announcementLastUpdated

		render status: 200
	}
}
