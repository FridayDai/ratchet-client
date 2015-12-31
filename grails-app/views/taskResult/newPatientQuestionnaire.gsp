<g:set var="cssPath" value="task/patientQuestionnaire/newPatient.css"/>
<g:set var="printSheetPath" value="task/patientQuestionnaire/newPatientPrint.css"/>

<g:applyLayout name="taskResult">
    <html>
    <head>
        <title>${Task?.title} Results</title>
    </head>

    <body>
    <div class="task-result-content">
        <div class="task-list-wrapper container">

            <div class="page page-1 clear">
                <div class="task-list-part part-0">
                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">1.</span>
                            <span>How did you first hear of us?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Patient of us:</span>
                                    <span class="underline-text">${mixedResult['1-1s']}</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Internet</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['1-c'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Friend/ family member:</span>
                                    <span class="underline-text">${mixedResult['1-3s']}</span>
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
                                    <span class="text">Other:</span>
                                    <span class="underline-text">${mixedResult['1-5s']}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">2.</span>
                            <span> What is the primary reason for your visit?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['2'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Evaluation/ diagnosis/ treatment</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['2'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Second opinion</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['2'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Education/ information</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['2'] == 4.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Surgical planning</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">3.</span>
                            <span> How long ago did your current symptoms begin?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Less than 2 weeks ago</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">2 weeks to less than 8 weeks ago</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">8 weeks to less than 3 months ago</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 4.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">3 months to less than 6 months ago</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 5.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">6 to 12 months ago</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['3-c'] == 6.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">More than 12 months ago:
                                        <span class="underline-text">${mixedResult['3-6s']}
                                        </span>
                                        years ago.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">4.</span>
                            <span> Please describe your current problem/ sysmptoms</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="text">${mixedResult['4']}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">5.</span>
                            <span> What is your CURRENT work status?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['5'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">I’m not working</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['5'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">I work part-time</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['5'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">I work full-time</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">6.</span>
                            <span> Is this a work-related injury?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['6'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['6'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">7.</span>
                            <span> Have you filed a Worker’s Compensation claim for your back/ neck symptoms?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['7-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes, date:</span>
                                    <span class="underline-text">${mixedResult['7-1s']}</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['7-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">8.</span>
                            <span>Have you worked with a lawyer as a result of your injury?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['8'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['8'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="task-list-part part-1">
                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">9.</span>
                            <span>Did your pain begin after a car accident?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['9-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['9-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                            </ul>

                            <div class="sub-question-list">
                                <div class="sub-question answer">
                                    <span class="sub-question-title">Date of accident:</span>
                                    <span class="underline-text">${mixedResult['9-e-1']}</span>
                                </div>

                                <div class="sub-question">
                                    <div class="sub-question-title">Briefly describe the details of the accident:</div>

                                    <p class="sub-description">${mixedResult['9-e-2'] ?: 'N/A'}</p>
                                </div>

                                <div class="sub-question">
                                    <div class="sub-question-title">Describe the pattern of symptoms over the first 1-4 weeks after the accident:</div>

                                    <p class="sub-description">${mixedResult['9-e-3'] ?: 'N/A'}</p>
                                </div>

                                <div class="sub-question">
                                    <div class="sub-question-title">When did you first notice symptoms?</div>

                                    <div class="sub-answer-list">
                                        <ul class="list">

                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['9-e-4'] == 1.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">Immediately</span>
                                            </li>
                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['9-e-4'] == 2.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">24-48 hours</span>
                                            </li>
                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['9-e-4'] == 3.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">3-7 days</span>
                                            </li>
                                        </ul>

                                        <ul class="list">

                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['9-e-4'] == 4.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">1-2 weeks</span>
                                            </li>
                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['9-e-4'] == 5.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">2-4 weeks</span>
                                            </li>
                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['9-e-4'] == 6.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">> 1 month</span>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                                <div class="sub-question">
                                    <div class="sub-question-title">When did you first report these to a doctor?</div>

                                    <p class="sub-description">${mixedResult['9-e-5'] ?: 'N/A'}</p>
                                </div>

                                <div class="sub-question">
                                    <div class="sub-question-title">If there was a delay between the symptoms starting and your first report, please explain:</div>

                                    <p class="sub-description">${mixedResult['9-e-6'] ?: 'N/A'}</p>
                                </div>

                                <div class="sub-question">
                                    <div class="sub-question-title">Did you suffer any other injuries when you hurt your spine?</div>

                                    <div class="sub-answer-list">
                                        <ul class="list">

                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['9-e-7-c'] == 1.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">Yes</span>
                                            </li>
                                        </ul>

                                        <ul class="list">

                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['9-e-7-c'] == 2.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">No</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="sub-question-title">If yes, please list:</div>

                                    <p class="sub-description">${mixedResult['9-e-7-1s'] ?: 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">10.</span>
                            <span>Have you ever been involved in a previous car accident?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['10-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes, date:</span>
                                    <span class="underline-text">${mixedResult['10-1s']}</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['10-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                            </ul>

                            <div class="sub-question-list">
                                <div class="sub-question">
                                    <div class="sub-question-title">Was your back or neck injured?</div>

                                    <div class="sub-answer-list">
                                        <ul class="list">

                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['10-e-1-c'] == 1.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">Yes</span>
                                            </li>
                                        </ul>

                                        <ul class="list">

                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['10-e-1-c'] == 2.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">No</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="sub-question">
                                    <div class="sub-question-title">If yes, did the injury resolve?</div>

                                    <div class="sub-answer-list">
                                        <ul class="list">

                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['10-e-2-c'] == 1.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">Yes</span>
                                            </li>
                                        </ul>

                                        <ul class="list">

                                            <li class="answer">
                                                <span class="result-circle-radio">
                                                    <g:if test="${mixedResult['10-e-2-c'] == 2.toString()}">
                                                        <span class="result-circle-radio-checked">
                                                        </span>
                                                    </g:if>
                                                </span>
                                                <span class="text">No</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="sub-question">
                                    <div class="sub-question-title">If that injury did NOT resolve, what treatment(s), if any, did you require on an ongoing basis?</div>

                                    <p class="sub-description">${mixedResult['10-e-3'] ?: 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="page-footer">Page 1</div>

            <div class="page-break"></div>

            <div class="page page-2 clear">
                <div class="task-list-part part-0">
                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">11.</span>
                            <span>Is your pain due to an injury not covered in the questions above?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['11-c'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes, date of injury:</span>
                                    <span class="underline-text">${mixedResult['11-1s']}</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['11-c'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                            </ul>

                            <div class="sub-question">
                                <div class="sub-question-title">Describe the injury:</div>

                                <p class="sub-description">${mixedResult['10-e-1'] ?: 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">12.</span>
                            <span>How do each of the following activities affect your pain?</span>
                        </div>

                        <div class="answer-list">
                            <table class="answer-table">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>NO <br> Change</th>
                                    <th>Relieves <br> Pain</th>
                                    <th>Increases <br> Pain</th>
                                    <th>After <br> HowLong?</th>
                                </tr>
                                </thead>

                                <tbody>
                                <g:set var="subQuestion12" value="['Sitting', 'Walking', 'Standing', 'Lying down',
                                                                   'Bending forward', 'Bending backward', 'Lifting',
                                                                   'Coughing/ sneezing', 'Changing positions']"/>
                                <g:set var="subQuestion12Time"
                                       value="['5 mins', '15 mins', '30 mins', '1 hour',
                                               '2 hours', '4 hours', '8 hours']"/>
                                <g:each in="${subQuestion12}" var="subQuestion" status="j">
                                    <tr class="row">
                                        <th>${subQuestion}</th>
                                        <td>
                                            <g:if test="${mixedResult["12-${j}-c"] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </td>
                                        <td>
                                            <g:if test="${mixedResult["12-${j}-c"] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </td>
                                        <td>

                                            <g:if test="${mixedResult["12-${j}-c"] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>

                                        </td>

                                        <td>${mixedResult["12-${j}-s"] ? (subQuestion12Time[mixedResult["12-${j}-s"]?.toInteger()]) : ""}</td>
                                    </tr>
                                </g:each>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">13.</span>
                            <span>What other activities, motions, or positions affect your symptoms?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="text">${mixedResult['13']}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">14.</span>
                            <span>What do you do to relieve your pain?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="text">${mixedResult['14']}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">15.</span>
                            <span>Bladder function:</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['15'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Normal</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['15'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Loss of control or accidents</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['15'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Difficulty starting urination</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['15'] == 4.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Sense of urgency</span>
                                </li>
                                %{--<li class="answer">--}%
                                    %{--<span class="result-circle-radio">--}%
                                        %{--<g:if test="${mixedResult['15'] == 5.toString()}">--}%
                                            %{--<span class="result-circle-radio-checked">--}%
                                            %{--</span>--}%
                                        %{--</g:if>--}%
                                    %{--</span>--}%
                                    %{--<span class="text">Rather not answer</span>--}%
                                %{--</li>--}%
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">16.</span>
                            <span>Bowel function:</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['16'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Normal</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['16'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Loss of control or accidents</span>
                                </li>
                                %{--<li class="answer">--}%
                                    %{--<span class="result-circle-radio">--}%
                                        %{--<g:if test="${mixedResult['16'] == 3.toString()}">--}%
                                            %{--<span class="result-circle-radio-checked">--}%
                                            %{--</span>--}%
                                        %{--</g:if>--}%
                                    %{--</span>--}%
                                    %{--<span class="text">Rather not answer</span>--}%
                                %{--</li>--}%
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">17.</span>
                            <span>Problem with sexual function:</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['17'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['17'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes</span>
                                </li>
                                %{--<li class="answer">--}%
                                    %{--<span class="result-circle-radio">--}%
                                        %{--<g:if test="${mixedResult['17'] == 3.toString()}">--}%
                                            %{--<span class="result-circle-radio-checked">--}%
                                            %{--</span>--}%
                                        %{--</g:if>--}%
                                    %{--</span>--}%
                                    %{--<span class="text">Rather not answer</span>--}%
                                %{--</li>--}%
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">18.</span>
                            <span>Loss of sensation around the groin, genitals, or buttocks?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['18'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['18'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="task-list-part part-1">

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">19.</span>
                            <span>Weakness in leg/foot:</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['19'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['19'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes - right leg</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['19'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes - left leg</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['19'] == 4.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes - both legs</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">20.</span>
                            <span>Weakness in arm/hand:</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['20'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['20'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes - right arm</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['20'] == 3.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes - left arm</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['20'] == 4.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes - both arms</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">21.</span>
                            <span>Does your pain interfere with your sleep?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="list">

                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['21'] == 1.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">No</span>
                                </li>
                                <li class="answer">
                                    <span class="result-circle-radio">
                                        <g:if test="${mixedResult['21'] == 2.toString()}">
                                            <span class="result-circle-radio-checked">
                                            </span>
                                        </g:if>
                                    </span>
                                    <span class="text">Yes</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">22.</span>
                            <span>Which of the folowing treatments have you had and what was the outcome?</span>
                        </div>

                        <div class="answer-list">
                            <table class="answer-table">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>N/A</th>
                                    <th>Helped</th>
                                    <th>Made me<br> Worse</th>
                                    <th>No <br> Difference</th>
                                </tr>
                                </thead>

                                <tbody>
                                <g:set var="subQuestion22"
                                       value="['Massage', 'Physical Therapy', 'Chiropractic Therapy', 'Spinal Injections']"/>

                                <g:each in="${subQuestion22}" var="subQuestion" status="j">
                                    <tr class="row">
                                        <th>${subQuestion}</th>
                                        <td>
                                            <g:if test="${mixedResult["22-${j}"] == 1.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </td>
                                        <td>
                                            <g:if test="${mixedResult["22-${j}"] == 2.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>
                                        </td>
                                        <td>
                                            <g:if test="${mixedResult["22-${j}"] == 3.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>

                                        </td>
                                        <td>
                                            <g:if test="${mixedResult["22-${j}"] == 4.toString()}">
                                                <span class="result-circle-radio-checked">
                                                </span>
                                            </g:if>

                                        </td>
                                    </tr>
                                </g:each>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="question-list">
                        <div class="question">
                            <span class="question-number">23.</span>
                            <span>Please list the dates of any of the following tests you have had for your current condition in the last 2 years?</span>
                        </div>

                        <div class="answer-list">
                            <ul class="special-ul">
                                <li class="special-list">
                                    <div class="special-question-title">Regular x-rays</div>

                                    <div class="text">${mixedResult["23-1"] ?: 'N/A'}</div>
                                </li>
                                <li class="special-list">
                                    <div class="special-question-title">MRI</div>

                                    <div class="text">${mixedResult["23-2"] ?: 'N/A'}</div>
                                </li>
                                <li class="special-list">
                                    <div class="special-question-title">CT scan</div>

                                    <div class="text">${mixedResult["23-3"] ?: 'N/A'}</div>
                                </li>
                                <li class="special-list">
                                    <div class="special-question-title">Myelogram</div>

                                    <div class="text">${mixedResult["23-4"] ?: 'N/A'}</div>
                                </li>
                                <li class="special-list">
                                    <div class="special-question-title">Bone scan</div>

                                    <div class="text">${mixedResult["23-5"] ?: 'N/A'}</div>
                                </li>
                                <li class="special-list">
                                    <div class="special-question-title">EMG/NCV</div>

                                    <div class="text">${mixedResult["23-6"] ?: 'N/A'}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <div class="page-footer">Page 2</div>

        </div>
    </div>
    </body>
    </html>
</g:applyLayout>
