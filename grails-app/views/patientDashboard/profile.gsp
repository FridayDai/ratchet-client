<%@ page import="com.ratchethealth.client.RatchetConstants; com.ratchethealth.client.Utils; com.ratchethealth.client.StatusCodeConstants" %>

<div class="content patient-group-section">
    <div class="top-tabs-content profile-content">
        <div class="panel basic-panel">
            <div class="panel-title">Basic Info</div>
            <div class="required-field">*Required field</div>

            <div class="info-field">
                <label class="info-name">PATIENT ID*</label>
                <div class="info-value">${patientInfo.patientId ?: 'N/A'}</div>
            </div>

            <div class="info-field">
                <label class="info-name">NAME*</label>
                <div class="info-value">
                    <span class="first-name">${patientInfo.firstName ?: ''}</span>
                    <span class="first-name">${patientInfo.middleName ?: ''}</span>
                    <span class="last-name">${patientInfo.lastName ?: ''}</span>
                </div>
            </div>

            <div class="info-field">
                <label class="info-name">BIRTHDAY*</label>
                <div class="info-value">${Utils.formatBirthday(patientInfo?.birthday) ?: 'N/A'}</div>
            </div>

            <div class="info-field">
                <label class="info-name">GENDER AT BIRTH</label>
                <div class="info-value">
                    <g:if test="${patientInfo.gender == "MALE"}">
                        <span class="gender-male"></span>Male
                    </g:if>
                    <g:elseif test="${patientInfo.gender == "FEMALE"}">
                        <span class="gender-female"></span>Female
                    </g:elseif>
                    <g:else>
                        <span>N/A</span>
                    </g:else>
                </div>
            </div>

            <div class="info-field">
                <label class="info-name">RACE</label>
                <div class="info-value">
                    <g:if test="${patientInfo?.races}">
                        <g:each in="${patientInfo?.races}" var="race" status="i">
                            <g:if test="${i > 0}">,</g:if>
                            ${RatchetConstants.PROFILE_RACE[race]}
                        </g:each>
                    </g:if>
                    <g:else>
                        N/A
                    </g:else>
                </div>
            </div>

            <div class="info-field">
                <label class="info-name">ETHNICITY</label>
                <div class="info-value">
                    <g:if test="${patientInfo?.ethnicity}">
                        ${RatchetConstants.PROFILE_ETHNICITY[patientInfo?.ethnicity]}
                    </g:if>
                    <g:else>
                        N/A
                    </g:else>
                </div>
            </div>

        </div>

        <div class="panel contact-panel">
            <div class="panel-title">Contact</div>

            <div class="info-field">
                <label class="info-name">EMAIL ADDRESS</label>
                <div class="info-value">${patientInfo.email ?: 'N/A'}</div>
            </div>

            <div class="info-field">
                <label class="info-name">PHONE NUMBER</label>
                <div class="info-value">${patientInfo.phoneNumber ?: 'N/A'}</div>
            </div>

            <div class="info-field">
                <label class="info-name">STREET ADDRESS</label>
                <div class="info-value">${patientInfo.address ?: 'N/A'}</div>
            </div>

            <div class="info-field">
                <label class="info-name">CITY</label>
                <div class="info-value">${patientInfo.city ?: 'N/A'}</div>
            </div>

            <div class="info-field">
                <label class="info-name">STATE</label>
                <div class="info-value">${patientInfo.state ?: 'N/A'}</div>
            </div>

            <div class="info-field">
                <label class="info-name">ZIPCODE</label>
                <div class="info-value">${patientInfo.zipcode ?: 'N/A'}</div>
            </div>
        </div>

    </div>
</div>
