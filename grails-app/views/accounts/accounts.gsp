<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/accounts.bundle.js"/>
<g:set var="cssPath" value="accounts"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Accounts - Ratchet Health</title>
    </head>

    <body>
    <div class="content">
        <div class="inner-header" id="header-panel">
            <label class="title account-icon">ACCOUNTS</label>
            <a href="#" id="add-account" class="btn btn-add add-account"><span>New Account</span></a>
        </div>

        <div class="inner-search" id="accounts-toolbar">
            <div class="search-content clear">
                <div class="filler-content pull-right">
                    <input type="text" placeholder="Account ID, Name" class="search-input" id="search-input">
                    <span class="search" id="search-btn"></span>
                </div>
            </div>
        </div>

        <div class="table-group">
            <table id="accountsTable" class="display accounts-table" data-total="${accountList.recordsTotal}"
                   data-filtered="${accountList.recordsFiltered} " data-pagesize="${pagesize}">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Last Update</th>
                    <th></th>
                    <th>isDoctor</th>
                </tr>
                </thead>
                <tbody>
                <g:each var="account" in="${accountList.data}" status="i">
                    <tr data-is-dom-data="true">
                        <td>${account.id}</td>
                        <td>
                            ${account.firstName} ${account.lastName}
                        </td>
                        <td>${account.email}</td>
                        <td>${account.lastUpdateDate}</td>
                        <td>${account.id}</td>
                        <td>${account.doctor}</td>
                        <td>${account.firstName}</td>
                        <td>${account.lastName}</td>
                    </tr>
                </g:each>
                </tbody>
            </table>
        </div>

        <form class="accounts-form ui-hidden" id="add-account-form" action="/accounts" method="post">
            <div class="form-group">
                <label class="checkbox">
                    <input id="doctor" name="doctorRaw" type="checkbox">Dr.
                </label>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">FIRST NAME<span>*</span></label>
                <input id="firstName" name="firstName" type="text" class="input-group"
                       placeholder="John" required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">LAST NAME<span>*</span></label>
                <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Smith" required/>
            </div>

            <div class="form-group">
                <label class="lbl-group">EMAIL ADDRESS<span>*</span></label>
                <input id="email" name="email" type="email" class="input-group" placeholder="john_smith@email.com"
                       required/>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">PROVIDER</label>

                <div class="provider group">
                    <label class="checkbox">
                        <input id="provider" name="providerRaw" type="checkbox">Yes
                    </label>
                </div>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">PERMISSION</label>

                <div class="permission group">
                    <label class="checkbox">
                        <input id="accountManagement" name="accountManagementRaw" type="checkbox">Administrator
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label class="lbl-group">GROUP<span class="group-require-mark hidden">*</span></label>
                <input id="selectGroup" name="groupId" type="text" class="plugin-select-box input-group patient-group clear"
                       placeholder="Select group"/>
            </div>

            <label class="form-group required pull-right"><span>*</span>Required field</label>
        </form>

    </div>
    </body>
    </html>
</g:applyLayout>
