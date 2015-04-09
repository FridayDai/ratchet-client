package com.ratchethealth.client

import grails.converters.JSON

class GroupsController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def groupService

    def index() {
        def groupList = groupService.getGroups(params)
        render view:'groups', model: [groupList: groupList, pagesize: params.length]
    }

    def getStaffGroups() {
        def resp = groupService.getStaffGroups(request, response)
        render resp as JSON
    }

    def addGroup() {

    }

    def updateGroup() {

    }

    def deleteGroup() {

    }
}
