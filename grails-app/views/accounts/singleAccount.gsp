<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>
<!DOCTYPE html>

<g:set var="scriptPath" value="accountsBundle"/>
<g:set var="cssPath" value="singleAccount"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>
    <div class="content">

        <div class="content-head">

            <p>ACCOUNT</p>

            <a href="#" class="btn-close">Close</a>
        </div>

        <div class="middle-content">
            <div class="name-info">

                <span class="account-doctor row" id="isDoctor">
                    <g:if test="${accountInfo.doctor}">
                        ${StatusCodeConstants.ACCOUNT_DOCTOR}
                    </g:if>
                </span>

                <span class="account-name account-first-name" id="accountFirstName">${accountInfo.firstName}</span>
                <span class="account-name account-last-name" id="accountLastName">${accountInfo.lastName}</span>

                <span class="icons">
                    <a class="triangle-right" id="triangle"></a>

                    <a class="btn btn-deactive displaynone" id="btn-deactivate"
                       data-account-id="${accountInfo.id}">Deactivate</a>
                </span>

            </div>

            <a href="#" id="edit-account" class="btn-edit" data-account-id="${accountInfo.id}">
            </a>
        </div>


        <div class="account-info">

            <table class="account-table">
                <tr>
                    <td class="bg-color" colspan="2">ID: ${accountInfo.id}</td>
                </tr>

                <tr class="tr-border">
                    <td class="td-width"><div class="email-logo"></div></td>
                    <td><span class="account-email">${accountInfo.email}</span></td>
                </tr>

                <tr class="tr-border">
                    <td class="td-width">Status</td>
                    <td>
                        <span>${StatusCodeConstants.ACCOUNT_STATUS[accountInfo.status - 1]}</span>
                        <g:if test="${StatusCodeConstants.ACCOUNT_STATUS[accountInfo.status -1 ] == "Inactive"}">
                            <div class="inline div-invite">
                                <button id="invite-account" class="btn btn-invite" data-id="${accountInfo.id}">Invite Again</button>
                            </div>
                        </g:if>
                    </td>
                </tr>

                <tr class="tr-border">
                    <td class="td-width">Role</td>
                    <td><span class="account-role"
                              id="accountRole">${StatusCodeConstants.ACCOUNT_ROLE[accountInfo.type - 1]}</span>
                    </td>
                </tr>


                <tr class="tr-border">
                    <td class="td-width">Group</td>
                    <td><span class="accountManage" id="isAccountManage">
                        <g:if test="${accountInfo.accountManagement}">
                            ${StatusCodeConstants.ACCOUNT_ACCOUNTS_M}
                        </g:if>
                    </span></td>
                </tr>


                <tr>
                    <td class="bg-color" colspan="2">
                        Last Login:
                        <g:formatDate date="${new java.util.Date(accountInfo.lastLoginDate)}"
                                                 timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                                 format="MMM d, yyyy h:mm a"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>


    <g:form class="update-account-form ui-hidden" id="updateAccount" name="updateAccount">

        <div class="form-group">
            <input id="doctor" name="doctor" type="checkbox" class="input-group doctor">
            <label class="dr">Dr.</label>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">FIRST NAME<span>*</span></label>
            <input id="firstName" name="firstName" type="text" class="input-group first-name" placeholder="John"
                   required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">LAST NAME<span>*</span></label>
            <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Smith" required/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">EMAIL ADDRESS</label>
            <input id="email" name="email" type="email" class="input-group readonly-email"
                   placeholder="john.smith@email.com"
                   readonly/>
        </div>

        <div class="form-group inline role-select">
            <label class="lbl-group role">ROLE<span>*</span></label>
            <select id="accountType" name="accountType" required>
                <option value="1">Anesthesiologist</option>
                <option value="2">Medical Assistant</option>
                <option value="3">Management</option>
                <option value="4">Nurse</option>
                <option value="5">Physical therapists (PTs)</option>
                <option value="6">Primary Physician</option>
                <option value="7">Scheduler</option>
                <option value="8">Surgeon</option>
            </select>
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

    <g:form class="warn ui-hidden">

    </g:form>
    </body>
    </html>
</g:applyLayout>

