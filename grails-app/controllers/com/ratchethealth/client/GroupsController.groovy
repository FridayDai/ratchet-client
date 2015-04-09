package com.ratchethealth.client

class GroupsController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def groupService

    def index() {
        def groupList = groupService.getGroups(params)
        render view:'groups', model: [groupList: groupList, pagesize: params.length]
    }

    def getGroups() {
        def resp = groupService.getGroups(request, response)
    }

    def addGroup() {

    }

    def updateGroup() {

    }

    def deleteGroup() {

    }
}
