<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>

<div class="content">
    <div class="care-team-content">

        <div class="inner-header">
            <p>Care Team</p>
            <button class="btn-add btn-position" id="add-member" data-medical-record-id="${medicalRecordId}"
                    data-client-id="${clientId}" data-patient-id="${patientId}">Add Member</button>
        </div>

        <div class="inner-body" id="careTeamBody">
            <g:if test="${careTeams}">
                <g:each in="${careTeams}" var="careTeam" status="i">

                    <g:render template="careTeamTemplate" model="[careTeam: careTeam]"/>

                </g:each>
            </g:if>
        </div>
    </div>

    <div class="care-giver-content">
        <div class="inner-header">
            <p>Care Giver</p>
            <button class="btn-invite btn-position" id="invite-giver" data-medical-record-id="${medicalRecordId}"
                    data-client-id="${clientId}" data-patient-id="${patientId}">Invite Care Giver</button>
        </div>

        <div class="inner-body" id="careGiverBody">
            <g:if test="${careGivers}">
                <g:each in="${careGivers}" var="careGiver" status="i">

                    <g:render template="careGiverTemplate" model="[careGiver: careGiver]"/>

                </g:each>
            </g:if>
        </div>
    </div>
</div>

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
        <input id="giver-email" name="email" type="email" class="input-group" placeholder="Email Address"/>
    </div>

    <div class="form-group select-group">
        <label for="relationship">Relationship:</label>
        <select name="relationship" id="relationship" class="select-body">
            <option value="">Select relationship</option>
            <option value="1">OFFSPRING</option>
            <option value="2">SPOUSE</option>
        </select>
    </div>

</g:form>


<g:form class="warn ui-hidden">

</g:form>
