<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>
<!DOCTYPE html>

<g:set var="scriptPath" value="accountsBundle"/>
<g:set var="cssPath" value="singleAccount"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to Ratchet Health</title>
    </head>

    <body>
    <div class="content">

        <div class="content-head">
            <p>PROFILE</p>
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


            <a href="#" id="changePassword" class="btn btn-change-password">Change Password</a>
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
                    <td><span>${StatusCodeConstants.ACCOUNT_STATUS[accountInfo.status - 1]}</span>
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

                <tr>
                    <td class="bg-color" colspan="4">
                        Last Login:
                        <g:formatDate date="${new java.util.Date(accountInfo.lastLoginDate)}"
                                      timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                      format="MMM d, yyyy h:mm a"/>
                    </td>
                </tr>
            </table>

            <div class="btn-bottom">
                <a href="/logout" class="btn-edit-patient log-out">
                    <span class="color btn-logout">Log out</span>
                </a>
            </div>

        </div>
    </div>


    <g:form class="update-password ui-hidden" id="updatePassword" name="updatePassword">

        <div class="form-group password-group">
            <label class="lbl-group">OLD PASSWORD<span>*</span></label>
            <input id="oldPass" name="oldPass" type="password" class="input-group"
                   placeholder="Enter old password"
                   required/>
        </div>

        <div class="form-group password-group">
            <label class="lbl-group">NEW PASSWORD<span>*</span></label>
            <input id="newPass" name="newPass" type="password" class="input-group"
                   placeholder="Enter new password"
                   required/>
        </div>

        <div class="form-group password-group">
            <label class="lbl-group">CONFIRM PASSWORD<span>*</span></label>
            <input id="confirmPass" name="confirmPass" type="password" class="input-group"
                   placeholder="Enter new password again"
                   required/>
        </div>
        <label class="form-group required pull-right"><span>*</span>Required field</label>
    </g:form>
    </body>
    </html>
</g:applyLayout>

