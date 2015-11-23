<div <g:if test="${archived == 'true'}">class="content activity clear archived"</g:if> <g:else>class="activity clear"</g:else>>
    <div class="table-group">
        <table class="display activityTable cursorAuto"
               data-patient-id="${patientId}" data-medical-record-id="${medicalRecordId}" data-client-id="${clientId}">
            <thead>
            <tr>
                <th class="nosort">Description</th>
                <th>By</th>
                <th id="sortLastUpdate">Last Updated</th>
            </tr>
            </thead>
        </table>
    </div>
</div>

