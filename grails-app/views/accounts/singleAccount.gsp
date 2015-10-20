<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>
<g:set var="scriptPath" value="bundles/accountsBundle"/>
<g:set var="cssPath" value="singleAccount"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title><g:if
                test="${accountInfo.doctor}">${StatusCodeConstants.ACCOUNT_DOCTOR}</g:if>${accountInfo.firstName} ${accountInfo.lastName} - Ratchet Health</title>
    </head>

    <body>
    <div class="content">

        <div class="content-head inner-header">
            <label class="title account">ACCOUNT</label>
            <a href="#" class="btn-close">Close</a>
        </div>
        %{--<div class="content-head">--}%

        %{--<p class="account">ACCOUNT</p>--}%

        %{--<a href="#" class="btn-close">Close</a>--}%
        %{--</div>--}%

        <div class="middle-content">
            <div class="name-info" id="account-name-info">

                <span class="account-doctor row" id="isDoctor">
                    <g:if test="${accountInfo.doctor}">
                        ${StatusCodeConstants.ACCOUNT_DOCTOR}
                    </g:if>
                </span>

                <span class="account-name account-first-name" id="accountFirstName">${accountInfo.firstName}</span>
                <span class="account-name account-last-name" id="accountLastName">${accountInfo.lastName}</span>

                <g:if test="${accountInfo.npi}">
                    <span id="accountInfo-npi" class="account-npi">NPI: <span >${accountInfo.npi}</span></span>
                </g:if>

            </div>

            <a href="#" id="edit-account" class="btn-edit" data-account-id="${accountInfo.id}">
            </a>
        </div>


        <div class="account-info">

            <table class="account-table">
                <tr class="tr-border">
                    <td class="bg-color" colspan="2">ID: ${accountInfo.id}</td>
                </tr>

                <tr class="tr-border">
                    <td class="td-width"><div class="email-logo"></div></td>
                    <td><span class="account-email">${accountInfo.email}</span></td>
                </tr>

                <tr class="tr-border">
                    <td class="td-width">Status</td>
                    <td>
                        <g:if test="${StatusCodeConstants.EMAIL_STATUS[accountInfo.emailStatus - 1] == "UNINVITED" || StatusCodeConstants.EMAIL_STATUS[accountInfo.emailStatus - 1] == "INVITED"}">
                            <span class="email-status span-invited" id="span-invited">UNVERIFIED</span>

                            <div class="inline div-invite">
                                <button id="invite-account" class="btn" data-id="${accountInfo.id}">Invite Again</button>
                            </div>
                        </g:if>

                        <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[accountInfo.emailStatus - 1] == "VERIFIED"}">
                            <g:if test="${StatusCodeConstants.STAFF_STATUS[accountInfo.staffStatus - 1] == "INACTIVE"}">
                                <span class="email-status span-active span-activate-action" id="span-active">INACTIVE</span>

                                <a class="btn activate-action" id="btn-activate"
                                   data-account-id="${accountInfo.id}">Activate</a>
                            </g:if>
                            <g:else>
                            <span class="email-status span-deactive span-activate-action"
                                  id="span-deactive">ACTIVE</span>

                            <a class="btn activate-action" id="btn-deactivate"
                               data-account-id="${accountInfo.id}">Deactivate</a>
                            </g:else>
                        </g:elseif>

                        <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[accountInfo.emailStatus - 1] == "BOUNCED"}">
                            <span class="email-status non-existent" id="span-active">NONEXISTENT</span>
                        </g:elseif>
                    </td>
                </tr>

                <tr class="tr-border">
                    <td class="td-width">Provider</td>
                    <td><span class="account-role"
                              id="accountRole"
                              data-id="${accountInfo.type}">${StatusCodeConstants.ACCOUNT_ROLE[accountInfo.type - 1]}</span>
                    </td>
                </tr>

                <tr class="tr-border">
                    <td class="td-width">Permission</td>
                    <td><span class="accountManage" id="isAccountManage">
                        <g:if test="${accountInfo.accountManagement}">
                            ${StatusCodeConstants.ACCOUNT_ACCOUNTS_M}
                        </g:if>
                    </span></td>
                </tr>


                <tr class="tr-border">
                    <td class="td-width">Groups</td>
                    <td><span class="groups"
                              id="groups" data-ids="${accountInfo.groups}"><g:if test="${accountInfo.groups}"><g:each
                                in="${accountInfo.groups}"
                                var="group"><p>${group.name}</p></g:each></g:if>
                    </span></td>
                </tr>

                <tr>
                    <td class="bg-color" colspan="2">
                        Last Login:
                        <g:if test="${accountInfo.lastLoginDate}">
                            <g:formatDate date="${new java.util.Date(accountInfo.lastLoginDate)}"
                                          timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                          format="MMM d, yyyy h:mm a"/>
                        </g:if>
                    </td>
                </tr>
            </table>
        </div>
    </div>


    <g:form class="accounts-form ui-hidden" id="updateAccount" name="updateAccount">

        <div class="form-group">
            <label class="checkbox">
                <input id="doctor" name="doctor" type="checkbox">Dr.
            </label>
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

        <div class="form-group">
            <label class="lbl-group">EMAIL ADDRESS</label>
            <input id="email" name="email" type="email" class="input-group readonly-email"
                   placeholder="john.smith@email.com"
                   readonly/>
        </div>

        <div class="form-group inline">
            <label class="lbl-group">PROVIDER</label>

            <div class="group">
                <label class="checkbox">
                    <input id="accountProvider" name="accountProvider" type="checkbox">Yes
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

        <div class="form-group inline hidden">
            <label class="lbl-group">NPI<span>*</span></label>
            <input id="npi" name="npi" type="text" class="input-group" placeholder="0123456789" maxlength="10"/>
        </div>

        <div class="form-group">
            <label class="lbl-group">GROUP<span class="hidden">*</span></label>
            <input id="groupSelect" name="selectGroup" type="text" class="input-group patient-group clear"
                   placeholder="Select group"/>
        </div>

        <label class="form-group required pull-right"><span>*</span>Required field</label>

    </g:form>

    </body>
    </html>
</g:applyLayout>

