<g:set var="cssPath" value="task/followUp/followUp.css"/>
<g:set var="printSheetPath" value="task/followUp/followUpPrint.css"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="follow-up task-result-content">

        <div class="task-list-part part-0">

            <div class="question-list">

                <div class="question">
                    <strong>
                        We hope you are doing well after your recent spine surgery.
                        If there is anything we can do to assist in your care, please write them below:
                    </strong>
                </div>

                <div class="answer-list">
                    <g:if test="${mixedResult.assistance == 'true'}">
                        <p>${mixedResult.content}</p>
                    </g:if>
                    <g:else>
                        <div class="answer-line">
                            <label>
                                <input id="painToggle" type="checkbox" class="rc-choice-hidden" disabled checked/>
                                <span class="rc-checkbox primary-radio-color"></span>
                            </label>
                            No immediate assistance required.
                        </div>
                    </g:else>
                </div>
            </div>

        </div>

        <div class="task-list-part part-1"></div>
    </div>
    </body>
    </html>
</g:applyLayout>
