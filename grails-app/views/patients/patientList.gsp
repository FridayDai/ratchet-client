<!DOCTYPE html>

<g:set var="scriptPath" value="patientListBundle"/>
<g:set var="cssPath" value="patientList"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>
    <div>
        <div class="inner-header">
            <label class="title">PATIENTS</label>
            <a href="#" id="add-patient" class="btn add-patient">Add Patient</a>
        </div>
        <div class="inner-search">
            <div class="search-content clear">
                <div class="filler-content">
                    <label for="selectPatient">PATIENT</label>
                    <select name="selectPatient" id="selectPatient">
                        <option value="1" selected>All Patients</option>
                        <option value="2" >My Patients</option>
                    </select>
                </div>
                <div class="filler-content">
                    <label for="treatmentForSearchPatient" >TREATMENT</label>
                    <input type="text" class="input-group" name="treatmentForSearchPatient" id="treatmentForSearchPatient"/>
                </div>
                <div class="filler-content">
                    <label for="selectSurgeon">SURGEON</label>
                    <input name="selectSurgeon" id="selectSurgeon" class="input-group"/>
                </div>
                <div class="filler-content right-search">
                    <input type="text" placeholder="Patient ID, Name" class="search-input">
                    <span class="search"></span>
                </div>
            </div>
        </div>
        <div class="table-group">
            <table id="patientsTable" class="display">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Last Update</th>
                    <th></th>
                </tr>
                </thead>

            </table>
        </div>

        <g:form class="form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <input id="patientId" name="patientId" type="text" class="input-group" placeholder="ID" required/>
            </div>
            <div class="form-group">
                <input id="firstName" name="firstName" type="text" class="input-group" placeholder="First Name" required/>
            </div>
            <div class="form-group">
                <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Last Name" required/>
            </div>
            <div class="form-group">
                <input id="email" name="email" type="email" class="input-group" placeholder="Email Address" required/>
            </div>
            <div class="form-group">
                <input id="phoneNumber" name="phoneNumber" type="number" maxlength="11" class="input-group" placeholder="Phone Number" required/>
            </div>
            <div class="form-group">
                <input id="selectTreatment" name="selectTreatment" type="text" class="input-group" placeholder="Treatment" required/>
            </div>
            <div class="form-group ">
                <input id="selectStaffs" name="selectStaffs" type="text" class="multi-select clear" placeholder="Staff" required/>
            </div>
            <div class="form-group">
                <input id="surgeryTime" name="surgeryTime" type="text" class="input-group" placeholder="Surgery Time" required/>
            </div>
        </g:form>

        <g:form class="warn ui-hidden">

        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
