<!DOCTYPE html>

<g:set var="scriptPath" value="patientListBundle"/>
<g:set var="cssPath" value="patientList"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to Ratchet Health</title>
    </head>

    <body>
    <div>
        <div class="inner-header">
            <label class="title">PATIENTS</label>
            <a href="#" id="add-patient" class="btn add-patient"><span>New Patient</span></a>
        </div>

        <div class="inner-search">
            <div class="search-content clear">
                <div class="filler-content">
                    <label for="treatmentForSearchPatient" class="select-tip">TREATMENT</label>
                    <input type="text" class="input-group input-auto-search" name="treatmentForSearchPatient"
                           id="treatmentForSearchPatient"/>
                </div>

                <div class="filler-content">
                    <label for="selectSurgeon" class="select-tip">PROVIDER</label>
                    <input type="text" name="selectSurgeon" id="selectSurgeon" class="input-group input-auto-search"/>
                </div>

                <div class="filler-content right-search">
                    <input type="text" placeholder="Patient ID, Name" class="search-input" id="search-input">
                    <span class="search" id="search-btn"></span>
                </div>
            </div>
        </div>

        <div class="table-group">
            <table id="patientsTable" class="display div-hidden" data-total="${patientList.recordsTotal}"
                   data-pagesize="${pagesize}" data-filtered="${patientList.recordsFiltered} ">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Last Update</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <g:each var="patient" in="${patientList.data}" status="i">
                    <tr data-is-dom-data="true">
                        <td>${patient.patientId}</td>
                        <td>${patient.firstName} ${patient.lastName}</td>
                        <td>${patient.email}</td>
                        <td>${patient.phoneNumber}</td>
                        <td>${patient.lastUpdate}</td>
                        <td>${patient.id}</td>
                    </tr>
                </g:each>
                </tbody>
            </table>
        </div>

        <g:form class="form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <label class="lbl-group">PATIENT ID<span>*</span></label>
                <input id="patientId" name="patientId" type="text" class="input-group"
                       placeholder="1234567890"
                       required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">FIRST NAME<span>*</span></label>
                <input id="firstName" name="firstName" type="text" class="input-group" placeholder="John" required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">LAST NAME<span>*</span></label>
                <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Smith"
                       required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">PHONE NUMBER<span>*</span></label>
                <input id="phoneNumber" name="phoneNumber" type="tel" class="input-group" maxlength="14"
                       placeholder="777-777-7777" required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">EMAIL ADDRESS<span>*</span></label>
                <input id="email" name="email" type="email" class="input-group" placeholder="john.smith@email.com"
                       required/>

            </div>

            <h4>EMERGENCY CONTACT</h4>

            <div class="emergency-contact-info">
                <div class="form-group inline">
                    <label class="lbl-group">FIRST NAME<span class="emergency-required">*</span></label>
                    <input id="emergency-firstName" name="emergency-firstName" type="text"
                           class="input-group emergency-field"
                           placeholder="Grace"/>
                </div>

                <div class="form-group inline">
                    <label class="lbl-group">LAST NAME<span class="emergency-required">*</span></label>
                    <input id="emergency-lastName" name="emergency-lastName" type="text"
                           class="input-group emergency-field"
                           placeholder="Smith"/>
                </div>

                <div class="form-group inline">
                    <label class="lbl-group">RELATIONSHIP<span class="emergency-required">*</span></label>
                    <input id="relationship" name="relationship" class="input-group">
                </div>

                <div class="form-group inline emr-email">
                    <label class="lbl-group">EMAIL ADDRESS<span class="emergency-required">*</span></label>
                    <input id="emergency-email" name="email" type="email" class="input-group emergency-field"
                           placeholder="grace@email.com" required/>
                </div>

                <div class="form-group inline permission-confirm" data-direction="up">
                    <label></label>
                    <input type="checkbox" name="permissionConfirm" class="permission-confirm-check"/>*
                    <span>Patient has given permission to release his/her health information to emergency contact.</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lbl-group">GROUP<span>*</span></label>
                <input id="selectGroup" name="selectGroup" type="text" class="input-group patient-group re-position clear"
                       placeholder="Select group" required/>
            </div>

            <h4 class="treatment-info-title">TREATMENT INFO</h4>

            <div class="form-group inline">
                <label class="lbl-group">TREATMENT<span>*</span></label>
                <input id="selectTreatment" name="selectTreatment" type="text" class="input-group treatment re-position clear"
                       placeholder="Select treatment" required/>
            </div>

            <div class="form-group inline" id="div-surgery-time">
                <label class="lbl-group">SURGERY TIME<span>*</span></label>
                <input id="surgeryTime" name="surgeryTime" type="text" class="input-group surgery-time re-position"
                       placeholder="" required disabled/>
            </div>

            <div class="form-group ">
                <label class="lbl-group">PROVIDER<span>*</span></label>
                <input id="selectStaffs" name="selectStaffs" type="text" class="re-position clear"
                       placeholder="Select provider" required/>
            </div>
            <label class="form-group required pull-right"><span>*</span>Required field</label>
        </g:form>

        <g:form class="warn ui-hidden">

        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
