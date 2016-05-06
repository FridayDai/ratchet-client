<div class="treatment-report clear patient-report-section">
    <div class="inner-search tool-bar"
         data-patient-id="${patientId}"
    >
        <div class="search-content clear">
            <div class="filler-content">
                <label class="select-tip">TOOL</label>
                <input type="text" name="toolFilter" class="tool-filter input-group input-auto-search" data-patient-id="${patientId}" />
            </div>
        </div>
    </div>
    <g:render template="/shared/report_chart" />
</div>
