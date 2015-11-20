<g:set var="cssPath" value="task/odiLike"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="odi task-result-content">
        <div class="task-list-wrapper container">
            <g:each var="question" in="${Task.questions}" status="i">
                <div class="question-list">
                    <div class="question">SECTION ${i + 1}: ${question.title}</div>

                    <div class="answer-list">
                        <ul class="list">
                            <g:each var="choice" in="${question.choices}">
                                <li class="answer">
                                    <span class="result-circle-radio <g:if test="${choice.id == question.answerChoiceId}">checked</g:if>"></span>
                                    <span class="text">${choice.content}</span>
                                </li>
                            </g:each>
                        </ul>
                    </div>
                </div>
            </g:each>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
