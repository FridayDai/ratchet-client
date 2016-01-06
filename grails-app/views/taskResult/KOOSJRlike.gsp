<g:set var="cssPath" value="task/koosLike/JRScreen.css"/>
<g:set var="printSheetPath" value="task/koosLike/JRPrint.css"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="odi task-result-content">
        <div class="task-list-wrapper container">

            <div class="task-list-part part-0">
                <g:each var="section" in="${Task.sections}" status="j">
                    <g:if test="${j < 2}">
                        <div class="section-title">${raw(section.title.find(/<h3>.*h3>/))}</div>
                        <g:each var="question" in="${section.questions}" status="i">
                            <div class="question-list">
                                <div class="question">${question.order}. ${question.title}</div>

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
                        </g:each>

                    </g:if>
                </g:each>
            </div>

            <g:if test="${Task.sections.size() > 2}">
                <div class="task-list-part part-1">
                    <g:each var="section" in="${Task.sections}" status="j">
                        <g:if test="${j == 2}">
                            <div class="section-title">${raw(section.title.find(/<h3>.*h3>/))}</div>
                            <g:each var="question" in="${section.questions}" status="i">
                                <div class="question-list">
                                    <div class="question">${question.order}. ${question.title}</div>

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
                            </g:each>
                        </g:if>
                    </g:each>
                </div>
            </g:if>

        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
