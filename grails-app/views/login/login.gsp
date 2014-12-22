<%--
  Created by IntelliJ IDEA.
  User: sid
  Date: 12/22/14
  Time: 10:06 AM
--%>

<g:set var="scriptPath" value="loginBundle"/>
<g:set var="cssPath" value="login"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>

    <g:form class="form" controller="authentication" method="post" action="login">
        <div class="login">
            <g:if test="${errorMsg}">
                <p>${errorMsg}</p>
            </g:if>
        </div>
        <div class="login">
            <input name="username" type="text" class="form-control" placeholder="Username"/>
        </div>

        <div class="login">
            <input name="password" type="password" class="form-control" placeholder="Password"/>
        </div>

        <div class="login">
            <input type="submit" class="btn_submit" id='btn_login' value="Log In" >
        </div>
    </g:form>

    </body>
    </html>
</g:applyLayout>