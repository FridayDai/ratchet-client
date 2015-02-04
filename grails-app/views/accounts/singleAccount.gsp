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

                <div class="lastLoginTime"><g:formatDate date="${new java.util.Date(accountInfo.lastLoginDate)}"
                                                         format="MMM d, yyyy h:mm:ss a"/></div>

                <a href="#" id="edit-account" class="btn-edit" data-account-id="${accountInfo.id}">
                    <div class="icon-edit"></div>
                </a>
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
                    <span class="account-role" id="accountRole">${StatusCodeConstants.ACCOUNT_ROLE[accountInfo.type - 1]}</span>
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

        </div>
    </div>


    <g:form class="update-account-form ui-hidden" id="updateAccount" name="updateAccount">

        <div class="form-group">
            <span class="dr">Dr.</span><input id="doctor" name="doctor" type="checkbox" class="input-group doctor"/>
        </div>

        <div class="form-group">
            <input id="firstName" name="firstName" type="text" class="input-group first-name"
                   placeholder="First Name" required/>
        </div>

        <div class="form-group">
            <input id="lastName" name="lastName" type="text" class="input-group" placeholder="Last Name" required/>
        </div>

        <div class="form-group">
            <input id="email" name="email" type="email" class="input-group" placeholder="Email Address" readonly/>
        </div>

        <div class="form-group">
            <label class="role">
                <span>Role:</span>
                <select id="accountType" name="accountType">
                    <option value="1">Anesthesiologist</option>
                    <option value="2">Medical Assistant</option>
                    <option value="3">Management</option>
                    <option value="4">Nurse</option>
                    <option value="5">Physical therapists (PTs)</option>
                    <option value="6">Primary Physician</option>
                    <option value="7">Scheduler</option>
                    <option value="8">Surgeon</option>
                </select>
            </label>
        </div>

        <div class="form-group">
            <div class="group">
                <span>Groups:</span>
                <label><input id="patientManagement" name="patientManagement" type="checkbox">Patient Management
                </label>
                <label class="account-management"><input id="accountManagement" name="accountManagement"
                                                         type="checkbox">Account Management</label>
            </div>
        </div>

    </g:form>
    </body>
    </html>
</g:applyLayout>

