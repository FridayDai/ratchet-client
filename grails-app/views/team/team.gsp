<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>

<div <g:if test="${archived == 'true'}">class="content archived"</g:if> <g:else>class="content"</g:else>>
    <div class="care-team-content">

        <input type="hidden" id="hidden-medical-record" value="${medicalRecordId}"/>
        <input type="hidden" id="hidden-client-id" value="${clientId}"/>
        <input type="hidden" id="hidden-patient-id" value="${patientId}"/>
        <input type="hidden" id="hidden-active" value="${archived}"/>

        <div class="inner-header">
            <h4 class="surgeon">SURGEON</h4>
        </div>

        <div class="inner-body top-body" id="careTeamBody">
            <g:each in="${surgeons}" var="surgeon">
                <div class="left-content inline">
                    <div class="surgeon-id">
                        <span>ID:</span>
                        <span id="surgeonId">${surgeon.id}</span>
                    </div>

                    <div class="surgeon-name">
                        <span id="surgeonFirstName">${surgeon.firstName}</span>
                        <span id="surgeonLastName">${surgeon.lastName}</span>
                    </div>
                </div>


                <div class="surgeon-email inline" id="surgeonEmail">
                    ${surgeon.email}
                </div>

                <button
                    <g:if test="${archived == 'true'}">
                        class="btn btn-edit-surgeon disabled" disabled="disabled"
                    </g:if>
                    <g:else>
                        class="btn btn-edit-surgeon"
                    </g:else>
                        id="btn-edit-surgeon" data-medical-record-id="${medicalRecordId}">
                </button>
            </g:each>
        </div>
    </div>

    <div class="care-giver-content">
        <div class="inner-header">
            <h4 class="ec-contact">EMERGENCY CONTACT</h4>
            <button <g:if test="${archived == 'true'}"> class="btn btn-invite btn-position disabled" disabled="disabled"</g:if> <g:else>class="btn btn-invite btn-position"</g:else> id="invite-giver" data-medical-record-id="${medicalRecordId}"
                    data-client-id="${clientId}" data-patient-id="${patientId}">
                <span>Invite</span>
            </button>
        </div>


        <div class="table-group">
            <div class="inner-body" id="careGiverBody">

                <table id="careGiverTable" class="team-table display">
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
    <div class="form-group inline">
        <label class="lbl-group">SURGEON</label>
        <input id="selectStaff" name="selectStaff" type="text" class="clear"
               placeholder="Surgeon"
               required/>
    </div>
%{--<div class="form-group">--}%
%{--<input type="checkbox" name="primaryCareTeam" id="primaryCareTeam">--}%
%{--<label for="primaryCareTeam">Primary CareTeam</label>--}%
%{--</div>--}%

</g:form>


<g:form class="inviteGiverForm ui-hidden" id="invite-giver-form">

    <div class="form-group inline">
        <label class="lbl-group">FIRST NAME*</label>
        <input id="giver-firstName" name="firstName" type="text" class="input-group" placeholder="First Name"
               required/>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">LAST NAME*</label>
        <input id="giver-lastName" name="lastName" type="text" class="input-group" placeholder="Last Name" required/>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">RELATIONSHIP*</label>
        <input id="relationships" name="relationships" class="select-body input-group" required>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">EMAIL ADDRESS*</label>
        <input id="giver-email" name="email" type="email" class="input-group" placeholder="Email Address" required/>
    </div>

    <div class="form-group inline team-permission-confirm">
        <label></label>
        <input type="checkbox" name="permissionConfirm" checked required/>*
        <span>Patient has given permission to release his/her health information to emergency contact.</span>
    </div>

</g:form>


<g:form class="warn ui-hidden">

</g:form>
