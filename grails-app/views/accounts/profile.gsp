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
            <p>PROFILE</p>
        </div>

        <div class="account-info">
            <div class="account-top-info clear">
                <g:if test="${StatusCodeConstants.ACCOUNT_ROLE[accountInfo.type - 1] == "Surgeon"}">
                    <div class="surgeon-logo"><img src='/assets/surgeon_logo.png'/></div>
                </g:if>

                <div class="account-name">
                %{--<span class="account-profile"><img src="${assetPath(src: 'account_profile.png')}"></span>--}%

                    <g:if test="${accountInfo.doctor}">
                        <span class="account-doctor row account-color" id="isDoctor">
                            ${StatusCodeConstants.ACCOUNT_DOCTOR}
                        </span>
                    </g:if>

                    <span class="account-first-name account-color"
                          id="accountFirstName">${accountInfo.firstName}</span>
                    <span class="account-last-name account-color"
                          id="accountLastName">${accountInfo.lastName}</span>
                    <span class="account-id color">ID: ${accountInfo.id}</span>
                </div>

                <div class="account-email account-color" id="accountEmail">${accountInfo.email}</div>

                <div class="lastLoginTime color">
                    <span>
                        Last Login:
                    </span><g:formatDate date="${new java.util.Date(accountInfo.lastLoginDate)}"
                                         format="MMM d, yyyy h:mm:ss a"/></div>
            </div>

            <div class="account-bottom-info clear">
                <div class="account-status account-space">
                    <span class="color">Status:</span>
                    <span class="account-color">${StatusCodeConstants.ACCOUNT_STATUS[accountInfo.status - 1]}</span>

                    %{--<g:if test="${accountInfo.status == 2}">--}%
                    %{--<button class="btn" id="invite-account" data-account-id="${accountInfo.id}">--}%
                    %{--Invite again--}%
                    %{--</button>--}%
                    %{--</g:if>--}%

                </div>

                <div class="account-type account-space">
                    <span class="color">Role:</span>
                    <span class="account-role account-color"
                          id="accountRole">${StatusCodeConstants.ACCOUNT_ROLE[accountInfo.type - 1]}</span>
                </div>

                <div class="account-group account-space"><span class="color">Group:</span>

                    <span class="patientManage account-color" id="isPatientManage">
                        <g:if test="${accountInfo.patientManagement}">
                            ${StatusCodeConstants.ACCOUNT_PATIENTS_M}
                        </g:if>
                    </span>

                    <span class="accountManage account-color" id="isAccountManage">
                        <g:if test="${accountInfo.accountManagement}">
                            ${StatusCodeConstants.ACCOUNT_ACCOUNTS_M}
                        </g:if>
                    </span>

                </div>
            </div>

            <a href="#" id="changePassword" class="btn btn-change-password">Change Password</a>

            <div class="btn-bottom">
                <a href="/logout" class="btn-edit-patient log-out">
                    %{--<span class="icon-edit"></span>--}%
                    <span class="color btn-logout">Log out</span>
                </a>
            </div>

        </div>
    </div>


    <g:form class="update-password ui-hidden" id="updatePassword" name="updatePassword">

        <div class="form-group">
            <label class="lbl-group">OLD PASSWORD</label>
            <input id="oldPass" name="oldPass" type="password" class="input-group"
                   placeholder="Enter old password"
                   required/>
        </div>

        <div class="form-group">
            <label class="lbl-group">NEW PASSWORD</label>
            <input id="newPass" name="newPass" type="password" class="input-group"
                   placeholder="Enter new password"
                   required/>
        </div>

        <div class="form-group">
            <label class="lbl-group">CONFIRM PASSWORD</label>
            <input id="confirmPass" name="confirmPass" type="password" class="input-group"
                   placeholder="Enter new password again"
                   required/>
        </div>
    </g:form>
    </body>
    </html>
</g:applyLayout>

