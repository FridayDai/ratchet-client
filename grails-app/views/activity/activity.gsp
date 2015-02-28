<div class="activity clear">
    <div class="inner-search">
        <div class="search-content clear">
             <div class="filler-content">
                <label for="selectStaffs" class="lbl-by">BY</label>
                <input name="selectStaffs" id="selectStaffs" class="input-group"/>
            </div>
            <div class="filler-content right-search">
                <span class="refresh" id="refresh-btn"></span>
            </div>
        </div>
    </div>

    <div class="table-group">
        <table id="activityTable" class="display activityTable">
            <thead>
            <tr>
                <th>Description</th>
                <th>By</th>
                <th>Last Update</th>
            </tr>
            </thead>
        </table>
    </div>
    <input id="patientId" type="hidden" value="${patientId}">
    <input id="medicalRecordId" type="hidden" value="${medicalRecordId}">
    <input id="clientId" type="hidden" value="${clientId}">
</div>

