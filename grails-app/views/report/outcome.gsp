<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/reportOutcome.bundle.js"/>
<g:set var="cssPath" value="report/outcome.css"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Reports - Outcome</title>
    </head>
    <body>
    <div class="content">
        <div class="inner-header" id="header-panel">
            <label class="title report-icon">REPORTS - OUTCOME</label>
        </div>

        <div class="inner-search tool-bar">
            <div class="search-content clear">
                <div class="filler-content">
                    <label for="treatmentFilter" class="select-tip">TREATMENT</label>
                    <input type="text" class="input-group input-auto-search" name="treatmentFilter"
                           id="treatmentFilter"/>
                </div>

                <div class="filler-content">
                    <label for="toolFilter" class="select-tip">TOOL</label>
                    <input type="text" name="toolFilter" id="toolFilter" class="input-group input-auto-search" disabled/>
                </div>

                <div class="filler-content">
                    <label for="providerFilter" class="select-tip">PROVIDER</label>
                    <input type="text" name="providerFilter" id="providerFilter" class="input-group input-auto-search"/>
                </div>

                <div class="filler-content">
                    <label for="yearFilter" class="select-tip">SURGERY IN</label>
                    <input type="text" name="yearFilter" id="yearFilter" class="input-group input-auto-search" disabled/>
                </div>
            </div>
        </div>
        <g:render template="/shared/report_chart" />
    </div>
    </body>
    </html>
</g:applyLayout>

