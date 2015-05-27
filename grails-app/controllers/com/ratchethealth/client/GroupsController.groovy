package com.ratchethealth.client

import grails.converters.JSON

class GroupsController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def groupService

    static allowedMethods = [getGroups: ['GET'], addGroup: ['POST']]
//    def index() {
//        params.start = RatchetConstants.DEFAULT_PAGE_OFFSET
//        params.length = RatchetConstants.DEFAULT_PAGE_SIZE
//        def groupList = groupService.showGroupsList(request, response, params)
//        render view: 'groups', model: [groupList: groupList, pagesize: params.length]
//    }

    def getGroups() {
        if (request.isXhr()) {
            def resp = groupService.showGroupsList(request, response, params)
            render resp as JSON
        } else {
            params.start = RatchetConstants.DEFAULT_PAGE_OFFSET
            params.length = RatchetConstants.DEFAULT_PAGE_SIZE
            def groupList = groupService.showGroupsList(request, response, params)
            render view: 'groups', model: [groupList: groupList, pagesize: params.length]
        }
    }

    def getStaffGroups() {
        def resp
//        params.length = RatchetConstants.DEFAULT_MAX_OFFSET
        if (request.session.accountManagement == true) {
            def response = groupService.showGroupsList(request, response, params)
            resp = response.data
        } else {
            resp = groupService.getStaffGroups(request, response, params)
        }
        render resp as JSON
    }

    def addGroup() {
        def resp = groupService.createGroup(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def updateGroup() {
        def resp = groupService.updateGroup(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

    def deleteGroup() {
        def resp = groupService.deleteGroup(request, response, params)
        def result = [resp: resp]
        render result as JSON
    }

}
