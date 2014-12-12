<%--
  Created by IntelliJ IDEA.
  User: sid
  Date: 12/12/14
  Time: 7:18 PM
--%>
<!DOCTYPE html>

%{--<g:set var="scriptPath" value="loginBundle"/>--}%
<g:set var="cssPath" value="dummy"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>

    <h1>This is Admin Portal Authenticated Dummy Page</h1>

    <div class="logout">
        <g:link controller="login" action="login" class="btn_logout">Logout</g:link>
    </div>


    </body>
    </html>
</g:applyLayout>