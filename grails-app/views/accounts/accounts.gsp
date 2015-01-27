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
                    <th>Last Update</th>
                </tr>
                </thead>

            </table>
        </div>

        <g:form class="accounts-form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <label>
                    <input type="checkbox"/>
                    Dr.
                </label>
            </div>


            <div class="form-group">
                <label>
                    * First Name:
                    <input id="firstName" name="firstName" type="text" class="" placeholder="First Name" required/>
                </label>
            </div>

            <div class="form-group">
                <label>
                    * Last Name:
                    <input id="lastName" name="lastName" type="text" class="" placeholder="Last Name" required/>
                </label>
            </div>

            <div class="form-group">
                <label>
                    * Email Address:
                    <input id="email" name="email" type="email" class="" placeholder="Email Address" required/>
                </label>
            </div>

            <div class="form-group">
                <label>
                    * Role:
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </label>
            </div>

            <div class="form-group">
                <div>
                    * Group:
                    <label>
                        <input type="checkbox" name="group">
                        Patient Management
                    </label>
                </div>
                <label>
                    <input type="checkbox" name="group">
                    Account Management
                </label>
            </div>

        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
