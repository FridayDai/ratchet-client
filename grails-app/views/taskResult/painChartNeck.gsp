<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:set var="cssPath" value="task/painChart/painChart"/>
<g:set var="printSheetPath" value="task/painChart/painChartPrint"/>
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
            <div class="answer-title">PAIN DRAWING</div>
            <div id="draw-board" class="draw-board">
                <span class="chart-content chart-left">
                    <div class="chart-title">Front</div>
                    <g:render template="/taskResult/template/neckFront"></g:render>
                </span>

                <span class="chart-content">
                    <div class="chart-title">Back</div>
                    <g:render template="/taskResult/template/neckBack"></g:render>
                </span>

                <div class="chart-direction">
                    <div>Symptoms:</div>

                    <div class="group-direction">
                        <span class="icon-direction">N</span>
                        <label>Numbness</label>
                    </div>

                    <div class="group-direction">
                        <span class="icon-direction">A</span>
                        <label>Ache</label>
                    </div>

                    <div class="group-direction">
                        <span class="icon-direction">S</span>
                        <label>Stabbing</label>
                    </div>

                    <div class="group-direction">
                        <span class="icon-direction">B</span>
                        <label>Burning</label>
                    </div>

                    <div class="group-direction">
                        <span class="icon-direction">C</span>
                        <label>Cramping</label>
                    </div>

                    <div class="group-direction">
                        <span class="icon-direction">P</span>
                        <label>Pins & Needles</label>
                    </div>
                </div>
            </div>

            <div id="svg-choice-result">
                <input type="hidden" id="Front-Right-Shoulder-hidden" class="Front-Right-Shoulder" name="choices.0" value="${mixedResult['0']}"/>
                <input type="hidden" id="Front-Left-Shoulder-hidden" class="Front-Left-Shoulder" name="choices.1" value="${mixedResult['1']}"/>
                <input type="hidden" id="Front-Right-Arm-hidden" class="Front-Right-Arm" name="choices.2" value="${mixedResult['2']}"/>
                <input type="hidden" id="Front-Left-Arm-hidden" class="Front-Left-Arm" name="choices.3" value="${mixedResult['3']}"/>

                <input type="hidden" id="Back-Left-Arm-hidden" class="Back-Left-Arm" name="choices.4" value="${mixedResult['4']}"/>
                <input type="hidden" id="Back-Right-Arm-hidden" class="Back-Right-Arm" name="choices.5" value="${mixedResult['5']}"/>
                <input type="hidden" id="Neck-hidden" class="Neck" name="choices.6" value="${mixedResult['6']}"/>
                <input type="hidden" id="Back-Left-Shoulder-hidden" class="Back-Left-Shoulder" name="choices.7" value="${mixedResult['7']}"/>
                <input type="hidden" id="Back-Right-Shoulder-hidden" class="Back-Right-Shoulder" name="choices.8" value="${mixedResult['8']}"/>
            </div>
        </div>

        <div class="answer-container">
            <div class="answer-list">
                <div class="answer-box">
                    <div class="answer-title">
                        PERCENTAGE OF PAIN
                    </div>
                    <div class="answer-line">
                        Neck pain
                        <span class="pain-percent">${mixedResult['9']}%</span>
                    </div>
                    <div class="answer-line">
                        Shoulder pain
                        <span class="pain-percent">${mixedResult['10']}%</span>
                    </div>
                    <div class="answer-line">
                        Arm pain
                        <span class="pain-percent">${mixedResult['11']}%</span>
                    </div>
                    <div class="answer-line">
                        The user has no neck, shoulder or arm pain
                        <label>
                        <g:if test="${mixedResult['12']}">
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
                        <span>${mixedResult['13']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of neck pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['14']?.toInteger()]}</span>
                    </div>
                </div>
                <div class="answer-box">
                    <div class="answer-title">
                        SHOULDER PAIN
                    </div>
                    <div class="answer-line">
                        Average level of shoulder pain
                        <span>${mixedResult['15']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of shoulder pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['16']?.toInteger()]}</span>
                    </div>
                </div>
                <div class="answer-box">
                    <div class="answer-title">
                        ARM PAIN
                    </div>
                    <div class="answer-line">
                        Average level of arm pain
                        <span>${mixedResult['17']} / 10</span>
                    </div>
                    <div class="answer-line">
                        Frequency of arm pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['18']?.toInteger()]}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
