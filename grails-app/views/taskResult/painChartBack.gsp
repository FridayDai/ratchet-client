<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:set var="cssPath" value="task/painChart/painChart.css"/>
<g:set var="printSheetPath" value="task/painChart/painChartPrint.css"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="pain-chart task-result-content">
        <div class="pain-draw">
            <div class="answer-title">PAIN DRAWING</div>
            <div id="draw-board" class="draw-board clear">
                <span class="chart-content">
                    <div class="chart-title">Front</div>
                    <g:render template="/taskResult/template/backFront" model="['taskResult': mixedResult]"></g:render>
                </span>

                <div class="chart-content-middle">
                    <g:render template="/taskResult/template/symptomsDirection"></g:render>
                </div>

                <span class="chart-content">
                    <div class="chart-title">Back</div>
                    <g:render template="/taskResult/template/backBack" model="['taskResult': mixedResult]"></g:render>
                </span>
            </div>
        </div>

        <div class="answer-container clear">
            <div class="answer-list">
                <div class="answer-box">
                    <div class="answer-title">
                        PERCENTAGE OF PAIN
                    </div>
                    <div class="answer-line">
                        Neck pain
                        <span class="pain-percent"><g:if test="${mixedResult['9']}">- -</g:if><g:else>${mixedResult['6']}%</g:else></span>
                    </div>
                    <div class="answer-line">
                        Shoulder pain
                        <span class="pain-percent"><g:if test="${mixedResult['9']}">- -</g:if><g:else>${mixedResult['7']}%</g:else></span>
                    </div>
                    <div class="answer-line">
                        Arm pain
                        <span class="pain-percent"><g:if test="${mixedResult['9']}">- -</g:if><g:else>${mixedResult['8']}%</g:else></span>
                    </div>
                    <div class="answer-line">
                        The user has no neck, shoulder or arm pain
                        <label>
                            <g:if test="${mixedResult['9']}">
                                <input id="painToggle" type="checkbox" class="rc-choice-hidden" disabled checked />
                            </g:if>
                            <g:else>
                                <input id="painToggle" type="checkbox" class="rc-choice-hidden" disabled/>
                            </g:else>
                            <span class="rc-checkbox primary-radio-color"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="answer-list list-right">
                <div class="answer-box">
                    <div class="answer-title">
                        NECK PAIN
                    </div>
                    <div class="answer-line">
                        Average level of neck pain
                        <span>${mixedResult['10']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of neck pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['11']?.toInteger()]}</span>
                    </div>
                </div>
                <div class="answer-box">
                    <div class="answer-title">
                        SHOULDER PAIN
                    </div>
                    <div class="answer-line">
                        Average level of shoulder pain
                        <span>${mixedResult['12']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of shoulder pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['13']?.toInteger()]}</span>
                    </div>
                </div>
                <div class="answer-box">
                    <div class="answer-title">
                        ARM PAIN
                    </div>
                    <div class="answer-line">
                        Average level of arm pain
                        <span>${mixedResult['14']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of arm pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['15']?.toInteger()]}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
