<!DOCTYPE html>

<g:set var="scriptPath" value="singlePatientBundle"/>
<g:set var="cssPath" value="treatment"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>
    <div class="content">

        <div class="patient-info clear">

            <div class="patient-col info clear">
                <img class="icon" src="${assetPath(src: 'patient_logo.png')}"/>
                <span class="first-name" value="${patientInfo.firstName}">${patientInfo.firstName}</span>
                <span class="last-name" value="${patientInfo.lastName}">${patientInfo.lastName}</span>
                ID: <span class="id" value="${patientInfo.patientId}">${patientInfo.patientId}</span>
            </div>

            <div class="patient-col email clear" value="${patientInfo.email}">${patientInfo.email}</div>

            <div class="patient-col phone clear" value="${patientInfo.phoneNumber}">${patientInfo.phoneNumber}</div>

            <div class="patient-col edit clear">
                <a href="#" class="btn-edit-patient" data-patient-id="${patientInfo.id}"
                   data-client-id="${patientInfo.client.id}">
                </a>
                <a href="#" class="btn-close">Close</a>
            </div>
            <input type="hidden" name="clientId" value="${patientInfo.client.id}"/>

        </div>

        <div id="tabs" class="patient-tab">
            <button id="addTab" class="add-tab" data-patient-id="${patientInfo.id}" data-id="${patientInfo.patientId}"
                    data-client-id="${patientInfo.client.id}">Add Treatment</button>
            <ul class="tab-treatment">
                <g:each in="${medicalRecords}" var="medicalRecord" status="i">
                    <li>
                        <g:link controller="treatment" action="index" data-id="sub${i}"
                                params="[patientId      : patientInfo.id, clientId: patientInfo.client.id,
                                         medicalRecordId: medicalRecord?.id, treatmentId: medicalRecord?.treatmentId,
                                         surgeryTime    : medicalRecord?.surgeryTime]">${medicalRecord.title}</g:link>
                    </li>
                </g:each>
            </ul>
        </div>
    </div>

    <g:form class="patient-form ui-hidden" id="patient-form" name="patient-form">
        <div class="form-group">
            <input id="patientId" name="id" type="text" class="input-group" placeholder="ID" required/>
        </div>

        <div class="form-group">
            <input id="firstName" name="firstName" type="text" class="input-group" placeholder="First Name" required/>
        </div>

        <div class="form-group">
            <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Last Name" required/>
        </div>

        <div class="form-group">
            <input id="email" name="email" type="text" class="input-group" placeholder="Email" required/>
        </div>

        <div class="form-group">
            <input id="phone" name="phone" type="text" class="input-group" placeholder="Phone" required/>
        </div>

    </g:form>

    <g:form class="treatment-form ui-hidden" id="treatment-form" name="treatment-form">

        <div class="form-group">
            <input id="selectTreatment" name="selectTreatment" type="text" class="input-group" placeholder="Treatment"
                   required/>
        </div>

        <div class="form-group">
            <input id="selectStaffs" name="selectStaffs" type="text" class="multi-select clear" placeholder="Staff"
                   required/>
        </div>

        <div class="form-group div-hidden" id="div-surgery-time">
            <input id="surgeryTime" name="surgeryTime" type="text" class="input-group"
                   placeholder="Surgery Time">
        </div>

        <h4>Emergency Contact</h4>

        <div class="form-group inline">
            <label class="lbl-group">FIRST NAME</label>
            <input id="emergency-firstName" name="emergency-firstName" type="text" class="input-group"
                   placeholder="First Name" required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">LAST NAME</label>
            <input id="emergency-lastName" name="emergency-lastName" type="text" class="input-group"
                   placeholder="Last Name" required/>
        </div>

        <div class="form-group inline">
                <label class="lbl-group">RELATIONSHIP</label>
                <select id="relationship" name="relationship">
                    <option value="1">Spouse</option>
                    <option value="2">Parent</option>
                    <option value="3">Child</option>
                    <option value="4">Friend</option>
                    <option value="5">Other</option>
                </select>
            </label>
        </div>

        <div class="form-group inline emr-email">
             <label class="lbl-group">EMAIL ADDRESS</label>
             <input id="emergency-email" name="email" type="email" class="input-group" placeholder="Email Address" required/>
        </div>

    </g:form>

    </body>
    </html>
</g:applyLayout>
