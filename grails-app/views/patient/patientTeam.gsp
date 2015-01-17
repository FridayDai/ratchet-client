<g:set var="scriptPath" value="patientTeamBundle"/>
<g:set var="cssPath" value="patientTeam"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Welcome to ratchet</title>
    </head>

    <body>

    <div class="content">
        <div class="care-team-content">
            <div class="inner-header">
                <p>Care Team</p>
                <button class="btn-add btn-position" id="add-member">Add Member</button>
            </div>

            <div class="inner-body">
                <g:each in="${teams}" var="team" status="i">
                    <div class="detail-info" value="${team.id}">
                        <div class="head-content">
                            <div class="inner-head-content div-space">
                                <p class="p-id">ID:${team.emid}</p>

                                <p class="p-name">Dr.${team.name}</p>
                            </div>

                            <div class="inner-bottom-content div-space">
                                <p class="p-role">${team.role}</p>

                                <p class="p-email">${team.email}</p>
                            </div>

                        </div>

                        <div class="middle-content">
                            <p>${team.description}</p>
                        </div>

                        <div class="bottom-content">
                            <a href="#" class="btn-make-primary">Make PRIMARY</a>

                            <a href="#" id="remove-care-team" class="btn-remove" value="${team.id}">
                                <div class="icon-remove"></div>
                            </a>
                        </div>
                    </div>
                </g:each>
            </div>
        </div>

        <div class="care-giver-content">
            <div class="inner-header">
                <p>Care Giver</p>
                <button class="btn-invite btn-position" id="invite-giver">Invite Care Giver</button>

            </div>

            <div class="inner-body">
                <g:each in="${givers}" var="giver" status="i">
                    <div class="detail-info">
                        <g:if test="${giver.status == "ACTIVE"}">
                            <div class="status active-status">
                                ${giver.status}
                            </div>
                        </g:if>
                        <g:else test="${giver.status == "INVITED"}">
                            <div class="status invited-status">
                                ${giver.status}
                            </div>
                        </g:else>

                        <div class="head-content div-margin">
                            <div class="inner-head-content div-space">
                                <p class="p-id" value="${giver.emid}">ID:${giver.emid}</p>

                                <p class="p-name" value="${giver.name}">Dr.${giver.name}</p>
                            </div>

                            <div class="inner-bottom-content div-space">
                                <p class="p-relationship" value="${giver.relationship}">Relationship:${giver.relationship}</p>

                                <p class="p-email" value="${giver.email}">${giver.email}</p>
                            </div>
                        </div>

                        <div class="bottom-content">
                            <a href="#" id="edit-care-giver" class="btn-edit" data-id="${giver.id}">
                                <div class="icon-edit"></div>
                            </a>
                            <a href="#" id="remove-care-giver" class="btn-remove">
                                <div class="icon-remove"></div>
                            </a>
                        </div>

                    </div>
                </g:each>
            </div>
        </div>

        <g:form class="addTeamForm ui-hidden" id="add-team-form">

            <div class="form-group">
                <input id="team-emid" name="emid" type="text" class="input-group" placeholder="ID" required/>
            </div>

            <div class="form-group">
                <input id="team-name" name="name" type="text" class="input-group" placeholder="Name" required/>
            </div>

            <div class="form-group">
                <input id="team-email" name="email" type="email" class="input-group" placeholder="Email Address"
                       required/>
            </div>

            <div class="form-group">
                <label for="roles">Role:</label>
                <select name="roles" id="roles">
                    <option selected="selected">Surgeon</option>
                    <option>Nurse</option>
                </select>
            </div>

            <div class="form-group">
                <input id="team-des" name="des" type="text" class="input-group" placeholder="Description" required/>
            </div>
        </g:form>


        <g:form class="inviteGiverForm ui-hidden" id="invite-giver-form">

            <div class="form-group">
                <input id="giver-emid" name="emid" type="text" class="input-group" placeholder="ID" required/>
            </div>

            <div class="form-group">
                <input id="giver-name" name="name" type="text" class="input-group" placeholder="Name" required/>
            </div>

            <div class="form-group">
                <input id="giver-email" name="email" type="email" class="input-group" placeholder="Email Address"
                       required/>
            </div>

            <div class="form-group">
                <label for="relationship">Relationship:</label>
                <select name="relationship" id="relationship">
                    <option selected="selected">Spouse</option>
                    <option>Sibling</option>
                    <option>Children</option>
                    <option>Friend</option>
                </select>
            </div>

        %{--<div class="form-group">--}%
        %{--<label for="status">Status:</label>--}%
        %{--<select name="status" id="status">--}%
        %{--<option selected="selected">invited</option>--}%
        %{--<option>active</option>--}%

        %{--</select>--}%
        %{--</div>--}%
        </g:form>


        <g:form class="warn ui-hidden">

        </g:form>

    </body>
    </html>
</g:applyLayout>
