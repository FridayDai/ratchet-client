<!DOCTYPE html>

<g:set var="scriptPath" value="forgotPasswordBundle"/>
<g:set var="cssPath" value="resetPassword"/>
<g:applyLayout name="form">

<html>
<head>
    <title>Welcome to Ratchet Health</title>
</head>

<body>

<div class="site-wrapper">
    <div class="cover-container">
        <div class="image-ratchet-health cover-inner-header"></div>
        <g:form class="form password-form" controller="accounts" method="post" action="forgotPassword">

            <div class="form-style-content">
                <p class="color-black p-title">Hi!</p>

                <div class="form-text">
                    <p class="color-black">Please enter your email address to reset your password</p>
                </div>

                <div class="input-combination">
                    <div class="align-left">EMAIL ADDRESS</div>
                    <input name="email" type="text" class="input-control email" placeholder="Enter E-mail" required/>
                </div>

                %{--<div class="error-area">--}%
                    %{--<g:if test="${errorMsg}">--}%
                        %{--<p class="error" >${errorMsg}</p>--}%
                    %{--</g:if>--}%
                %{--</div>--}%
            </div>

            <div class="align-center cover-inner-footer">
                <button type="submit" class="btn btn-large">Reset Password</button>
            </div>
        </g:form>
    </div>
</div>

</body>
</html>
</g:applyLayout>
