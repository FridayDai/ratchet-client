<!DOCTYPE html>

<g:set var="scriptPath" value="bundles/groupsBundle"/>
<g:set var="cssPath" value="groups"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Groups - Ratchet Health</title>
    </head>

    <body>
    <div>
        <div class="inner-header">
            <label class="title group-icon">GROUPS</label>
            <a href="#" id="add-group" class="btn btn-add add-group"><span>New Group</span></a>
        </div>

        <div class="inner-search">
            <div class="search-content clear">
                <div class="filler-content right-search">
                    <input type="text" placeholder="Name" class="search-input" id="search-input">
                    <span class="search" id="search-btn"></span>
                </div>
            </div>
        </div>

        <div class="table-group">
            <table id="groupsTable" class="display div-hidden cursorAuto" data-total="${groupList?.recordsTotal}"
                   data-pagesize="${pagesize}" data-filtered="${groupList?.recordsFiltered} ">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Group Name</th>
                    <th>Last Update</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <g:each var="group" in="${groupList.data}" status="i">
                    <tr data-is-dom-data="true">
                        <td>${group.id}</td>
                        <td>${group.name}</td>
                        <td>${group.lastUpdated}</td>
                        <td>${group.id}</td>
                    </tr>
                </g:each>
                </tbody>
            </table>
        </div>

        <g:form class="form ui-hidden" id="group-form" name="group-form">

            <div class="form-group inline">
                <label class="lbl-group">GROUP NAME<span>*</span></label>
                <input id="groupName" name="groupName" type="text" class="input-group input-only-one" maxlength="128"
                       placeholder="Enter group name" required/>
            </div>

        %{--<label class="form-group required pull-right"><span>*</span>Required field</label>--}%

            <div class="required-field required-padding">
                *Required field
            </div>

        </g:form>

    </div>
    </body>
    </html>
</g:applyLayout>
