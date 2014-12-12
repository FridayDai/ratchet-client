<%--
  Created by IntelliJ IDEA.
  User: sid
  Date: 12/12/14
  Time: 7:16 PM
--%>

<g:set var="scriptPath" value="loginBundle"/>
<g:set var="cssPath" value="login"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>

    <h1>This is Login Page</h1>

    <g:form class="form">
        <div class="login">
            <input name="email" type="text" class="form-control" placeholder="Email"/>
        </div>

        <div class="login">
            <input name="password" type="password" class="form-control" placeholder="Password"/>
        </div>

        <div class="login">
            <g:actionSubmit class="btn_submit" id='btn_login' value="Log In" action="logout"/>
        </div>
    </g:form>

    </body>
    </html>
</g:applyLayout>