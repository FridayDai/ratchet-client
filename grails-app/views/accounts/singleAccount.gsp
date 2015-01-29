<!DOCTYPE html>

<g:set var="scriptPath" value="singleAccountBundle"/>
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

                    <span class="account-doctor row">
                        <g:if test="${accountInfo.doctor}">
                            ${com.xplusz.ratchet.StatusCodeConstants.ACCOUNT_DOCTOR}
                        </g:if>
                    </span>
                    <span class="account-name"> ${accountInfo.firstName} ${accountInfo.lastName}</span>
                </div>
                <div class="account-email row">${accountInfo.email}</div>
            </div>

            <div class="account-bottom-info clear">
                <div class="account-status row"><span>Status: </span>${com.xplusz.ratchet.StatusCodeConstants.ACCOUNT_STATUS[accountInfo.status-1]}</div>
                <div class="account-type row"><span>Role: </span>${com.xplusz.ratchet.StatusCodeConstants.ACCOUNT_ROLE[accountInfo.type-1]}</div>
                <div class="account-group row"><span>Group:</span>
                    <g:if test="${accountInfo.patientManagement}">
                        ${com.xplusz.ratchet.StatusCodeConstants.ACCOUNT_PATIENTS_M}
                    </g:if>
                    <g:if test="${accountInfo.accountManagement}">
                        ${com.xplusz.ratchet.StatusCodeConstants.ACCOUNT_ACCOUNTS_M}
                    </g:if>
            </div>
        </div>

    </div>
    </body>
    </html>
</g:applyLayout>

