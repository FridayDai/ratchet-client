<div class="content">

    <div id="subTabs" class="sub-tabs">
        <ul class="tab-list">
            %{--<li data-type="Overview">--}%
            %{--<g:link controller="overview" action="index"--}%
            %{--params="[clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId]">Overview</g:link>--}%
            %{--</li>--}%
            <li data-type="Task">
                <g:link controller="task" action="getTasksAndTools"
                        params="[clientId: clientId, patientId: patientId, treatmentId: treatmentId, medicalRecordId: medicalRecordId, archived: archived]">TASKS</g:link>
            </li>
            <li data-type="Team">
                <g:link controller="team" action="showMedicalCares"
                        params="[medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId, archived: archived]">TEAM</g:link>
            </li>
            <li data-type="Activity">
                <g:link controller="activity" action="index"
                        params="[clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId, archived: archived]">ACTIVITIES</g:link>
            </li>
            <li data-type="SurgeryTime" class="surgery-date">
                <g:if test="${archived == 'true'}">
                    <h4 class="archived-treatment-title">Archived Treatment</h4>
                </g:if>
                <g:if test="${surgeryTime}">
                    <span>Surgery Time:</span>
                    <label class="surgery-time-picker">
                        <g:formatDate date="${surgeryTime}"
                                      timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                      format="MMM d, yyyy h:mm a"></g:formatDate>
                    </label>
                %{--<input type="hidden" class="datetime-picker" data-patient-id="${patientId}"--}%
                %{--data-client-id="${clientId}"--}%
                %{--data-medical-record-id="${medicalRecordId}"/>--}%
                    <button
                            <g:if test="${archived == 'true'}">
                                class="icon-edit surgeryTime-edit inline disabled" disabled="disabled"
                            </g:if>
                            <g:else>
                                class="icon-edit surgeryTime-edit inline "
                            </g:else>
                            data-patient-id="${patientId}"
                       data-client-id="${clientId}" data-treatment-id="${treatmentId}"
                       data-medical-record-id="${medicalRecordId}"></a>
                    </button>
                </g:if>
                <button
                    <g:if test="${archived == 'true'}">
                        class="icon-archived archived-active inline disabled" disabled="disabled"
                    </g:if>
                    <g:else>
                        class="icon-archived archived-active inline "
                    </g:else>
                        data-patient-id="${patientId}"
                        data-client-id="${clientId}"
                        data-medical-record-id="${medicalRecordId}">
                </button>

            </li>
        </ul>

    </div>

</div>

