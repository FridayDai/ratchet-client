<div <g:if test="${archived == 'true'}">class="activity clear archived"</g:if> <g:else>class="activity clear"</g:else>>
    <div class="table-group">
        <table id="activityTable" class="display activityTable cursorAuto">
            <thead>
            <tr>
                <th class="nosort">Description</th>
                <th>By</th>
                <th id="sortLastUpdate">Last Update</th>
            </tr>
            </thead>
        </table>
    </div>
    <input id="patientId" type="hidden" value="${patientId}">
    <input id="medicalRecordId" type="hidden" value="${medicalRecordId}">
    <input id="clientId" type="hidden" value="${clientId}">
</div>

