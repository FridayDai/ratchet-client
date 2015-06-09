<!DOCTYPE html>

<g:set var="scriptPath" value="accountsBundle"/>
<g:set var="cssPath" value="accounts"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Accounts - Ratchet Health</title>
    </head>

    <body>
    <div class="content">
        <div class="inner-header">
            <label class="title account-icon">ACCOUNTS</label>
            <a href="#" id="add-account" class="btn btn-add add-account"><span>New Account</span></a>
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
                    </tr>
                </g:each>
                </tbody>
            </table>
        </div>
        <span id="isDoctorImg" class="ui-hidden" data-img-path="${assetPath(src: 'isDoctor.png')}"></span>
        <g:form class="accounts-form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <label class="checkbox">
                    <input id="doctor" name="doctor" type="checkbox">Dr.
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

        %{--<div class="form-group inline">--}%
        %{--<label class="lbl-group">ROLE<span>*</span></label>--}%
        %{--<input id="type" name="type" class="input-group" required>--}%
        %{--</div>--}%

            <div class="form-group inline">
                <label class="lbl-group">PROVIDER</label>

                <div class="group">
                    <label class="checkbox">
                        <input id="provider" name="provider" type="checkbox">Yes
                    </label>
                </div>
            </div>

            <div class="form-group inline">
                <label class="lbl-group">PERMISSION</label>

                <div class="group">
                    <label class="checkbox">
                        <input id="accountManagement" name="accountManagement" type="checkbox">Administrator
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label class="lbl-group">GROUP<span class="hidden">*</span></label>
                <input id="selectGroup" name="selectGroup" type="text" class="input-group patient-group clear"
                       placeholder=""/>
            </div>

            <label class="form-group required pull-right"><span>*</span>Required field</label>
        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
