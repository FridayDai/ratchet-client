<div class="sticky-header">
    <div role="banner" class="header">
        <div class="toolbar">
            <div class="pull-left">
                <a href="/" class="logo">
                    <img src="${assetPath(src: 'ratchet_health_logo.png')}">
                </a>
            </div>
        </div>
    </div>
    <div class="info-container">
        <div class="title">${Task.title} Results</div>
        <div class="sub-info-panel">
            <div class="patient-info">
                <span class="name">${Task.patientFirstName} ${Task.patientLastName}</span>
                |
                <span class="id">ID: ${Task.patientId}</span>
            </div>
            <div class="questionnaire-info">
                <span class="status">Completed - <g:formatDate date="${new java.util.Date(Task.completeTime)}"
                                           timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                           format="MMM d, yyyy" /></span>
                <span class="score">
                    <div class="score-num">${Task.score}</div>
                    <div class="score-des">Total Result</div>
                </span>
            </div>
        </div>
    </div>
</div>
