<!DOCTYPE html>

<g:set var="scriptPath" value="accountsBundle"/>
<g:set var="cssPath" value="accounts"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>
    <div class="content">
        <div class="inner-header">
            <label class="title">Accounts</label>
            <a href="#" id="add-account" class="btn add-account pull-right">New Account</a>
        </div>
        <div class="inner-search">
            <input type="text" placeholder="Search" class="search-input"/>
            <label>
                Patients
                <input type="search">
            </label>
            <a class="btn pull-right" href="#">Search</a>
        </div>
        <div class="table-group">
            <table id="accountsTable" class="display accounts-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Groups</th>
                    <th></th>
                </tr>
                </thead>
            </table>
        </div>

        <g:form class="accounts-form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <span class="dr">Dr.</span><input id="doctor" name="doctor" type="checkbox" class="input-group doctor"/>
            </div>

            <div class="form-group">
                <input id="firstName" name="firstName" type="text" class="input-group first-name"
                       placeholder="First Name" required/>
            </div>

            <div class="form-group">
                <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Last Name" required/>
            </div>

            <div class="form-group">
                <input id="email" name="email" type="email" class="input-group" placeholder="Email Address" required/>
            </div>

            <div class="form-group">
                <label class="role">
                    <span>Role:</span>
                    <select id="type" name="type">
                        <option value="1">Anesthesiologist</option>
                        <option value="2">Medical Assistant</option>
                        <option value="3">Management</option>
                        <option value="4">Nurse</option>
                        <option value="5">Physical therapists (PTs)</option>
                        <option value="6">Primary Physican</option>
                        <option value="7">Scheduler</option>
                        <option value="8">Surgeon</option>
                    </select>
                </label>
            </div>

            <div class="form-group">
                <div class="group">
                    <span>Groups:</span>
                    <label><input id="patientManagement" name="patientManagement" type="checkbox">Patient Management
                    </label>
                    <label class="account-management"><input id="accountManagement" name="accountManagement"
                                                             type="checkbox">Account Management</label>
                </div>
            </div>

        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
