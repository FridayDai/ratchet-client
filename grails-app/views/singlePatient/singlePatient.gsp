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
        <div class="content-head">
            <a href="#" class="btn-back">
                <div class="icon-back"></div>
            </a>

            <p>Patient</p>
        </div>

        <div class="patient-info">
            <div class="patient-left-info patient-inner-info">
                <div class="id-info color" value="33091234">ID: 33091234</div>

                <div class="name-info div-space color" value="John Smith">John Smith</div>
            </div>

            <div class="patient-right-info patient-inner-info">
                <div class="email-info color" value="john@gmail.com">Email:john@gmail.com</div>

                <div class="phone-info div-space color" value="56930333012">Phone:569-3033-3012</div>
            </div>

            <a href="#" class="btn-edit-patient">
                <div class="icon-edit"></div>
            </a>

            %{--<a class="btn-edit">Edit</a>--}%
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

    <g:form class="treatment-form ui-hidden" id="treatment-form" name="treatment-form">
        <div class="form-group">
            <input id="emid" name="emid" type="text" class="input-group" placeholder="ID" required/>
        </div>

        <div class="form-group">
            <input id="name" name="name" type="text" class="input-group" placeholder="Name" required/>
        </div>

        <div class="form-group">
            <input id="email" name="email" type="text" class="input-group" placeholder="Email" required/>
        </div>

        <div class="form-group">
            <input id="phone" name="phone" type="text" class="input-group" placeholder="Phone" required/>
        </div>
    </g:form>

    </body>
    </html>
</g:applyLayout>
