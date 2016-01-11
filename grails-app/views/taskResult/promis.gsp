<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:set var="cssPath" value="task/promis/promis.css"/>
<g:set var="printSheetPath" value="task/promis/promisPrint.css"/>


<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="promis task-result-content">
        <div class="task-list-wrapper container">
            <g:each var="section" in="${Task.sections}" status="i">
                <g:each var="question" in="${section.questions}" status="j">
                    <g:if test="${i == 0 & j == 0 || j == 6}">
                    <div class="task-list-part part-${j % 5}">
                    </g:if>
                    <g:if test="${question.order<10}">
                    <div class="question-list">
                        <g:if test="${i == 0 && j == 5}">
                        <div class="question">Section 9: ${question.title}</div>
                        </g:if>
                        <g:elseif test="${i == 0 && j == 6}">
                        <div class="question">Section 6: ${question.title}</div>
                        </g:elseif>
                        <g:elseif test="${i == 1 & j == 0}">
                        <div class="question">Section 10: ${question.title}</div>
                        </g:elseif>
                        <g:elseif test="${i == 1 & j == 1}">
                        <div class="question">Section 8: ${question.title}</div>
                        </g:elseif>
                        <g:else>
                        <div class="question">Section ${j + 1}: ${question.title}</div>
                        </g:else>

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
                    </g:if>
                    <g:else>
                        <div class="question-list">
                            <div class="question">Section 7: ${question.title}</div>
                            <div class="answer-list">
                                <ul class="list-nrs">
                                    <span class="no-pain">No Pain</span>
                                    <span class="severe-pain">Severe Pain</span>
                                    <g:each var="choice" in="${question.choices}" status="k">
                                        <li class="answer-nrs">
                                            <label class="choice choice-number choice-number-${k}">
                                                <input type="radio" class="rc-choice-hidden" disabled="true"
                                                       name="choices.${10 + 2 * i}"
                                                       <g:if test="${choice.id == question.answerChoiceId}">checked</g:if>
                                                       value="${k}"/>
                                                <span class="rc-radio"></span>
                                            </label>
                                        </li>
                                    </g:each>
                                </ul>
                            </div>
                        </div>
                    </g:else>
                    <g:if test="${j == 5 || j == 9}">
                        </div>
                    </g:if>
                </g:each>
            </g:each>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
