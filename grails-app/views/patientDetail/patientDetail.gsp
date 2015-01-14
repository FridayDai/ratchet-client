<!DOCTYPE html>

<g:set var="scriptPath" value="patientDetailBundle"/>
<g:set var="cssPath" value="patientDetail"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>
    <div class="content">
        <div class="patient-info">
            <label>ID: 33091234</label>
            <div>
                <label>John Smith        john@gmail.com         569-3033-3012</label>
            </div>
            <a class="btn-edit">Edit</a>
        </div>
        <div id="tabs" class="patient-tab">
            <ul>
                <li>
                    <g:link controller="patientDetail" action="overview">Overview</g:link>
                </li>
                <li>
                    <g:link controller="patientDetail" action="activity">Activity</g:link>
                </li>
                <li>
                    <g:link controller="patientDetail" action="task">Task</g:link>
                </li>
                <li>
                    <g:link controller="patientDetail" action="team">Team</g:link>
                </li>
            </ul>

        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
