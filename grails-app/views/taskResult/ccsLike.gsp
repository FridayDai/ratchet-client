<g:set var="cssPath" value="task/ccsLike/ccsScreen.css"/>
<g:set var="printSheetPath" value="task/ccsLike/ccsPrint.css"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
        <div class="task-result-content">
            <div class="task-list-wrapper container">

            <g:each var="section" in="${Task.sections}" status="i">
                <g:if test="${(i / 4) == 0 || i / 4 == 1}">
                    <div class="page page-${(i / 4).toInteger()}">
                </g:if>

                <g:if test="${i.equals(0) || i.equals(4)}">
                    <div class="task-list-part part-0">
                </g:if>
                <g:if test="${i.equals(2) || i.equals(6)}">
                    <div class="task-list-part part-1">
                </g:if>

                <div class="section-list">
                    <div class="section-title"><b>${i + 1}</b>. ${raw(section.title)}</div>

                    <g:each var="question" in="${section.questions}" status="j">
                        <div class="question-list">
                            <div class="question">&#${j + 97};) ${question.title}</div>

                            <div class="answer-list">
                                <ul class="list">
                                    <g:each var="choice" in="${question.choices}" status="k">
                                        <li class="answer">
                                            <div class="text">
                                                <span class="choice-index">${k != 6 ? k : 'N/A'}</span> ${choice.content}
                                            </div>

                                            <span class="result-circle-radio">
                                                <g:if test="${choice.id == question.answerChoiceId}">
                                                    <span class="result-circle-radio-checked">
                                                    </span>
                                                </g:if>
                                            </span>
                                        </li>
                                    </g:each>
                                </ul>
                            </div>
                        </div>
                    </g:each>
                </div>

                <g:if test="${(i + 1) % 2 == 0}">
                    </div>
                </g:if>

                <g:if test="${(i + 1) / 4 == 1 || (i + 1) / 4 == 2}">

                    <div class="page-footer">Page ${(i + 1) / 4}</div>

                    <g:if test="${(i + 1) / 4 == 1}">
                        <div class="page-break"></div>
                    </g:if>

                    </div>
                </g:if>

            </g:each>
        </div>

    </div>

    </body>
    </html>
</g:applyLayout>
