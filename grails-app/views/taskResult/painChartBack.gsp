<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:set var="cssPath" value="task/painChart/painChart.css"/>
<g:set var="printSheetPath" value="task/painChart/painChartPrint.css"/>
<g:set var="commonScriptPath" value="dist/commons.chunk.js"/>
<g:set var="scriptPath" value="dist/painChart.bundle.js"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="pain-chart task-result-content">
        <div class="pain-draw">
            <div class="answer-title">Pain Drawing</div>
            <div id="draw-board" class="draw-board clear">
                <span class="chart-content">
                    <div class="chart-title">Front</div>
                    <g:render template="/taskResult/template/backFront"></g:render>
                </span>

                <div class="chart-content-middle">
                    <g:render template="/taskResult/template/symptomsDirection"></g:render>
                </div>

                <span class="chart-content">
                    <div class="chart-title">Back</div>
                    <g:render template="/taskResult/template/backBack"></g:render>
                </span>
            </div>

            <div id="svg-choice-result">
                <input type="hidden" id="Front-Right-Leg-hidden" class="Front-Right-Leg" name="choices.0" value="${mixedResult['0']}"/>
                <input type="hidden" id="Front-Left-Leg-hidden" class="Front-Left-Leg" name="choices.1" value="${mixedResult['1']}"/>

                <input type="hidden" id="Back-hidden" class="Back" name="choices.2" value="${mixedResult['2']}"/>
                <input type="hidden" id="Buttock-hidden" class="Buttock" name="choices.3" value="${mixedResult['3']}"/>
                <input type="hidden" id="Back-Right-Leg-hidden" class="Back-Right-Leg" name="choices.4" value="${mixedResult['4']}"/>
                <input type="hidden" id="Back-Left-Leg-hidden" class="Back-Left-Leg" name="choices.5" value="${mixedResult['5']}"/>
            </div>
        </div>

        <div class="answer-container clear">
            <div class="answer-list">
                <div class="answer-box">
                    <div class="answer-title">
                        Percentage of pain
                    </div>
                    <div class="answer-line">
                        Back Pain
                        <span class="pain-percent">${mixedResult['6']}%</span>
                    </div>
                    <div class="answer-line">
                        Buttock Pain
                        <span class="pain-percent">${mixedResult['7']}%</span>
                    </div>
                    <div class="answer-line">
                        Leg Pain
                        <span class="pain-percent">${mixedResult['8']}%</span>
                    </div>
                    <div class="answer-line">
                        The user has no back, buttock or leg pain
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
                        Back Pain
                    </div>
                    <div class="answer-line">
                        Average level of back pain
                        <span>${mixedResult['10']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of back pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['11']?.toInteger()]}</span>
                    </div>
                </div>
                <div class="answer-box">
                    <div class="answer-title">
                        Buttock Pain
                    </div>
                    <div class="answer-line">
                        Average level of buttock pain
                        <span>${mixedResult['12']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of buttock pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['13']?.toInteger()]}</span>
                    </div>
                </div>
                <div class="answer-box">
                    <div class="answer-title">
                        Leg Pain
                    </div>
                    <div class="answer-line">
                        Average level of leg pain
                        <span>${mixedResult['14']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of leg pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['15']?.toInteger()]}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
