<div class="detail-info">
    <div class="head-content">
        <div class="inner-head-content div-space">
            <p class="p-id" value="${id}">ID:${id}</p>

            <g:if test="${doctor == true}">
                <p class="p-name">Dr.${firstName}${lastName}</p>
            </g:if>
            <g:else>
                <p class="p-name">${firstName}${lastName}</p>
            </g:else>

        </div>

        <input type="hidden" name="medicalRecordId" class="medicalRecordId" value="${medicalRecordId}"/>
        <input type="hidden" name="clientId" class="clientId" value="${clientId}"/>
        <input type="hidden" name="patientId" class="patientId" value="${patientId}"/>

        <div class="inner-bottom-content div-space">
            <p class="p-role">${com.xplusz.ratchet.StatusCodeConstants.STAFF_TYPE_LIST[staffType - 1]}</p>

            <p class="p-email">${email}</p>
        </div>

    </div>

    <div class="middle-content">
        <p>${bio}</p>
    </div>

    <div class="bottom-content">
        <a href="#" id="remove-care-team" class="btn-remove-team">
            <div class="icon-remove"></div>
        </a>
    </div>
</div>
