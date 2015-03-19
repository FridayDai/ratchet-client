<!DOCTYPE html>

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

            <div class="form">
                <div class="form-style-content">
                    <div class="input-combination">
                        <div class="form-text">
                            <p class="color-black">
                                Please follow the instruction that's sent to
                                <label class="bolder">${email}</label> to reset your password.</p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="align-center cover-inner-footer">
                <g:link uri="/login" class="btn btn-reset">Back to Log In</g:link>
            </div>
        </div>
    </div>

    </body>
    </html>
</g:applyLayout>
