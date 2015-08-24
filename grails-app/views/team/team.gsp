<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div <g:if test="${archived == 'true'}">class="content archived"</g:if> <g:else>class="content"</g:else>>
    <div class="care-team-content">

        <input type="hidden" id="hidden-medical-record" value="${medicalRecordId}"/>
        <input type="hidden" id="hidden-client-id" value="${clientId}"/>
        <input type="hidden" id="hidden-patient-id" value="${patientId}"/>
        <input type="hidden" id="hidden-active" value="${archived}"/>


        <div class="inner-header">
            <h4 class="surgeon">GROUP AND PROVIDER</h4>
        </div>

        <div class="inner-body top-body" id="careTeamBody">
            <g:each in="${surgeons}" var="surgeon">
                <input type="hidden" id="hidden-group-id" value="${surgeon.groupId}"/>

                <div class="group-content">
                    <h4>GROUP</h4>

                    <div id="group-name">${surgeon.groupName}</div>
                </div>

                <div class="provider-content">
                    <h4>PROVIDER</h4>

                    <div class="left-content">
                        <div class="surgeon-id">
                            <span>ID:</span>
                            <input type="hidden" id="hidden-surgeon-id" value="${surgeon.id}"/>
                            <span id="surgeonId">${surgeon.id}</span>
                        </div>

                    </div>

                    <div class="surgeon-name inline">
                        <g:if test="${surgeon.doctor == true}"><span id="surgeonDoctor">Dr.</span></g:if>
                        <span class="hide" id="surgeonDoctorHidden"></span>
                        <span id="surgeonFirstName">${surgeon.firstName}</span>
                        <span id="surgeonLastName">${surgeon.lastName}</span>
                    </div>

                    <div class="surgeon-email inline" id="surgeonEmail">
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
                    id="btn-edit-surgeon" data-medical-record-id="${medicalRecordId}" data-patient-id="${patientId}"
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

                <table id="careGiverTable" class="team-table display cursorAuto">
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



<g:form class="edit-surgeon ui-hidden" id="editSurgeon">
    <div class="form-group">
        <label class="lbl-group">GROUP<span>*</span></label>
        <input id="groupSelect" name="groupSelect" type="text" class="team-group clear"
               placeholder="Select group" required/>
    </div>

    <div class="form-group team-provider">
        <label class="lbl-group">PROVIDER<span>*</span></label>
        <input id="selectStaff" name="selectStaff" type="text" class="team-group clear"
               placeholder="Select provider" required/>
    </div>
%{--<div class="form-group">--}%
%{--<input type="checkbox" name="primaryCareTeam" id="primaryCareTeam">--}%
%{--<label for="primaryCareTeam">Primary CareTeam</label>--}%
%{--</div>--}%
    <label class="form-group required pull-right"><span>*</span>Required field</label>
</g:form>


<g:form class="inviteGiverForm ui-hidden" id="invite-giver-form">

    <div class="form-group inline">
        <label class="lbl-group">FIRST NAME<span>*</span></label>
        <input id="giver-firstName" name="firstName" type="text" class="input-group"
               placeholder="Grace(Optional)"
               required/>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">LAST NAME<span>*</span></label>
        <input id="giver-lastName" name="lastName" type="text" class="input-group"
               placeholder="Smith(Optional)" required/>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">RELATIONSHIP<span>*</span></label>
        <input id="relationships" name="relationships" class="select-body input-group"
               placeholder="Select relationship" required>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">EMAIL ADDRESS<span>*</span></label>
        <input id="giver-email" name="email" type="email" class="input-group"
               placeholder="grace@email.com(Optional)" required/>
    </div>

    <div class="form-group inline team-permission-confirm">
        <label></label>
        <input type="checkbox" id="permissionConfirm" name="permissionConfirm" required/>*
        <span>Patient would like to release his/her health information to emergency contact.</span>
    </div>
    <label class="form-group required pull-right"><span>*</span>Required field</label>
</g:form>


<g:form class="warn ui-hidden">

</g:form>
