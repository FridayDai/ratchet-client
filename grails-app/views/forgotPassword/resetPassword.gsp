<!DOCTYPE html>

<g:set var="scriptPath" value="resetPasswordBundle"/>
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
      <g:form class="form password-form" controller="accounts" method="post" action="confirmResetPassword">

        <div class="form-style-content">

          <div class="form-text">
            <p class="color-black">Please enter a new password:</p>
          </div>

          <div class="input-combination">
            <div class="align-left">NEW PASSWORD</div>
            <input name="newPassword" id="newPassword" type="password" class="input-control" placeholder="Enter Password" required/>
          </div>

          <div class="input-combination">
            <div class="align-left">CONFIRM PASSWORD</div>
            <input name="confirmPassword" id="confirmPassword" type="password" class="input-control" placeholder="Confirm Password" required/>
          </div>

          <div class="error-area error">
          </div>
        </div>

        <g:hiddenField name="code" value="${code}"></g:hiddenField>
        <div class="align-center cover-inner-footer">
          <button type="submit" class="btn btn-reset">Reset Password</button>
        </div>
      </g:form>
    </div>
  </div>

  </body>
  </html>
</g:applyLayout>
