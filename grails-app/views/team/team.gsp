<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>

<div class="content">
    <div class="care-team-content">

        <div class="inner-header">
            <p>Care Team</p>
            <button class="btn-add btn-position" id="add-member" data-medical-record-id="${medicalRecordId}"
                    data-client-id="${clientId}" data-patient-id="${patientId}">Add Member</button>
        </div>

        <div class="inner-body" id="careTeamBody">

            <table id="careTeamTable" class="display">
                <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Email Address</th>
                    <th></th>
                </tr>
                </thead>
            </table>

        </div>
    </div>

    <div class="care-giver-content">
        <div class="inner-header">
            <p>Care Giver</p>
            <button class="btn-invite btn-position" id="invite-giver" data-medical-record-id="${medicalRecordId}"
                    data-client-id="${clientId}" data-patient-id="${patientId}">Invite Care Giver</button>
        </div>

        <div class="inner-body" id="careGiverBody">

            <table id="careGiverTable" class="display">
                <thead>
                <tr>
                    <th></th>
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

<input type="hidden" id="hidden-medical-record" value="${medicalRecordId}"/>
<input type="hidden" id="hidden-client-id" value="${clientId}"/>
<input type="hidden" id="hidden-patient-id" value="${patientId}"/>

<g:form class="addTeamForm ui-hidden" id="add-team-form">
    <div class="form-group ">
        <input id="selectStaff" name="selectStaff" type="text" class="multi-select clear" placeholder="Staff"
               required/>
    </div>

%{--<div class="form-group">--}%
%{--<input type="checkbox" name="primaryCareTeam" id="primaryCareTeam">--}%
%{--<label for="primaryCareTeam">Primary CareTeam</label>--}%
%{--</div>--}%

</g:form>


<g:form class="inviteGiverForm ui-hidden" id="invite-giver-form">

    <div class="form-group">
        <input id="giver-firstName" name="firstName" type="text" class="input-group" placeholder="First Name" required/>
    </div>

    <div class="form-group">
        <input id="giver-lastName" name="lastName" type="text" class="input-group" placeholder="Last Name" required/>
    </div>

    <div class="form-group">
        <input id="giver-email" name="email" type="email" class="input-group" placeholder="Email Address"/>
    </div>

    <div class="form-group select-group">
        <label for="relationship">Relationship:</label>
        <select name="relationship" id="relationship" class="select-body">
            <option value="">Select relationship</option>
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
