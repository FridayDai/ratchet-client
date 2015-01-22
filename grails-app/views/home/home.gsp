<!DOCTYPE html>

<g:set var="scriptPath" value="homeBundle"/>
<g:set var="cssPath" value="home"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>
    <div class="content">

        <a href="#" id="add-provider" class="btn add-provider">Add Provider</a>
        %{--<a href="patient/patientTeam">View</a>--}%

        <div class="provider-list-table">
            <table id="provideTable" class="display">
                <thead>
                <tr>
                    <th></th>
                    <th>Provider</th>
                    <th>Agent</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                %{--<tbody>--}%
                %{--<tr>--}%
                %{--<th>1</th>--}%
                %{--<th>222</th>--}%
                %{--<th>3333</th>--}%
                %{--<th>44444</th>--}%
                %{--<th>555555</th>--}%
                %{--</tr>--}%
                %{--</tbody>--}%

            </table>
        </div>

        <g:form class="form ui-hidden" id="table-form" name="table-form">

            <div class="form-group">
                <input id="provider" name="provider" type="text" class="input-group" placeholder="Provider" required/>
            </div>
            <div class="form-group">
                <input id="agent" name="agent" type="text" class="input-group" placeholder="Agent" required/>
            </div>
            <div class="form-group">
                <input id="email" name="email" type="email" class="input-group" placeholder="Email" required/>
            </div>

        </g:form>

        <g:form class="warn ui-hidden">

        </g:form>

    </div>
    <input id="selectTreatment" type="text" width="260">
    </body>
    </html>
</g:applyLayout>
