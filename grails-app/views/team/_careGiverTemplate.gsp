<div class="detail-info">
<<<<<<< HEAD
    <g:if test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[status - 1] == "NORMAL"}">
=======
    <g:if test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "NORMAL"}">
>>>>>>> fcad99ec844203b5d3ab3fadcc62182b05927f48
        <div class="status active-status">
            ACTIVE
        </div>
    </g:if>
    <g:elseif
<<<<<<< HEAD
            test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[status - 1] == "INVITED"}">
=======
            test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "INVITED"}">
>>>>>>> fcad99ec844203b5d3ab3fadcc62182b05927f48
        <div class="status active-status">
            INVITED
        </div>
    </g:elseif>
<<<<<<< HEAD
    <g:else test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[status - 1] == "UNINVITED"}">
=======
    <g:else test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[careGiver.status - 1] == "UNINVITED"}">
>>>>>>> fcad99ec844203b5d3ab3fadcc62182b05927f48
        <div class="status invited-status">
            UNINVITED
        </div>
    </g:else>

    <div class="head-content div-margin">
        <div class="inner-head-content div-space">
<<<<<<< HEAD
            <p class="p-id" value="${id}">ID:${id}</p>

            <p class="p-name">${firstName}${lastName}</p>
=======
            <p class="p-id" value="${careGiver.id}">ID:${careGiver.id}</p>

            <p class="p-name" value="${careGiver.firstName}">Dr.${careGiver.firstName}</p>
>>>>>>> fcad99ec844203b5d3ab3fadcc62182b05927f48
        </div>

        <input type="hidden" name="medicalRecordId" class="medicalRecordId" value="${medicalRecordId}"/>
        <input type="hidden" name="clientId" class="clientId" value="${clientId}"/>
        <input type="hidden" name="patientId" class="patientId" value="${patientId}"/>

        <div class="inner-bottom-content div-space">
            <p class="p-relationship"
<<<<<<< HEAD
               value="${relationShip}">Relationship:${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_RELATION[relationShip - 1]}</p>

            <p class="p-email" value="${email}">${email}</p>
=======
               value="${careGiver.relationShip}">Relationship:${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_RELATION[careGiver.relationShip - 1]}</p>

            <p class="p-email" value="${careGiver.email}">${careGiver.email}</p>
>>>>>>> fcad99ec844203b5d3ab3fadcc62182b05927f48
        </div>
    </div>

    <div class="bottom-content">
<<<<<<< HEAD
        <a href="#" id="edit-care-giver" class="btn-edit" data-id="${id}">
=======
        <a href="#" id="edit-care-giver" class="btn-edit" data-id="${careGiver.id}">
>>>>>>> fcad99ec844203b5d3ab3fadcc62182b05927f48
            <div class="icon-edit"></div>
        </a>
        <a href="#" id="remove-care-giver" class="btn-remove-giver">
            <div class="icon-remove"></div>
        </a>
    </div>

</div>
