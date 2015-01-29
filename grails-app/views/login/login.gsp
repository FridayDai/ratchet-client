<!DOCTYPE html>

<g:set var="scriptPath" value="loginBundle"/>
<g:set var="cssPath" value="login"/>
<g:applyLayout name="form">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>

    %{--<h1>This is Login Page</h1>--}%

    <g:form class="form" controller="authentication" method="post" action="login">
        <g:if test="${errorMsg}">
            <p class="error" id="errorLogin" rateLimit="${rateLimit}">${errorMsg}</p>
        </g:if>
        <div class="login">
            <input name="email" type="text" class="form-control" placeholder="Email"/>
        </div>

        <div class="login">
            <input name="password" type="password" class="form-control" placeholder="Password"/>
        </div>

        <div class="login">
            <input type="submit" class="btn-submit" id='btnLogin' value="Log In"/>
        </div>
    </g:form>

    </body>
    </html>
</g:applyLayout>
