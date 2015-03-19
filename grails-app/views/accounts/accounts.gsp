<!DOCTYPE html>

<g:set var="scriptPath" value="accountsBundle"/>
<g:set var="cssPath" value="accounts"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to Ratchet Health</title>
    </head>

    <body>
    <div class="content">
        <div class="inner-header">
            <label class="title">ACCOUNTS</label>
            <a href="#" id="add-account" class="btn add-account pull-right">New Account</a>
        </div>

        <div class="inner-search">
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
                </tr>
                </thead>
                <tbody>
                <g:each var="account" in="${accountList.data}" status="i">
                    <tr data-is-dom-data="true">
                        <td>${account.id}</td>
                        <td>${account.firstName} ${account.lastName}</td>
                        <td>${account.email}</td>
                        <td>${account.lastUpdateDate}</td>
                        <td>${account.id}</td>
                    </tr>
                </g:each>
                </tbody>
            </table>
        </div>

        <g:form class="accounts-form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <input id="doctor" name="doctor" type="checkbox" class="input-group doctor"/><span class="dr">Dr.</span>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">FIRST NAME<span>*</span></label>
                <input id="firstName" name="firstName" type="text" class="input-group first-name"
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
                <label class="lbl-group">ROLE<span>*</span></label>
                <input id="type" name="type" class="input-group" required>
            </div>

            <div class="form-group">
                <label class="lbl-group">GROUP<span>*</span></label>

                <div class="group">
                    <label class="account-management">
                        <input id="accountManagement" name="accountManagement" type="checkbox">Account Management
                    </label>
                </div>
            </div>

        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
