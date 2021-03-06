<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/login.bundle.js"/>
<g:set var="cssPath" value="login"/>
<g:applyLayout name="form">
    <html>
    <head>
        <title>Welcome to Ratchet Health</title>
    </head>

    <body>

    <div class="optimize-prompt">
        <div class="display-inline">This webpage is not optimized for mobile viewing.

            <p class="display-inline margin-left btn-close">x</p>

            <p class="display-inline close-decoration btn-close">close</p>
        </div>
    </div>

    <div class="site-wrapper">
        <div class="cover-container">
            <div class="image-ratchet-health cover-inner-header"></div>
            <g:form class="form login-form" controller="authentication" method="post" action="login" autocomplete="off">

                <div class="form-style-content">
                    <div class="input-combination">
                        <div class="align-left">EMAIL ADDRESS</div>
                        <input name="email" type="text" class="input-control email" placeholder="Enter E-mail"
                            value="${email}"
                               required/>
                    </div>

                    <div class="input-combination">
                        <div class="align-left">PASSWORD</div>
                        <input name="password" type="password" class="input-control" placeholder="Enter Password"
                               required/>
                    </div>

                    <div class="error-area">
                        <g:if test="${errorMsg}">
                            <p class="error" id="error-login">${errorMsg}</p>
                        </g:if>
                        <g:if test="${rateLimit}">
                            <p class="error error-rate-limit" data-rate-limit="${rateLimit}"></p>
                        </g:if>
                    </div>

                    %{--<div class="remember-me">--}%
                    %{--<label>--}%
                    %{--<input type="checkbox" class="box-check">--}%
                    %{--Remember me--}%
                    %{--</label>--}%
                    %{--</div>--}%

                </div>

                <div class="align-center cover-inner-footer">
                    <button type="submit" class="btn btn-submit" id='btnLogin'>Log In</button>
                    <g:link uri="/forgot-password" class="forgot-password">Forgot Password?</g:link>
                </div>
            </g:form>
        </div>
    </div>

    </body>
    </html>
</g:applyLayout>
