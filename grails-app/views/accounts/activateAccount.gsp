<!DOCTYPE html>

<g:set var="scriptPath" value="accountsBundle"/>
<g:set var="cssPath" value="login"/>
<g:applyLayout name="form">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>

    <div class="site-wrapper">
        <div class="cover-container">
            <div class="image-ratchet-health cover-inner-header"></div>
            <g:form class="form create-password-form" controller="accounts" method="post" action="confirmPassword">

                <div class="form-style-content">
                    <div>
                        <span>Hi</span>
                        <span>${firstName}!</span>
                    </div>

                    <div>
                        Please create a new password to access Ratchet
                    </div>

                    <div class="input-combination">
                        <div class="align-left">NEW PASSWORD</div>
                        <input name="password" type="password" id="password" class="input-control"
                               placeholder="Enter Password" required/>
                    </div>

                    <div class="input-combination">
                        <div class="align-left">CONFIRM PASSWORD</div>
                        <input name="confirmPassword" type="password" id="confirmPassword" class="input-control"
                               placeholder="CONFIRM PASSWORD"
                               required/>
                    </div>

                    <input type="hidden" name="code" value="${code}"/>
                    <input type="hidden" name="hasProfile" value="${hasProfile}"/>
                </div>

                <div class="align-center cover-inner-footer">
                    <button type="submit" class="btn btn-submit" id='johnRat'>Join Ratchet</button>
                </div>
            </g:form>
        </div>
    </div>

    </body>
    </html>
</g:applyLayout>
