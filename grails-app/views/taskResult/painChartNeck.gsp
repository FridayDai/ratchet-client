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
            <div class="answer-title">Pain Drawing</div>

            <div id="draw-board" class="draw-board clear">

                <div class="chart-content">
                    <g:render template="/taskResult/template/neckFront" model="['taskResult': mixedResult]"></g:render>
                </div>

                <div class="chart-content">
                    <g:render template="/taskResult/template/neckBack" model="['taskResult': mixedResult]"></g:render>
                </div>

                <div class="chart-content-middle">
                    <g:render template="/taskResult/template/symptomsDirection"></g:render>
                </div>
            </div>
        </div>

        <div class="answer-container clear">
            <div class="answer-list">
                <div class="answer-box">
                    <div class="answer-title">
                        Percentage of pain
                    </div>

                    <div class="answer-line">
                        Neck pain
                        <span class="pain-percent"><g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['17']?: '0' }%</g:else></span>
                    </div>

                    <div class="answer-line">
                        Shoulder pain
                        <span class="pain-percent"><g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['18']?: '0'}%</g:else></span>
                    </div>

                    <div class="answer-line">
                        Arm pain
                        <span class="pain-percent"><g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['19']?: '0'}%</g:else></span>
                    </div>

                    <div class="answer-line">
                        The user has no neck, shoulder or arm pain
                        <label>
                            <g:if test="${mixedResult['20']}">
                                <input id="painToggle" type="checkbox" class="rc-choice-hidden" disabled checked/>
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
                        Neck Pain
                    </div>

                    <div class="answer-line">
                        Average level of neck pain
                        <span>${mixedResult['21']} / 10</span>
                    </div>

                    <div class="answer-line">
                        Frequency of neck pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['22']?.toInteger()]}</span>
                    </div>
                </div>

                <div class="answer-box">
                    <div class="answer-title">
                        Shoulder Pain
                    </div>

                    <div class="answer-line">
                        Average level of shoulder pain
                        <span>${mixedResult['23']} / 10</span>
                    </div>

                    <div class="answer-line">
                        Frequency of shoulder pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['24']?.toInteger()]}</span>
                    </div>
                </div>

                <div class="answer-box">
                    <div class="answer-title">
                        Arm Pain
                    </div>

                    <div class="answer-line">
                        Average level of arm pain
                        <span>${mixedResult['25']} / 10</span>
                    </div>

                    <div class="answer-line">
                        Frequency of arm pain
                        <span>${RatchetConstants.PAIN_FREQUENCY[mixedResult['26']?.toInteger()]}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
