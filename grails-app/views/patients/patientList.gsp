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
            <a href="#" id="add-patient" class="btn btn-add add-patient"
               data-account-id="${request.session.accountId}"><span>New Patient</span></a>
            <g:if test="${request.session.accountManagement == true}">
                <a href="#" id="bulk-important" class="btn btn-add bulk-important"><span>Bulk Import</span></a>
            </g:if>
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

        <g:form class="form ui-hidden" id="patient-id-form" name="patient-id-form">

            <div class="form-group inline">
                <label class="lbl-group">PATIENT ID<span>*</span></label>
                <input id="new-patient-id" name="new-patient-id" type="text" class="input-group input-only-one"
                       placeholder="1234567890" required/>
            </div>

        %{--<label class="form-group required pull-right"><span>*</span>Required field</label>--}%

            <div class="required-field required-padding">
                *Required field
            </div>

        </g:form>

        <g:form class="form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <label class="lbl-group">PATIENT ID<span>*</span></label>

                <div id="patient-id-value" class="patient-id-div"></div>
                %{--<input id="patientId" name="patientId" type="text" class="input-group"--}%
                %{--placeholder="1234567890"--}%
                %{--required/>--}%
            </div>

            <div class="form-group inline">
                <label class="lbl-group">FIRST NAME<span>*</span></label>
                <input id="firstName" name="firstName" type="text" class="input-group input-convert" placeholder="John"
                       required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">LAST NAME<span>*</span></label>
                <input id="lastName" name="lastName" type="text" class="input-group input-convert" placeholder="Smith"
                       required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">PHONE NUMBER<span>*</span></label>
                <input id="phoneNumber" name="phoneNumber" type="tel" class="input-group input-convert" maxlength="14"
                       placeholder="777-777-7777" required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">EMAIL ADDRESS<span>*</span></label>
                <input id="email" name="email" type="email" class="input-group input-convert"
                       placeholder="john.smith@email.com" required/>

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
                    <input id="emergency-email" name="emergency-email" type="email" class="input-group emergency-field"
                           placeholder="grace@email.com"/>
                </div>

                <div class="form-group inline permission-confirm" data-direction="up">
                    <label></label>
                    <input type="checkbox" name="permissionConfirm" class="permission-confirm-check"/>*
                    <span>Patient would like to release his/her health information to
                        <span id="ec-first-name"></span>.</span>

                </div>
            </div>

            <h4 class="treatment-info-title">TREATMENT INFO</h4>

            <div class="form-group">
                <label class="lbl-group">GROUP<span>*</span></label>
                <input id="selectGroup" name="selectGroup" type="text"
                       class="input-group patient-group re-position clear"
                       placeholder="Select group" required/>
            </div>

            <div class="form-group form-provider">
                <label class="lbl-group">PROVIDER<span>*</span></label>
                <input id="selectStaffs" name="selectStaffs" type="text" class="clear"
                       placeholder="" required disabled/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">TREATMENT<span>*</span></label>
                <input id="selectTreatment" name="selectTreatment" type="text"
                       class="input-group treatment re-position clear"
                       placeholder="Select treatment" required/>
            </div>

            <div class="form-group inline" id="div-surgery-time">
                <label class="lbl-group">SURGERY DATE<span>*</span></label>
                <input id="surgeryTime" name="surgeryTime" type="text" class="input-group surgery-time re-position"
                       placeholder="" required disabled/>
            </div>


            <label class="form-group required pull-right"><span>*</span>Required field</label>
        </g:form>

        <g:form class="import-form ui-hidden" id="bulk-import-form" name="bulk-import-form">
            <div class="import-content">
                <p>Upload a <strong class="strong">.csv</strong> file containing the patients you wish to create. Please note that a maximum of <strong class="strong">100</strong> patients can be included in your file and it may take a few minutes to process.</p>
                <g:link action="downloadFile" controller="patients" class="download-file">Download Sample File</g:link>
                <div class="inner-search">
                    <div class="search-content clear">
                        <div class="filler-content">
                            <input type="text" placeholder="Title" class="search-input" autocomplete="false"
                                   name="search-title-input" id="search-title-input">
                            <span class="search" id="search-title-btn"></span>
                        </div>
                    </div>
                </div>

                <div class="import-table-group">
                    <table id="helpTable" class="help-display div-hidden cursorAuto">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>ID</th>
                        </tr>
                        </thead>
                    </table>

                    <p class="search-tip">Lookup ID by typing in the name of treatment, provider or group in the above search box.</p>
                </div>

                <div class="clear">
                    <span id="bulk-important-file" class="btn btn-add bulk-important-file clear">
                        <span>Import File</span>
                        <input id="fileupload" type="file" name="file" data-url="/patients/bulk-import/upload"
                               accept=".csv">
                    </span>

                    <div class="result-box">
                        <p class="upload-error"></p>
                    </div>

                    <div class="progress-box">
                        <div id="progress" class="progress">
                            <div class="progress-bar progress-bar-success" style="width: 0%;"></div>
                        </div>

                        <div class="loading"></div>
                    </div>

                    <div class="error-tip-box"><p
                            class="error-tip">We are not able to process this file due to a format problem. Please verify the file you uploaded.</p>
                    </div>


                    <div id="files" class="files"></div>
                </div>
            </div>

            <div class="after-important div-hidden">
                <p>Please confirm the patient list.</p>
                <table id="patient-list" class="patient-display div-hidden">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Group</th>
                        <th>Provider</th>
                        <th>Treatment</th>
                        <th>Surgery Date</th>
                        <th>Emergency Contact Name</th>
                        <th>Relationship</th>
                        <th>Emergency Contact E-mail Address</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </g:form>

        <g:form class="warn ui-hidden">

        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
