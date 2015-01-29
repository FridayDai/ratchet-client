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
        <div class="content-head">
            <a href="#" class="btn-back">
                <div class="icon-back"></div>
            </a>

            <p>Patient</p>
        </div>

        <div class="patient-info">
            <div class="patient-left-info patient-inner-info">
                <div class="id-info color" value="${patientInfo.id}">ID: ${patientInfo.id}</div>

                <div class="name-info first-name-info div-space color"
                     value="${patientInfo.firstName}">${patientInfo.firstName}</div>

                <div class="name-info last-name-info div-space color"
                     value="${patientInfo.lastName}">${patientInfo.lastName}</div>

            </div>

            <div class="patient-right-info patient-inner-info">
                <div class="color email">Email:</div>

                <div class="email-info color email" value="${patientInfo.email}">${patientInfo.email}</div>

                <div class="color phone">Phone:</div>

                <div class="phone-info div-space color phone"
                     value="${patientInfo.phoneNumber}">${patientInfo.phoneNumber}</div>
            </div>

            <a href="#" class="btn-edit-patient">
                <div class="icon-edit"></div>
            </a>

            <input type="hidden" name="clientId" value="${patientInfo.client.id}"/>
        </div>

        <div id="tabs" class="patient-tab">
            <button id="addTab" class="add-tab">Add Treatment</button>
            <ul class="tab-treatment">
                <g:each in="${medicalRecords}" var="medicalRecord" status="i">
                    <li>
                        <g:link controller="treatment" action="index" data-id="sub${i}"
                                params="[medicalRecordId: medicalRecord.id, clientId: patientInfo.client.id, patientId: patientInfo.id]">${medicalRecord.title}</g:link>
                    </li>
                </g:each>
            </ul>
        </div>
    </div>

    <g:form class="patient-form ui-hidden" id="patient-form" name="patient-form">
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

    %{--<div class="form-group">--}%
    %{--<input id="surgeryTime" name="surgeryTime" type="text" class="input-group" placeholder="Surgery Time"--}%
    %{--required/>--}%
    %{--</div>--}%
    </g:form>

    <g:form class="treatment-form ui-hidden" id="treatment-form" name="treatment-form">

        <div class="form-group">
            <input id="selectTreatment" name="selectTreatment" type="text" class="input-group" placeholder="Treatment"
                   required/>
        </div>

        <div class="form-group ">
            <input id="selectStaffs" name="selectStaffs" type="text" class="multi-select clear" placeholder="Staff"
                   required/>
        </div>

    </g:form>

    </body>
    </html>
</g:applyLayout>
