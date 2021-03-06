<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div class="content patient-caregiver-section">
    <div class="top-tabs-content care-giver-content">
        <div class="care-giver-toolbar">
            <button class="btn btn-invite btn-position" id="invite-giver" data-patient-id="${patientId}">
                <span>Invite</span>
            </button>
        </div>

        <div class="table-group">
            <div class="inner-body" id="caregiverBody">
                <table class="ec-table team-table display cursorAuto" data-total="${caregiverList.size()}">
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
                    <g:each var="caregiver" in="${caregiverList}" status="i">
                        <tr data-is-dom-data="true">
                            <td>${caregiver.id}</td>
                            <td>${caregiver.firstName} ${caregiver.lastName}</td>
                            <td>${caregiver.relationShip}</td>
                            <td>${caregiver.email}</td>
                            <td>${caregiver.status}</td>
                            <td></td>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
