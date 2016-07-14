<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/patientList.bundle.js"/>
<g:set var="cssPath" value="patientList"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Patients - Ratchet Health</title>
    </head>

    <body>
    <div>
        <div id="header-panel" class="inner-header patients-inner-header">
            <label class="title patient-title">
                <i class="fa fa-bed icon"></i> PATIENTS
            </label>
            <a href="#" id="add-patient" class="btn btn-add add-patient"
               data-account-id="${request.session.accountId}"><span>New Patient</span></a>
            <g:if test="${request.session.accountManagement == true}">
                <a href="#" id="bulk-import" class="btn btn-add bulk-important"><span>Bulk Import</span></a>
            </g:if>
        </div>

        <div id="patients-toolbar" class="inner-search">

            <div class="search-content clear">
                <div class="filler-content combined-search">
                    <input type="text" placeholder="Patient ID, Name, Email" class="search-input" id="search-input">
                    <span class="search" id="search-btn"></span>
                </div>
                <div class="filler-content">
                    <label for="treatmentForSearchPatient" class="select-tip">TREATMENT</label>
                    <input type="text" class="input-group input-auto-search" name="treatmentForSearchPatient"
                           id="treatmentForSearchPatient"/>
                </div>

                <div class="filler-content">
                    <label for="selectSurgeon" class="select-tip">PROVIDER</label>
                    <input type="text" name="selectSurgeon" id="selectSurgeon" class="input-group input-auto-search"/>
                </div>

                <div class="filler-content">
                    <label for="emailStatusFilter" class="select-tip">EMAIL STATUS</label>
                    <input type="text" name="emailStatusFilter" id="emailStatusFilter"
                           class="input-group input-auto-search"/>
                </div>

                <div class="filler-content">
                    <label for="treatmentStatusFilter" class="select-tip">TREATMENT STATUS</label>
                    <input type="text" name="treatmentStatusFilter" id="treatmentStatusFilter"
                           class="input-group input-auto-search"/>
                </div>

                <div class="filler-content">
                    <label for="taskStatusFilter" class="select-tip">TASK STATUS</label>
                    <input type="text" name="taskStatusFilter" id="taskStatusFilter"
                           class="input-group input-auto-search"/>
                </div>
            </div>
        </div>

        <div class="table-group">
            <table id="patientsTable" class="display div-hidden" data-total="${patientList.recordsTotal}"
                   data-pagesize="${pagesize}" data-filtered="${patientList.recordsFiltered}">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Birthday</th>
                    <th>Surgery</th>
                    <th>Task Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <g:each var="patient" in="${patientList.data}" status="i">
                    <tr data-is-dom-data="true">
                        <td>${patient.patientId}</td>
                        <td>${patient.firstName} ${patient.lastName}</td>
                        <td>${patient.email ?: ''}</td>
                        <td>${patient.phoneNumber ?: ''}</td>
                        <td>${patient.birthday ?: ''}</td>
                        <td>${patient.nearestAbsoluteEventDate ?: ''}</td>
                        <td>${patient.taskStatus}</td>
                        <td>${patient.id}</td>
                        <td>${patient.status}</td>
                    </tr>
                </g:each>
                </tbody>
            </table>
        </div>

        <form action="/patients/check-id" method="post" id="patient-id-form" class="form ui-hidden">
            <div class="form-group inline">
                <label class="lbl-group">PATIENT ID<span>*</span></label>
                <input id="new-patient-id" name="identify" type="text" class="input-group input-only-one"
                       placeholder="1234567890" required/>
            </div>

            %{--<label class="form-group required pull-right"><span>*</span>Required field</label>--}%

            <div class="required-field required-padding">
                *Required field
            </div>
        </form>

        <form action="/patients" method="post" id="table-form" class="form ui-hidden new-patient-form">
            <div class="form-group">
                <label class="lbl-group">PATIENT ID<span>*</span></label>

                <div id="patient-id-value" class="patient-id-div"></div>
                <g:hiddenField name="id" id="hidden-id"></g:hiddenField>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">FIRST NAME<span>*</span></label>
                <input id="firstName" name="firstName" type="text" class="input-group input-convert" placeholder="John"
                       required/>

                <div class='replace-input-div' id="firstName-static"></div>
                <a class='icon-edit form-group-edit'></a>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">LAST NAME<span>*</span></label>
                <input id="lastName" name="lastName" type="text" class="input-group input-convert" placeholder="Smith"
                       required/>

                <div class='replace-input-div' id="lastName-static"></div>
                <a class='icon-edit form-group-edit'></a>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">BIRTHDAY<span>*</span></label>
                <input id="birthday" name="birthday" type="text" class="input-group birthday re-position"
                       placeholder="MM/DD/YYYY" required />
                <div class='replace-input-div' id="birthday-static"></div>
                <a class='icon-edit form-group-edit'></a>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">GENDER</label>
                <input id="gender" name="gender" type="text" class="input-group input-convert"
                       placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Male (Optional)"/>

                <div class='replace-input-div' id="gender-static"></div>
                <a class='icon-edit form-group-edit'></a>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">PHONE NUMBER</label>
                <input id="phoneNumber" name="phoneNumberVal" type="tel" class="input-group input-convert"
                       maxlength="14" minlength="14" placeholder="777-777-7777 (Optional)"/>

                <div class='replace-input-div' id="phoneNumber-static"></div>
                <a class='icon-edit form-group-edit'></a>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">EMAIL ADDRESS</label>
                <input id="email" name="email" type="email" class="input-group input-convert"
                       placeholder="john.smith@email.com (Optional)"/>

                <div class='replace-input-div' id="email-static"></div>
                <a class='icon-edit form-group-edit'></a>
                <div class="decline">
                    <input id="emailStatus" name="emailStatus" type="checkbox" value="decline">
                    <label for="emailStatus" class="decline-msg">
                        <span>Patient declined to communicate via email.</span>
                        <span class="warn-msg">(Warning: This cannot be undone.)</span>
                    </label>
                </div>
            </div>



            <h4>CAREGIVER</h4>

            <div class="caregiver-info">
                <div class="form-group inline">
                    <label class="lbl-group">FIRST NAME<span class="caregiver-required">*</span></label>
                    <input id="caregiver-firstName" name="ecFirstName" type="text"
                           class="input-group caregiver-field"
                           placeholder="Grace (Optional)"/>
                </div>

                <div class="form-group inline">
                    <label class="lbl-group">LAST NAME<span class="caregiver-required">*</span></label>
                    <input id="caregiver-lastName" name="ecLastName" type="text"
                           class="input-group caregiver-field"
                           placeholder="Smith (Optional)"/>
                </div>

                <div class="form-group inline">
                    <label class="lbl-group">RELATIONSHIP<span class="caregiver-required">*</span></label>
                    <input type="text" id="relationship" name="relationshipVal" class="input-group caregiver-field"
                           placeholder="Spouse (Optional)">
                </div>

                <div class="form-group inline emr-email">
                    <label class="lbl-group">EMAIL ADDRESS<span class="caregiver-required">*</span></label>
                    <input id="caregiver-email" name="ecEmail" type="email" class="input-group caregiver-field"
                           placeholder="grace@email.com (Optional)"/>
                </div>

                <div class="form-group inline permission-confirm" data-direction="up">
                    <input id="permission-confirm-check" type="checkbox" name="permissionConfirm"
                           class="permission-confirm-check"/>
                    <label for="permission-confirm-check">*
                    Patient would like to release his/her health information to <span id="ec-first-name"></span>.
                    </label>
                </div>
            </div>

            <h4 class="treatment-info-title">TREATMENT INFO</h4>

            <div class="form-group">
                <label class="lbl-group">GROUP<span>*</span></label>
                <input id="selectGroup" name="groupVal" type="text"
                       class="input-group patient-group re-position clear"
                       placeholder="Select group" required/>
            </div>

            <div class="form-group form-provider">
                <label class="lbl-group">PROVIDER<span>*</span></label>
                <input id="selectStaffs" name="staffVal" type="text" class="clear"
                       placeholder="Select provider" required disabled/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">TREATMENT<span>*</span></label>
                <input id="selectTreatment" name="treatmentVal" type="text"
                       class="input-group treatment re-position clear"
                       placeholder="Select treatment" required disabled/>
            </div>

            <div class="form-group inline" id="div-event-time">
                <label class="lbl-group">SURGERY DATE<span>*</span></label>
                <input id="eventTime" name="eventTimeStr" type="text" class="date-time-picker event-time re-position"
                       placeholder="Select surgery date" required disabled/>
            </div>


            <label class="form-group required pull-right"><span>*</span>Required field</label>
        </form>

        <div class="import-form ui-hidden" id="bulk-import-form">
            <div class="import-content">
                <p>Upload a <strong
                        class="strong">.csv</strong> file containing the patients you wish to create. Please note that a maximum of <strong
                        class="strong">100</strong> patients can be included in your file and it may take a few minutes to process.
                </p>
                <g:link action="downloadFile" controller="patients" class="download-file">Download Sample File</g:link>
                <div class="inner-search">
                    <div class="search-content clear">
                        <div class="filler-content">
                            <input type="text" placeholder="Title" class="search-input" autocomplete="false"
                                   name="search-title-input" id="search-title-input" autofocus="autofocus">
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

                <div class="import-file-panel clear">
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

                    <div class="error-tip-box">
                        <p class="error-tip div-hidden"></p>
                    </div>

                    <div id="files" class="files"></div>
                </div>
            </div>

            <div class="after-important div-hidden">
                <div class="part-title">Please confirm the patient list.
                    <div id="duplicated-error" class="alert alert-span error div-hidden">
                        Patient with duplicated treatments.
                    </div>
                </div>

                <table id="patient-list" class="patient-display div-hidden">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Group</th>
                        <th>Provider</th>
                        <th>Treatment</th>
                        <th>Surgery Date</th>
                        <th>Caregiver Name</th>
                        <th>Relationship</th>
                        <th>Caregiver E-mail Address</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
