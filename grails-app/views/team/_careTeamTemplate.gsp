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
