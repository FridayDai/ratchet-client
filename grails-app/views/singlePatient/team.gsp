<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div <g:if test="${archived == 'true'}">class="content archived"</g:if> <g:else>class="content"</g:else>>
    <div class="care-team-content">

        <input type="hidden" class="hidden-treatment-id" value="${treatmentId}"/>
        <input type="hidden" class="hidden-medical-record" value="${medicalRecordId}"/>
        <input type="hidden" class="hidden-client-id" value="${clientId}"/>
        <input type="hidden" class="hidden-patient-id" value="${patientId}"/>
        <input type="hidden" class="hidden-archived" value="${archived}"/>


        <div class="inner-header">
            <h4 class="surgeon">GROUP AND PROVIDER</h4>
        </div>

        <div class="inner-body top-body" id="careTeamBody">
            <g:each in="${surgeons}" var="surgeon">
                <input type="hidden" class="hidden-group-id" value="${surgeon.groupId}"/>

                <div class="group-content">
                    <h4>GROUP</h4>

                    <div id="group-name" class="group-name">${surgeon.groupName}</div>
                </div>

                <div class="provider-content">
                    <h4>PROVIDER</h4>

                    <div class="left-content">
                        <div class="surgeon-id-container">
                            <span>ID:</span>
                            <input type="hidden" class="hidden-surgeon-id" value="${surgeon.id}"/>
                            <span class="surgeon-id">${surgeon.id}</span>
                        </div>
                    </div>

                    <div class="surgeon-name inline">
                        <span
                            <g:if test="${surgeon.doctor == true}">class="surgeon-doctor"</g:if>
                            <g:else>class="surgeon-doctor hidden"</g:else>
                        >Dr.</span>
                        <span id="surgeonFirstName" class="provider-first-name">${surgeon.firstName}</span>
                        <span id="surgeonLastName" class="provider-last-name">${surgeon.lastName}</span>
                    </div>

                    <div class="surgeon-email inline">
                        ${surgeon.email}
                    </div>

                </div>
            </g:each>

            <button
                <g:if test="${archived == 'true'}">
                    class="btn btn-edit-surgeon disabled" disabled="disabled"
                </g:if>
                <g:else>
                    class="btn btn-edit-surgeon"
                </g:else>
                    data-medical-record-id="${medicalRecordId}" data-patient-id="${patientId}"
                    data-account-id="${request.session.accountId}">
            </button>

        </div>
    </div>

    <div class="care-giver-content">
        <div class="inner-header">
            <img src="${assetPath(src: 'emergency_contact.png')}">
            <h4 class="ec-contact">EMERGENCY CONTACT</h4>
            <button <g:if
                            test="${archived == 'true'}">class="btn btn-invite btn-position disabled btn-invite-disabled" disabled="disabled"</g:if>
                    <g:else>class="btn btn-invite btn-position"</g:else> id="invite-giver"
                    data-medical-record-id="${medicalRecordId}"
                    data-client-id="${clientId}" data-patient-id="${patientId}">
                <span>Invite</span>
            </button>
        </div>


        <div class="table-group">
            <div class="inner-body" id="careGiverBody">

                <table class="ec-table team-table display cursorAuto">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Relationship</th>
                        <th>Email Address</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                </table>

            </div>
        </div>

    </div>
</div>
