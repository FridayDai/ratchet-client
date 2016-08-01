<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:set var="cssPath" value="task/nrsGeneral/nrsGeneral.css"/>
<g:set var="printSheetPath" value="task/nrsGeneral/nrsGeneralPrint.css"/>

<g:applyLayout name="taskResult">
    <html>
        <head>
            <title>${Task.title}</title>
        </head>
        <body>
            <div class="nrs-general task-result-content">
                <div class="container">
                    <g:each var="question" in="${Task.questions}" status="i">
                        <div class="question-list">
                            <div class="question">
                                ${raw(question.title)}
                            </div>
                            <div class="answer-list">
                                <ul class="list">
                                    <g:each var="j" in="${(0..<11)}">
                                        <li class="answer">
                                            <label class="choice choice-number choice-number-${j}">
                                                <input type="radio" class="rc-choice-hidden"
                                                    <g:if test="${Task.type == RatchetConstants.ToolEnum.NRS_GENERAL.value}">
                                                        <g:if test="${i == 0}"> name="choices.general"</g:if>
                                                        <g:if test="${i == 0 && choices?.general == j.toString()}"> checked</g:if>
                                                    </g:if>
                                                    <g:if test="${Draft && Draft[i.toString()] == j.toString()}"> checked</g:if>
                                                       value="${j}"/>
                                                <span class="rc-radio"></span>
                                            </label>
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
