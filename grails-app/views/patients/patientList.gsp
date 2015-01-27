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
            <label class="title">Patients</label>
            <a href="#" id="add-patient" class="add-patient">Add Patient</a>
        </div>
        <div class="inner-search">
            <input type="text" placeholder="Search" class="search-input"/>
            <label>
                Patients
                <input type="search">
            </label>
            <a class="btn pull-right" href="#">Search</a>
        </div>
        <div class="provider-list-table">
            <table id="patientsTable" class="display">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Profile Photo</th>
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
