<g:set var="cssPath" value="task/odiLike/screen.css"/>
<g:set var="printSheetPath" value="task/odiLike/print.css"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="task-result-content">
        <div class="task-list-wrapper container">
            <div class="upper-part">
                <div class="left-part">
                    <div class="question-list">
                        <div class="question">1. What is the purpose of your visit today?</div>
                        <div class="answer-list">
                            <ul class="list">
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Review imaging studies (e.g. x-rays, MRI, CT, etc...)</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Review injection results (Injection date:
                                        <span class="underline-text">${mixedResult['1-2s']}</span>
                                        )</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Routine follow-up</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 4.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Physician</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 5.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Post-operative follow-up (Surgery date:
                                        <span class="underline-text">${mixedResult['1-5s']}</span>
                                        )
                                    </span>

                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 6.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Other:</span>
                                    <span class="underline-text">${mixedResult['1-6s']}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">2. Compared to your last visit, are your symptoms?</div>
                        <div class="answer-list">
                            <ul class="list">
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['2-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Improved, by</span>
                                    <span class="underline-text">${mixedResult['2-1s']}</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['2-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Worse</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['2-c'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Same</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 4.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Different</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="right-part">
                    <div class="question-list">
                        <div class="question">3. What is your current work status?</div>
                        <div class="answer-list">
                            <ul class="list">
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">I’m not working</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">I work part-time (Return date:
                                        <span class="underline-text">${mixedResult['3-2s']}</span>
                                        )</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">I work full-time (Return date:
                                        <span class="underline-text">${mixedResult['3-3s']}</span>
                                        )
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lower-part">
                <div class="question-list">
                    <div class="question">4. Review of Systems– Please mark the circle next to ANY symptoms you have experienced in the past 6 months:</div>

                    <div class="answer-part">
                        <div class="small-part">
                            <div class="answer-list">
                                <div class="sub-question">Constitutional</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['3-c'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">recent weight gain > 10 lbs</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['3-c'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">recent weight loss > 10 lbs</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['1-c'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">loss of appetite
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['3-c'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">fatigue</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['3-c'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">fatigue</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="small-part">

                        </div>
                        <div class="small-part">

                        </div>
                        <div class="small-part">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
