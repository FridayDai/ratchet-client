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
                <div class="detail-info">
                    <div class="head-content">

                        <div class="inner-head-content div-space">
                            <p class="p-id">ID:12345555565656565656</p>

                            <p class="p-name">Dr.Daniel.Smith</p>
                        </div>

                        <div class="inner-bottom-content div-space">
                            <p class="p-role">Surgeonaaaaa</p>

                            <p class="p-email">aaaaaaaaaaaa@gamil.com</p>
                        </div>

                    </div>

                    <div class="middle-content">
                        <p>in August 2004,I left QingDao to BeiJing and worked for a foreign enterprise as a automation software test engineer.Because I want to change my working environment, I'd like to find a job which is more challenging. Morover Motorola is a global company, so I feel I can gain the most from working in this kind of company ennvironment. That is the reason why I come here to compete for this position.</p>
                    </div>

                    <div class="bottom-content">
                        <a href="#" class="btn-make-primary">Make PRIMARY</a>

                        <a href="#" id="remove-care-team">
                            <div class="icon-remove"></div>
                        </a>
                    </div>
                </div>

                <div class="detail-info">
                    <div>ID:123456</div>

                    <div>Mr.Daniel.Smith</div>

                    <div>Surgeon</div>

                    <div>aaa@gamil.com</div>

                    <div>Dr. Smith is commited to careful dignostic</div>
                    <a href="#">Make PREMARY</a>
                </div>

                <div class="detail-info">
                    <div>ID:123456</div>

                    <div>Mr.Daniel.Smith</div>

                    <div>Surgeon</div>

                    <div>aaa@gamil.com</div>

                    <div>Dr. Smith is commited to careful dignostic</div>
                    <a href="#">Make PREMARY</a>
                </div>
            </div>
        </div>

        <div class="care-giver-content">
            <div class="inner-header">
                <p>Care Giver</p>
                <button class="btn-invite btn-position" id="invite-giver">Invite Care Giver</button>

            </div>

            <div class="inner-body">
                <div class="detail-info">
                    %{--<div class="status active-status">--}%
                        %{--ACTIVE--}%
                    %{--</div>--}%

                    <div class="status invited-status">
                        ACTIVE
                    </div>

                    <div class="head-content div-margin">

                        <div class="inner-head-content div-space">
                            <p class="p-id">ID:12345555565656565656</p>

                            <p class="p-name">Dr.Daniel.Smith</p>
                        </div>

                        <div class="inner-bottom-content div-space">
                            <p class="p-role">Surgeonaaaaa</p>

                            <p class="p-email">aaaaaaaaaaaa@gamil.com</p>
                        </div>

                    </div>

                    <div class="bottom-content">
                        <a href="#" id="edit-care-giver">
                            <div class="icon-edit"></div>
                        </a>
                        <a href="#" id="remove-care-giver">
                            <div class="icon-remove"></div>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <g:form class="addTeamForm ui-hidden" id="add-team-form">

        <div class="form-group">
            <input id="team-emid" name="emid" type="text" class="input-group" placeholder="ID" required/>
        </div>

        <div class="form-group">
            <input id="team-firstName" name="firstName" type="text" class="input-group" placeholder="First Name"
                   required/>
        </div>

        <div class="form-group">
            <input id="team-lastName" name="lastName" type="text" class="input-group" placeholder="Last Name" required/>
        </div>

        <div class="form-group">
            <input id="team-email" name="email" type="email" class="input-group" placeholder="Email Address" required/>
        </div>

    </g:form>


    <g:form class="inviteGiverForm ui-hidden" id="invite-giver-form">

        <div class="form-group">
            <input id="giver-emid" name="emid" type="text" class="input-group" placeholder="ID" required/>
        </div>

        <div class="form-group">
            <input id="giver-firstName" name="firstName" type="text" class="input-group" placeholder="First Name"
                   required/>
        </div>

        <div class="form-group">
            <input id="giver-lastName" name="lastName" type="text" class="input-group" placeholder="Last Name"
                   required/>
        </div>

        <div class="form-group">
            <input id="giver-email" name="email" type="email" class="input-group" placeholder="Email Address" required/>
        </div>

        <div class="form-group">
            <label for="relationship">Relationship:</label>
            <select name="roles" id="relationship">
                <option selected="selected">Spouse</option>
                <option>Parent</option>
                <option>Children</option>
                <option>Friend</option>
            </select>
        </div>

        <div class="form-group">
            <label for="status">Status:</label>
            <select name="roles" id="status">
                <option selected="selected">invited</option>
                <option>active</option>

            </select>
        </div>
    </g:form>


    <g:form class="warn ui-hidden">

    </g:form>

    </body>
    </html>
</g:applyLayout>
