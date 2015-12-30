<g:set var="cssPath" value="task/patientQuestionnaire/returnPatient.css"/>
<g:set var="printSheetPath" value="task/patientQuestionnaire/returnPatientPrint.css"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task.title} Results</title>
    </head>

    <body>
    <div class="task-result-content">
        <div class="task-list-wrapper container">
            <div class="upper-part clear">
                <div class="task-list-part part-0">
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

                    <div class="question-list special-question-list">
                    <div class="question-list special-question-list">
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
                                        <g:if test="${mixedResult['2-c'] == 4.toString()}">
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

                <div class="task-list-part part-1">
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
                                        <span class="underline-text">
                                        ${mixedResult['3-c'] == 2.toString() && mixedResult['3-e-1s'] ? mixedResult['3-e-1s'] : ''}
                                    </span>
                                        )</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">I work full-time (Return date:
                                        <span class="underline-text">
                                        ${mixedResult['3-c'] == 3.toString() && mixedResult['3-e-1s'] ? mixedResult['3-e-1s'] : ''}
                                    </span>
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

                    <div class="answer-part clear">
                        <div class="small-part">
                            <div class="answer-list">
                                <div class="sub-question">Constitutional</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-0'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">recent weight gain > 10 lbs</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-0'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">recent weight loss > 10 lbs</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-0'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">loss of appetite
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-0'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">fatigue</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-0'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">insomnia</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-0'] == 6.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">fever/ chills</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-0'] == 7.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">night sweats</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Eyes/ Ears</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-1'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">eye disease</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-1'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">glasses or contacts</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-1'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">blurred or double vision</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-1'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">vision lost
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-1'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">hearing lost</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-1'] == 6.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">ringing in the ears</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Nose</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['3-c'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">sinus problems</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['3-c'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">nose bleeds</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Throat/ Mouth</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-3'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">sore throat</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-3'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">mouth sore</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-3'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">hoarseness</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-3'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">sleep apnea
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-3'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">swollen glands in the neck</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="small-part">
                            <div class="answer-list">
                                <div class="sub-question">Cardiovascular</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-4'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">heart trouble</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-4'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">chest pain</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-4'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">heart murmur
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-4'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">palpitations</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-4'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">irregular heartbeat</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-4'] == 6.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">varicose veins</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-4'] == 7.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">swelling of the feet/ ankles</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Respiratory</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-5'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">shortness of breath</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-5'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">wheezing</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-5'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">chronic cough
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-5'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">COPD/ emphysema</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Hematologic</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-6'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">bleeding tendency</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-6'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">anemia</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-6'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">recurrent infections
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Endocrine</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-7'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">thyroid problems</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-7'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">heat or cold intolerance</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-7'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">excessive thirst/ appetite
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-7'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">diabetes</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-7'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">glandular or hormone problems</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="small-part">
                            <div class="answer-list">
                                <div class="sub-question">Gastrointestinal</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-8'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">nausea/ vomiting</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-8'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">constipation</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-8'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">diarrhea
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-8'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">blood in your stool</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-8'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">loss of bowel control</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-8'] == 6.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">abdominal pain</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Genitourinary</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-9'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">nausea/ vomiting</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-9'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">constipation</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-9'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">diarrhea
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-9'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">blood in your stool</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-9'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">loss of bowel control</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-9'] == 6.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">abdominal pain</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Musculoskeletal</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-10'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">fractures/ sprains</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-10'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">osteoporosis</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-10'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">joint swelling
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-10'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">joint pain</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-10'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">weakness of muscles or joints</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-10'] == 6.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">muscle pain or cramps</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-10'] == 7.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">back pain</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-10'] == 8.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">difficulty walking</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="small-part">
                            <div class="answer-list">
                                <div class="sub-question">Skin</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-11'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">rashes</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-11'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">psoriasis</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-11'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">joint swelling
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-11'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">joint pain</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-11'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">weakness of muscles or joints</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-11'] == 6.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">muscle pain or cramps</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-11'] == 7.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">back pain</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-11'] == 8.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">difficulty walking</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Neurologic</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-12'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">headache/ migraine</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-12'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">dizziness</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-12'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">convulsions/ seizures
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-12'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">loss of consciousness</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="answer-list">
                                <div class="sub-question">Mental Health</div>
                                <ul class="list">
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-13'] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">depression</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-13'] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">nervousness</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-13'] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">hallucinations
                                        </span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-13'] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">anxiety</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-13'] == 5.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">unusual stress in home life</span>
                                    </li>
                                    <li class="answer">
                                        <span class="result-circle-radio">
                                            <g:if test="${mixedResult['4-13'] == 6.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </span>
                                        <span class="text">unusual stress in work life</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
