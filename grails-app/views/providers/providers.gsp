<g:set var="scriptPath" value="bundles/baseBundle" />
<g:set var="cssPath" value="home" />
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to Ratchet Health</title>
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
