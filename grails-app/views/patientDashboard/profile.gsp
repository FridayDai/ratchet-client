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
                    <g:if test="${patientInfo?.races?.size()}">
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
                    <g:if test="${!patientInfo?.ethnicity?.equals(null)}">
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
                <g:if test="${StatusCodeConstants.EMAIL_STATUS[patientInfo.status - 1] == "DECLINED"}">
                    <div class="email-state-field">
                        <i class="email-state-icon fa email-state-icon-declined" aria-hidden="true"></i><span class="email-state " data-email-status="${patientInfo.status}">
                        Patient declined to communicate via email. (Warning: This cannot be undone.)</span>
                    </div>
                </g:if>
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
                <div class="info-value">${patientInfo.zipCode ?: 'N/A'}</div>
            </div>
        </div>

        <div class="panel company-panel">
            <div class="panel-title">Insurance Company</div>
            <div class="company-inner-body" id="insurance-company">
                <table class="ec-table company-table display cursorAuto" data-total="${patientInfo?.insuranceCompanys?.size()}">
                    <thead>
                    <tr>
                        <th class="info-name">INSURANCE COMPANY</th>
                        <th class="info-name">POLICY NUMBER</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each var="company" in="${patientInfo?.insuranceCompanys}" status="i">
                        <tr data-is-dom-data="true">
                            <td>${company.name}</td>
                            <td>${company.policyNumber}</td>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
