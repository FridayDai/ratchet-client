<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:set var="cssPath" value="task/raq/raq.css"/>
<g:set var="printSheetPath" value="task/raq/raqPrint.css"/>


<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="raq task-result-content">
        <div class="task-list-wrapper container">
            <g:each var="question" in="${Task.questions}" status="i">
                <g:if test="${i == 0 || i == 7}">
                    <div class="task-list-part part-${i % 6}">
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
                <g:if test="${i == 6}">
                    </div>
                </g:if>
            </g:each>
        </div>
        <div class="task-prediction-wrapper container">
            Key
            <div class="task-score-prediction">
                <div class="scoreArea">
                    <span class="scoreLevel">Scores < 6:</span> <div class="riskLevel">high risk</div> Prediction: discharge extended inpatient rehabilitation
                </div>

                <div class="scoreArea">
                    <span class="scoreLevel">Scores > 9:</span> <div class="riskLevel">low risk</div> Prediction: discharge directly home
                </div>
                <div class="scoreArea">
                    <span class="scoreLevel">Scores 6-9:</span> <div class="riskLevel" style="margin-left: 3px;">medium risk</div> Prediction: additional intervention to discharge directly home
                </div>
            </div>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
