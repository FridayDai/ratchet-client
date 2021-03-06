<div class="content patient-activities-section">
    <div class="table-group">
        <table id="activity-table" class="activityTable cursorAuto"
               data-patient-id="${patientId}" data-total="${activities.recordsTotal}" data-pagesize="${pagesize}">
            <thead>
            <tr>
                <th class="nosort">Description</th>
                <th>By</th>
                <th id="sortLastUpdate">Last Updated</th>
            </tr>
            </thead>
            <tbody>
            <g:each var="activity" in="${activities.data}" status="i">
                <tr data-is-dom-data="true">
                    <td>${activity.description}</td>
                    <td>${activity.createdBy}</td>
                    <td>${activity.dateCreated}</td>
                </tr>
            </g:each>
            </tbody>
        </table>
    </div>
</div>
