<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/reportTaskCompletion.bundle.js"/>
<g:set var="cssPath" value="report/taskCompletion.css"/>
<g:applyLayout name="main">
    <html>
    <head>
        <title>Reports - Task Completion</title>
    </head>

    <body>
    <div class="content">
        <div class="inner-header" id="header-panel">
            <label class="title report-icon">REPORTS - TASK COMPLETION</label>
        </div>

        <div class="inner-search" id="filter-panel">
            <div class="search-content clear">
                <div class="filler-content">
                    <label for="selectSurgeon" class="select-tip">PROVIDER</label>
                    <input type="text" name="selectSurgeon" id="selectSurgeon" class="input-group input-auto-search"/>
                </div>

                <div class="filler-content">
                    <label for="toolFilter" class="select-tip">TOOL</label>
                    <input type="text" name="toolFilter" id="toolFilter" class="input-group input-auto-search" />
                </div>

                <div class="filler-content">
                    <label for="yearFilter" class="select-tip">SURGERY IN</label>
                    <input type="text" name="yearFilter" id="yearFilter" class="input-group input-auto-search" />
                </div>
            </div>

        </div>

        <div class="reports" id="charts-panel">
            <div class="panel" id="all-panel">
                <div class="panel-title">All</div>
                <div class="panel-content">
                    <div class="donut"></div>
                    <div class="bar"></div>
                </div>
            </div>

            <div class="panel" id="email-panel">
                <div class="panel-title">Has Email</div>
                <div class="panel-content">
                    <div class="donut"></div>
                    <div class="bar"></div>
                </div>
            </div>
        </div>

    </div>
    </body>
    </html>
</g:applyLayout>
