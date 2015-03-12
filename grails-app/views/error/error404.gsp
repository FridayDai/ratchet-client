<!DOCTYPE html>

<g:set var="cssPath" value="error"/>
<g:applyLayout name="error">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>
    <div class="error-body">
        <div class="top-content">Oops!</div>

        <div class="middle-content">404</div>

        <div class="text-font">The page you are looking for cannot be found!</div>

        <div class="bottom-content">
            <g:link class="btn btn-home" controller="patients" action="index">Go Home</g:link>
        </div>

        <div class="logo"></div>
    </div>
    </body>
    </html>

</g:applyLayout>
