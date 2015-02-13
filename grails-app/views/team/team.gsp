<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>

<div class="content">
    <div class="care-team-content">

        <input type="hidden" id="hidden-medical-record" value="${medicalRecordId}"/>
        <input type="hidden" id="hidden-client-id" value="${clientId}"/>
        <input type="hidden" id="hidden-patient-id" value="${patientId}"/>

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

                <a href="#" class="btn-edit-surgeon" id="btn-edit-surgeon" data-medical-record-id="${medicalRecordId}">
                </a>
            </g:each>
        </div>
    </div>

    <div class="care-giver-content">
        <div class="inner-header">
            <h4 class="ec-contact">EMERGENCY CONTACT</h4>
            <button class="btn btn-invite btn-position" id="invite-giver" data-medical-record-id="${medicalRecordId}"
                    data-client-id="${clientId}" data-patient-id="${patientId}">
                <span>Invite Care Giver</span>
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



<g:form class="editSurgeon ui-hidden" id="editSurgeon">
    <div class="form-group ">
        <label class="lbl-group">CARE TEAM</label>
        <input id="selectStaff" name="selectStaff" type="text" class="multi-select clear"
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
        <label class="lbl-group">EMAIL ADDRESS*</label>
        <input id="giver-email" name="email" type="email" class="input-group" placeholder="Email Address" required/>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">RELATIONSHIP*</label>
        <select id="relationships" name="relationships" class="select-body">>
            <option value="1">Spouse</option>
            <option value="2">Parent</option>
            <option value="3">Child</option>
            <option value="4">Friend</option>
            <option value="5">Other</option>
        </select>
    </div>

</g:form>


<g:form class="warn ui-hidden">

</g:form>
