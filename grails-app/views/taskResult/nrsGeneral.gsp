<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:set var="cssPath" value="task/nrsGeneral/nrsGeneral.css"/>
<g:set var="printSheetPath" value="task/nrsGeneral/nrsGeneralPrint.css"/>

<g:applyLayout name="taskResult">
    <html>
        <head>
            <title>${Task.title}</title>
        </head>
        <body>
            <div class="nrs-general container">
                <g:each var="question" in="${Task.questions}" status="i">
                    <div class="question-list">
                        <div class="question primary-color">
                            ${raw(question.title)}
                        </div>
                    </div>
                    <div class="answer-list">
                        <ul class="list">
                            <g:each var="choice" in="${question.choices}">
                                <li class="answer">
                                    <div class="text primary-color">${choice.content}</div>
                                    <label class="choice choice-number">
                                        <span class="result-circle-radio">
                                            <g:if test="${choice.id == question.answerChoiceId}">
                                                <span class="result-circle-radio-checked"></span>
                                            </g:if>
                                        </span>
                                        <span class="rc-radio"></span>
                                    </label>
                                </li>
                            </g:each>

                        </ul>
                    </div>
                </g:each>
            </div>
        </body>
    </html>
</g:applyLayout>
