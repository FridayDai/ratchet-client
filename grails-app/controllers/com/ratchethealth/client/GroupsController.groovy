package com.ratchethealth.client

import grails.converters.JSON

class GroupsController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def groupService

    static allowedMethods = [getGroups: ['GET'], addGroup: ['POST']]

    def getGroups(GroupPagination groupPagination) {
        def clientId = session.clientId
        if (request.isXhr()) {
            def resp = groupService.showGroupsList(session.token, clientId, groupPagination)
            render resp as JSON
        } else {
            groupPagination.start = RatchetConstants.DEFAULT_PAGE_OFFSET
            groupPagination.length = RatchetConstants.DEFAULT_PAGE_SIZE
            def groupList = groupService.showGroupsList(session.token, clientId, groupPagination)
            render view: 'groups', model: [groupList: groupList, pagesize: groupPagination.length]
        }
    }

    def getStaffGroups(GroupPagination groupPagination) {
        def resp, clientId = session.clientId
//        params.length = RatchetConstants.DEFAULT_MAX_OFFSET
        if (request.session.accountManagement == true) {
            def response = groupService.showGroupsList(session.token, clientId, groupPagination)
            resp = response.data
        } else {
            resp = groupService.getStaffGroups(session.token, clientId, groupPagination.name)
        }
        render resp as JSON
    }

    def addGroup() {
        def name = params?.name
        def treatmentIds = params?.treatments

        def resp = groupService.createGroup(session.token, session.clientId, name)
        if (resp.id) {
            groupService.updateTreatmentsOnGroup(session.token, session.clientId, resp.id, treatmentIds)

            def result = [resp: resp]
            render result as JSON
        }
    }

    def updateGroup() {
        def name = params?.name
        def groupId = params?.groupId
        def treatmentIds = params?.treatments

        def resp = groupService.updateGroup(session.token, session.clientId, name, groupId)

        if (resp) {
            resp = groupService.updateTreatmentsOnGroup(session.token, session.clientId, groupId, treatmentIds)

            def result = [resp: resp]
            render result as JSON
        }
    }

    def deleteGroup() {
        def resp = groupService.deleteGroup(session.token, session.clientId, params.groupId)
        def result = [resp: resp]
        render result as JSON
    }
}
