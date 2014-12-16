<%--
  Created by IntelliJ IDEA.
  User: sid
  Date: 12/16/14
  Time: 4:23 PM
--%>

<!DOCTYPE html>

<g:set var="scriptPath" value="baseBundle" />
<g:set var="cssPath" value="home" />
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>
    <body>

    <div class="home">
        <h1 class="welcome_title">Welcome to ratchet provider desktop!</h1>
        <div class="logout">
            <g:link controller="authentication" action="logout" class="btn_logout">Logout</g:link>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>