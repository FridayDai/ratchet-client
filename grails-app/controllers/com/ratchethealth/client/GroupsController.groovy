package com.ratchethealth.client

import grails.converters.JSON

class GroupsController extends BaseController {

    def beforeInterceptor = [action: this.&auth]
    def groupService

    static allowedMethods = [getGroups: ['GET'], addGroup: ['POST']]

    def getGroups(GroupFilterFields groupPagination) {
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

    def getStaffGroups(GroupFilterFields groupPagination) {
        def resp, clientId = session.clientId
        def treatmentId = params?.treatmentId

        if (treatmentId) {
            treatmentId = treatmentId as long
        }

        resp = groupService.getStaffGroups(session.token, clientId, treatmentId, groupPagination.name)

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

    def getPatientGroups() {
        String token = request.session.token
        def patientId = params?.patientId
        def clientId = request.session.clientId

        def resp = groupService.getGroupsPatientBelongsTo(token, clientId, patientId)
        render resp as JSON
    }

    def addGroupsToPatient() {
        def patientId = params?.patientId
        def groupIds = params?.groups

        def resp = groupService.addGroupToPatient(session.token, session.clientId, patientId, groupIds)
        render resp
    }

    def deletePatientGroup() {
        def patientId = params?.patientId
        def groupId = params?.groupId
        def accountManagement = session.accountManagement
        if(accountManagement) {
            def resp = groupService.deleteGroupOfPatient(session.token, session.clientId, patientId, groupId)
            render resp
        } else {
            render false
        }
    }
}
