<div class="content">
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
                    <td>
                        <g:formatDate date="${activity.dateCreated}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                       format='MMM d, yyyy h:mm:ss aaa'/>
                    </td>
                </tr>
            </g:each>
            </tbody>
        </table>
    </div>
</div>
