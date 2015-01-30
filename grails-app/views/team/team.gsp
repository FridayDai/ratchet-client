<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>
%{--<g:set var="scriptPath" value="patientTeamBundle"/>--}%
%{--<g:set var="cssPath" value="patientTeam"/>--}%
%{--<g:applyLayout name="main">--}%
%{--<html>--}%
%{--<head>--}%
%{--<title>Welcome to ratchet</title>--}%
%{--</head>--}%

%{--<body>--}%

<div class="content">
    <div class="care-team-content">
        <div class="inner-header">
            <p>Care Team</p>
            <button class="btn-add btn-position" id="add-member">Add Member</button>
            <input type="hidden" name="medicalRecordId" class="medicalRecordId" value="${medicalRecordId}"/>
            <input type="hidden" name="clientId" class="clientId" value="${clientId}"/>
            <input type="hidden" name="patientId" class="patientId" value="${patientId}"/>
        </div>

        <div class="inner-body" id="careTeamBody">
            <g:each in="${careTeams}" var="careTeam" status="i">
                <div class="detail-info" value="${careTeam.id}">
                    <div class="head-content">
                        <div class="inner-head-content div-space">
                            <p class="p-id" value="${careTeam.id}">ID:${careTeam.id}</p>

                            <g:if test="${careTeam.doctor == true}">
                                <p class="p-name">Dr.${careTeam.firstName}${careTeam.lastName}</p>
                            </g:if>
                            <g:else>
                                <p class="p-name">${careTeam.firstName}${careTeam.lastName}</p>
                            </g:else>

                        </div>

                        <input type="hidden" name="medicalRecordId" class="medicalRecordId" value="${medicalRecordId}"/>
                        <input type="hidden" name="clientId" class="clientId" value="${clientId}"/>
                        <input type="hidden" name="patientId" class="patientId" value="${patientId}"/>

                        <div class="inner-bottom-content div-space">
                            <p class="p-role">${com.xplusz.ratchet.StatusCodeConstants.STAFF_TYPE_LIST[careTeam.staffType - 1]}</p>

                            <p class="p-email">${careTeam.email}</p>
                        </div>

                    </div>

                    <div class="middle-content">
                        <p>${careTeam.bio}</p>
                    </div>

                    <div class="bottom-content">
                        %{--<g:if test="${careTeam.primary == true}">--}%
                        %{--<a href="#" class="btn-make-primary btn-primary">Make PRIMARY</a>--}%
                        %{--</g:if>--}%
                        %{--<g:else>--}%
                        %{--<a href="#" class="btn-make-primary">Make PRIMARY</a>--}%
                        %{--</g:else>--}%
                        %{--<a href="#" class="btn-make-primary">Make PRIMARY</a>--}%

                        <a href="#" id="remove-care-team" class="btn-remove-team" value="${careTeam.id}">
                            <div class="icon-remove"></div>
                        </a>
                    </div>
                </div>
            </g:each>
        </div>
    </div>

    <div class="care-giver-content">
        <div class="inner-header">
            <p>Care Giver</p>
            <button class="btn-invite btn-position" id="invite-giver">Invite Care Giver</button>
            <input type="hidden" name="medicalRecordId" class="medicalRecordId" value="${medicalRecordId}"/>
            <input type="hidden" name="clientId" class="clientId" value="${clientId}"/>
            <input type="hidden" name="patientId" class="patientId" value="${patientId}"/>
        </div>

        <div class="inner-body" id="careGiverBody">
            <g:each in="${careGivers}" var="careGiver" status="i">
                <div class="detail-info">
                    <g:if test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "NORMAL"}">
                        <div class="status active-status">
                            ACTIVE
                        </div>
                    </g:if>
                    <g:elseif
                            test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "INVITED"}">
                        <div class="status active-status">
                            INVITED
                        </div>
                    </g:elseif>
                    <g:else test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "UNINVITED"}">
                        <div class="status invited-status">
                            UNINVITED
                        </div>
                    </g:else>

                    <div class="head-content div-margin">
                        <div class="inner-head-content div-space">
                            <p class="p-id" value="${careGiver.id}">ID:${careGiver.id}</p>

                            <p class="p-name">${careGiver.firstName}${careGiver.lastName}</p>
                        </div>

                        <input type="hidden" name="medicalRecordId" class="medicalRecordId" value="${medicalRecordId}"/>
                        <input type="hidden" name="clientId" class="clientId" value="${clientId}"/>
                        <input type="hidden" name="patientId" class="patientId" value="${patientId}"/>

                        <div class="inner-bottom-content div-space">
                            <p class="p-relationship"
                               value="${careGiver.relationShip}">Relationship:${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_RELATION[careGiver.relationShip - 1]}</p>

                            <p class="p-email" value="${careGiver.email}">${careGiver.email}</p>
                        </div>
                    </div>

                    <div class="bottom-content">
                        <a href="#" id="edit-care-giver" class="btn-edit" data-id="${careGiver.id}">
                            <div class="icon-edit"></div>
                        </a>
                        <a href="#" id="remove-care-giver" class="btn-remove-giver">
                            <div class="icon-remove"></div>
                        </a>
                    </div>

                </div>
            </g:each>
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
        <input id="giver-email" name="email" type="email" class="input-group" placeholder="Email Address"
               required/>
    </div>

    <div class="form-group select-group">
        <label for="relationship">Relationship:</label>
        <select name="relationship" id="relationship" class="select-body">
            %{--<option selected="selected" value="1">OFFSPRING</option>--}%
            <option value="1">OFFSPRING</option>
            <option value="2">SPOUSE</option>
        </select>
    </div>
</g:form>


<g:form class="warn ui-hidden">

</g:form>

%{--</body>--}%
%{--</html>--}%
%{--</g:applyLayout>--}%
