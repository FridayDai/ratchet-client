<!DOCTYPE html>

<g:set var="scriptPath" value="accountsBundle"/>
<g:set var="cssPath" value="activateAccount"/>
<g:applyLayout name="form">
    <html>
    <head>
        <title>Welcome to Ratchet Health</title>
    </head>

    <body>

    <div class="site-wrapper">
        <div class="cover-container">
            <div class="image-ratchet-health cover-inner-header"></div>
            <g:form class="form create-password-form" controller="accounts" method="post" action="confirmPassword">

                <div class="form-style-content">
                    <div class="greeting color-black align-center">
                        <span>Hi</span>
                        <span>${staff.firstName}!</span>
                    </div>

                    <div class="info color-black align-center">
                        Welcome to Ratchet Health!
                    </div>

                    <div class="input-container">
                        <div class="input-combination">
                            <div class="align-left">NEW PASSWORD</div>
                            <input name="password" type="password" id="password" class="input-control"
                                   placeholder="Enter Password" required/>
                        </div>

                        <div class="input-combination">
                            <div class="align-left">CONFIRM PASSWORD</div>
                            <input name="confirmPassword" type="password" id="confirmPassword" class="input-control"
                                   placeholder="Confirm Password"
                                   required/>
                        </div>

                        <div class="error-area error">
                        </div>
                    </div>

                    <input type="hidden" name="code" value="${code}"/>
                    <input type="hidden" name="hasProfile" value="${staff.hasProfile}"/>
                </div>

                %{--<div class="align-center cover-inner-footer">--}%
                    %{--<div class="terms-service color-black">--}%
                        %{--You agree to our <a href="/terms_of_service" target="_blank" class="dark-link" >Terms of Service</a> upon creating account--}%
                    %{--</div>                --}%
                    %{--<button type="submit" class="btn btn-submit" id='johnRat'>Activate Account</button>--}%
                %{--</div>--}%
            </g:form>
        </div>
    </div>

    </body>
    </html>
</g:applyLayout>
