<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>
<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/profile.bundle.js"/>
<g:set var="cssPath" value="profile"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title><g:if
                test="${accountInfo.doctor}">${StatusCodeConstants.ACCOUNT_DOCTOR}</g:if>${accountInfo.firstName} ${accountInfo.lastName} - Ratchet Health</title>
    </head>

    <body>
    <div class="content">

        <div class="inner-header">
            <label class="title profile-icon">
                <i class="fa fa-user icon"></i> PROFILE
            </label>
        </div>

        <div class="middle-content">
            <div class="name-info name">

                <span class="account-doctor row" id="isDoctor">
                    <g:if test="${accountInfo.doctor}">
                        ${StatusCodeConstants.ACCOUNT_DOCTOR}
                    </g:if>
                </span>

                <span class="account-name account-first-name" id="accountFirstName">${accountInfo.firstName}</span>
                <span class="account-name account-last-name" id="accountLastName">${accountInfo.lastName}</span>
            </div>


            <a href="#" id="changePassword" class="btn btn-change-password"
               data-account-id="${accountInfo.id}">Change Password</a>
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
                            <span>UNVERIFIED</span>
                        </g:if>
                        <g:else><span>${StatusCodeConstants.EMAIL_STATUS[accountInfo.emailStatus - 1]}</span></g:else>
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
                              id="Groups"><g:if test="${accountInfo.groups}"><g:each in="${accountInfo.groups}"
                                                                                     var="group"><p>${group.name}</p></g:each></g:if>
                    </span></td>
                </tr>

                <tr class="tr-border">
                    <td class="td-width">Enable Alert</td>
                    <td><span class="enable-alerts" id="enableAlertField">
                        ${accountInfo.enableAlert == true ? 'Yes' : 'No'}
                    </span></td>
                </tr>

                <tr>
                    <td class="bg-color" colspan="4">
                        Last Login:
                        <g:formatDate date="${new java.util.Date(accountInfo.lastLoginDate)}"
                                      timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                      format="MMM d, yyyy h:mm a"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>


    <g:form class="update-password ui-hidden" id="updatePassword" name="updatePassword">

        <div class="form-group password-group">
            <label class="lbl-group">OLD PASSWORD<span>*</span></label>
            <input id="oldPass" name="oldPassword" type="password" class="input-group"
                   placeholder="Enter old password"
                   required/>

            %{--<div class="error-area error hide" id="old-password-error">--}%
                %{--Old password is incorrect.--}%
            %{--</div>--}%
        </div>

        <div class="form-group password-group new-password">
            <label class="lbl-group">NEW PASSWORD<span>*</span></label>
            <input id="newPass" name="password" type="password" class="input-group"
                   placeholder="Enter new password"/>
        </div>

        <div class="form-group password-group confirm-password">
            <label class="lbl-group">CONFIRM PASSWORD<span>*</span></label>
            <input id="confirmPass" name="confirmPassword" type="password" class="input-group"
                   placeholder="Enter new password again"
                   required/>
        </div>

        %{--<div class="error-area error hide error-password" id="confirmPass-error">--}%
            %{--Passwords do not match, please retype.--}%
        %{--</div>--}%
        <label class="form-group required pull-right"><span>*</span>Required field</label>

    </g:form>
    </body>
    </html>
</g:applyLayout>

