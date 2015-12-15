<g:set var="cssPath" value="task/odiLike/screen.css"/>
<g:set var="printSheetPath" value="task/odiLike/print.css"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="odi task-result-content">
        <div class="task-list-wrapper container">
            <g:each var="question" in="${Task.questions}" status="i">
                <g:if test="${i == 0 || i == 5}">
                <div class="task-list-part part-${i % 4}">
                </g:if>
                    <div class="question-list">
                        <div class="question">Section ${i + 1}: ${question.title}</div>

                        <div class="answer-list">
                            <ul class="list">
                                <g:each var="choice" in="${question.choices}">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${choice.id == question.answerChoiceId}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">${choice.content}</span>
                                    </li>
                                </g:each>
                            </ul>
                        </div>
                    </div>
                <g:if test="${i == 4 || i == 9}">
                </div>
                </g:if>
            </g:each>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
