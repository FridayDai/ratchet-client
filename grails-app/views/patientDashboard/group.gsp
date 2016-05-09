<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div class="content patient-group-section">
    <div class="top-tabs-content group-content">
        <div class="toolbar">
            <button class="btn btn-add btn-add-group" id="add-group" data-patient-id="${patientId}">
                <span>Add</span>
            </button>
        </div>

        <div class="table-group">
            <div class="inner-body" id="groupBody">
                <table id="group-table" class="ec-table team-table display cursorAuto" data-total="${groupList.recordsTotal}">
                    <thead>
                    <tr>
                        <th>Group</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each var="group" in="${groupList.data}" status="i">
                        <tr data-is-dom-data="true">
                            <td>${group.name}</td>
                            <td>${group.id}</td>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
