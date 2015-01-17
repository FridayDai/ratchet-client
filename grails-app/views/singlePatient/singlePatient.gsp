<!DOCTYPE html>

<g:set var="scriptPath" value="singlePatientBundle"/>
<g:set var="cssPath" value="treatment"/>
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
            <button id="addTab" class="add-tab">Add Treatment</button>
            <ul class="tab-treatment">
                <li>
                    <g:link controller="treatment" action="index" data-id="sub1">Rotator Cuff Essential</g:link>
                </li>
                <li>
                    <g:link controller="treatment" action="index" data-id="sub2">Total Knee Replacement</g:link>
                </li>

            </ul>

        </div>
    </div>
    <g:form class="form ui-hidden" id="treatment-form" name="treatment-form">
        <div class="form-group">
            <input id="name" name="name" type="text" class="input-group" placeholder="Name" required/>
        </div>
    </g:form>
    </body>
    </html>
</g:applyLayout>
