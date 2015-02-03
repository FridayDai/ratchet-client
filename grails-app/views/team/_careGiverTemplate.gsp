%{--<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>--}%

%{--<div class="detail-info">--}%
    %{--<g:if test="${StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "NORMAL"}">--}%
        %{--<div class="status active-status">--}%
            %{--ACTIVE--}%
        %{--</div>--}%
    %{--</g:if>--}%

    %{--<g:elseif--}%
            %{--test="${StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "INVITED"}">--}%
        %{--<div class="status active-status">--}%
            %{--INVITED--}%
        %{--</div>--}%
    %{--</g:elseif>--}%

    %{--<g:else test="${StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "UNINVITED"}">--}%
        %{--<div class="status invited-status">--}%
            %{--UNINVITED--}%
        %{--</div>--}%
    %{--</g:else>--}%

    %{--<div class="head-content div-margin">--}%
        %{--<div class="inner-head-content div-space">--}%
            %{--<p class="p-id">ID:${careGiver.id}</p>--}%

            %{--<p class="p-name">${careGiver.firstName}${careGiver.lastName}</p>--}%
        %{--</div>--}%

        %{--<div class="inner-bottom-content div-space">--}%
            %{--<p class="p-relationship">Relationship:${StatusCodeConstants.CAREGIVER_RELATION[careGiver.relationShip - 1]}</p>--}%

            %{--<p class="p-email">${careGiver.email}</p>--}%
        %{--</div>--}%
    %{--</div>--}%

    %{--<div class="bottom-content">--}%
        %{--<a href="#" id="edit-care-giver" class="btn-edit" data-id="${careGiver.id}">--}%
            %{--<div class="icon-edit"></div>--}%
        %{--</a>--}%

        %{--<a href="#" id="remove-care-giver" class="btn-remove-giver" data-care-giver-id="${careGiver.id}"--}%
           %{--data-medical-record-id="${medicalRecordId}"--}%
           %{--data-client-id="${clientId}" data-patient-id="${patientId}">--}%
            %{--<div class="icon-remove"></div>--}%
        %{--</a>--}%
    %{--</div>--}%
%{--</div>--}%
