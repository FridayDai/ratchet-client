<div class="detail-info">
    <g:if test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[status - 1] == "NORMAL"}">
        <div class="status active-status">
            ACTIVE
        </div>
    </g:if>
    <g:elseif
            test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[status - 1] == "INVITED"}">
        <div class="status active-status">
            INVITED
        </div>
    </g:elseif>
    <g:else test="${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_STATUS[status - 1] == "UNINVITED"}">
        <div class="status invited-status">
            UNINVITED
        </div>
    </g:else>

    <div class="head-content div-margin">
        <div class="inner-head-content div-space">
            <p class="p-id" value="${id}">ID:${id}</p>

            <p class="p-name">${firstName}${lastName}</p>
        </div>

        <input type="hidden" name="medicalRecordId" class="medicalRecordId" value="${medicalRecordId}"/>
        <input type="hidden" name="clientId" class="clientId" value="${clientId}"/>
        <input type="hidden" name="patientId" class="patientId" value="${patientId}"/>

        <div class="inner-bottom-content div-space">
            <p class="p-relationship"
               value="${relationShip}">Relationship:${com.xplusz.ratchet.StatusCodeConstants.CAREGIVER_RELATION[relationShip - 1]}</p>

            <p class="p-email" value="${email}">${email}</p>
        </div>
    </div>

    <div class="bottom-content">
        <a href="#" id="edit-care-giver" class="btn-edit" data-id="${id}">
            <div class="icon-edit"></div>
        </a>
        <a href="#" id="remove-care-giver" class="btn-remove-giver">
            <div class="icon-remove"></div>
        </a>
    </div>

</div>
