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
            <a href="#" class="btn-back">
                <div class="icon-back"></div>
            </a>

            <p>Accounts</p>
        </div>

        <div class="account-info">
            <div class="account-top-info clear">
                <div class="account-id row">ID: ${accountInfo.id}</div>

                <div class="account-name row">
                    <span class="account-profile"><img src="${assetPath(src: 'account_profile.png')}"></span>

                    <g:if test="${accountInfo.doctor}">
                        <span class="account-doctor row" id="isDoctor">
                            ${StatusCodeConstants.ACCOUNT_DOCTOR}
                        </span>
                    </g:if>

                    <span class="account-name account-first-name" id="accountFirstName">${accountInfo.firstName}</span>
                    <span class="account-name account-last-name" id="accountLastName">${accountInfo.lastName}</span>
                </div>

                <div class="account-email row" id="accountEmail">${accountInfo.email}</div>

                <div class="lastLoginTime">
                    <span>
                        Last Login:
                    </span><g:formatDate date="${new java.util.Date(accountInfo.lastLoginDate)}"
                                         format="MMM d, yyyy h:mm:ss a"/></div>
            </div>

            <div class="account-bottom-info clear">
                <div class="account-status row">
                    <span>Status:</span>
                    ${StatusCodeConstants.ACCOUNT_STATUS[accountInfo.status - 1]}

                    <g:if test="${accountInfo.status == 2}">
                        <button class="btn" id="invite-account" data-account-id="${accountInfo.id}">
                            Invite again
                        </button>
                    </g:if>

                </div>

                <div class="account-type row">
                    <span>Role:</span>
                    <span class="account-role"
                          id="accountRole">${StatusCodeConstants.ACCOUNT_ROLE[accountInfo.type - 1]}</span>
                </div>

                <div class="account-group row"><span>Group:</span>

                    <span class="patientManage" id="isPatientManage">
                        <g:if test="${accountInfo.patientManagement}">
                            ${StatusCodeConstants.ACCOUNT_PATIENTS_M}
                        </g:if>
                    </span>

                    <span class="accountManage" id="isAccountManage">
                        <g:if test="${accountInfo.accountManagement}">
                            ${StatusCodeConstants.ACCOUNT_ACCOUNTS_M}
                        </g:if>
                    </span>

                </div>
            </div>

            <a href="#" id="changePassword" class="btn">Change Password</a>

            <a href="/logout" class="btn-edit-patient">
                <span class="icon-edit"></span>
                <span>Log out</span>
            </a>

        </div>
    </div>


    <g:form class="update-password ui-hidden" id="updatePassword" name="updatePassword">

        <div class="form-group">
            <label>OLD PASSWORD</label>
            <input id="oldPass" name="oldPass" type="password" class="input-group"
                   placeholder="Enter old password" required/>
        </div>

        <div class="form-group">
            <label>NEW PASSWORD</label>
            <input id="newPass" name="newPass" type="password" class="input-group"
                   placeholder="Enter new password" required/>
        </div>

        <div class="form-group">
            <label>CONFIRM PASSWORD</label>
            <input id="confirmPass" name="confirmPass" type="password" class="input-group"
                   placeholder="Enter new password again" required/>
        </div>

    </g:form>
    </body>
    </html>
</g:applyLayout>

