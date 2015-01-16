<!DOCTYPE html>

<g:set var="scriptPath" value="patientListBundle"/>
<g:set var="cssPath" value="patientList"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>
    <div class="content">
        <h3 class="inline">patient</h3>
        <a href="#" id="add-patient" class="btn add-patient">New Patient</a>
        %{--<a href="providers/detail">View</a>--}%
        <a href="/treatment/task">Task</a>


        <div class="provider-list-table">
            <table id="patientsTable" class="display">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Treatments</th>
                </tr>
                </thead>

            </table>
        </div>

        <g:form class="form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <input id="emid" name="emid" type="text" class="input-group" placeholder="ID" required/>
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
                <input id="phoneNumber" name="phoneNumber" type="text" class="input-group" placeholder="Phone Number" required/>
            </div>
            <div class="form-group">
                <input id="treatments" name="treatments" type="text" class="input-group" placeholder="Treatments" required/>
            </div>

        </g:form>

        <g:form class="warn ui-hidden">

        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
