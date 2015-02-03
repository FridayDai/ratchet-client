%{--<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>--}%

%{--<div class="detail-info" data-care-team-id="${careTeam.id}">--}%
    %{--<div class="head-content">--}%
        %{--<div class="inner-head-content div-space">--}%
            %{--<p class="p-id">ID:${careTeam.id}</p>--}%

            %{--<g:if test="${careTeam.doctor == true}">--}%
                %{--<p class="p-name">Dr.${careTeam.firstName}${careTeam.lastName}</p>--}%
            %{--</g:if>--}%

            %{--<g:else>--}%
                %{--<p class="p-name">${careTeam.firstName}${careTeam.lastName}</p>--}%
            %{--</g:else>--}%

        %{--</div>--}%

        %{--<div class="inner-bottom-content div-space">--}%
            %{--<p class="p-role">${StatusCodeConstants.STAFF_TYPE_LIST[careTeam.staffType - 1]}</p>--}%

            %{--<p class="p-email">${careTeam.email}</p>--}%
        %{--</div>--}%

    %{--</div>--}%

    %{--<div class="middle-content">--}%

        %{--<p>${careTeam.bio}</p>--}%

    %{--</div>--}%

    %{--<div class="bottom-content">--}%
        %{--<g:if test="${careTeam.primary == true}">--}%
        %{--<a href="#" class="btn-make-primary btn-primary">Make PRIMARY</a>--}%
        %{--</g:if>--}%
        %{--<g:else>--}%
        %{--<a href="#" class="btn-make-primary">Make PRIMARY</a>--}%
        %{--</g:else>--}%
        %{--<a href="#" class="btn-make-primary">Make PRIMARY</a>--}%

        %{--<a href="#" id="remove-care-team" class="btn-remove-team" data-care-team-id="${careTeam.id}"--}%
           %{--data-medical-record-id="${medicalRecordId}"--}%
           %{--data-client-id="${clientId}" data-patient-id="${patientId}">--}%
            %{--<div class="icon-remove"></div>--}%
        %{--</a>--}%
    %{--</div>--}%
%{--</div>--}%
