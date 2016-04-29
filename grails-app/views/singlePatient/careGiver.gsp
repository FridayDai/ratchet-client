<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div class="content">
    <div class="care-giver-content">
        <div class="toolbar">
            <button class="btn btn-invite btn-position" id="invite-giver" data-patient-id="${patientId}">
                <span>Invite</span>
            </button>
        </div>

        <div class="table-group">
            <div class="inner-body" id="careGiverBody">
                <table class="ec-table team-table display cursorAuto">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Relationship</th>
                        <th>Email Address</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each var="caregiver" in="${careGiverList.data}" status="i">
                        <tr data-is-dom-data="true">
                            <td>${caregiver.id}</td>
                            <td>${caregiver.firstName} ${patient.lastName}</td>
                            <td>${patient.relationShip}</td>
                            <td>${patient.email}</td>
                            <td>${patient.status}</td>
                            <td></td>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
