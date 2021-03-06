<g:set var="cssPath" value="activateAccount"/>
<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/activateAccount.bundle.js"/>
<g:applyLayout name="form">
    <html>
    <head>
        <title>Welcome to Ratchet Health</title>
    </head>

    <body>

    <div class="site-wrapper">
        <div class="cover-container">
            <div class="image-ratchet-health cover-inner-header"></div>

			<form action="/confirm-password" method="post" class="form create-password-form">
                <input type="hidden" name="email" value="${staff.email}"/>
				<div class="form-style-content">
					<div class="greeting color-black align-center">
						<span>Hi</span>
						<g:if test="${staff.doctor == true}"><span>Dr.</span></g:if>
						<span>${staff.firstName} ${staff.lastName}!</span>
					</div>

                    <div class="info color-black align-center">
                        Welcome to Ratchet Health!
                    </div>

                    <div class="input-container">
                        <div class="input-combination">
                            <div class="align-left">NEW PASSWORD</div>
                            <input name="password" type="password" id="password" class="input-control"
                                   placeholder="Enter Password"/>
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

                <div class="align-center cover-inner-footer">
                    %{--<div class="terms-service color-black">--}%
                    %{--You agree to our <a href="/terms_of_service" target="_blank" class="dark-link" >Terms of Service</a> upon creating account--}%
                    %{--</div>                --}%
                    <button type="submit" class="btn btn-submit" id='joinRat'>Activate Account</button>
                </div>
            </form>
        </div>
    </div>

    </body>
    </html>
</g:applyLayout>
