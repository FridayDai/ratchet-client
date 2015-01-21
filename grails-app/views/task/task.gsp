<div class="content">

    <div class="task-header">
        <a id="add-task" class="btn btn-right">+ Add Task</a>
    </div>

    <div class="tasks-list">
        <h4 class="overdue">Overdued Tasks:</h4>

        <div class="task-row">
            <g:each in="${taskOverdue}" var="task">
                <g:render template="taskBox" collection="${task}"></g:render>
            </g:each>
        </div>
    </div>

    <div class="tasks-list">
        <h4 class="new">New Tasks:</h4>

        <div class="task-row">
            <g:each in="${taskNew}" var="task">
                <g:render template="taskBox" collection="${task}"></g:render>
            </g:each>

        </div>
    </div>

    <div class="tasks-list">
        <h4 class="future">Future Tasks:</h4>

        <div class="task-row">
            <g:each in="${taskFuture}" var="task">
                <g:render template="taskBox" collection="${task}"></g:render>
            </g:each>

        </div>
    </div>

    <div class="tasks-list">
        <h4 class="complete">Completed Tasks:</h4>

        <div class="task-row">
            <g:each in="${taskCompleted}" var="task">
                <g:render template="taskBox" collection="${task}"></g:render>
            </g:each>
        </div>
    </div>


    <g:form class="task-form ui-hidden" id="task-form" name="task-form">

    %{--<div class="form-group">--}%
    %{--<input id="provider" name="provider" type="text" class="input-group" placeholder="Provider" required/>--}%
    %{--</div>--}%
        <div class="divider"></div>

        <div class="task-content-up">
            <h4>Select a task from the list:</h4>

            <div class="form-box border-color-change" value="sdm">
                <div class="box-header">
                    <div class="header-left bg-color-change inline">
                        <div class="box-icon icon-type sdm"></div>
                        <span class="uppercase">sdm</span>
                    </div>

                    <div class="header-middle inline">
                        <h5 class="color-change">Total Knee Replacement knowledge</h5>
                    </div>

                    <div class="form-group header-right inline">
                        <input type="radio" class="box-radio" name="task-template"/>
                    </div>
                </div>

                <div class="box-content">
                    <p>Please read the following to have an understanding about Total Knee Replacement operation</p>
                </div>
            </div>

            <div class="form-box border-color-change" value="basic">
                <div class="box-header">
                    <div class="header-left bg-color-change inline">
                        <div class="box-icon icon-type basic"></div>
                        <span class="uppercase">basic</span>
                    </div>

                    <div class="header-middle inline">
                        <h5 class="color-change">Pre Qualification</h5>
                    </div>

                    <div class="form-group header-right inline">
                        <input type="radio" class="box-radio" name="task-template"/>
                    </div>
                </div>

                <div class="box-content">
                    <p>Please read the following to have an understanding about Total Knee Replacement operation</p>
                </div>
            </div>

            <div class="form-box border-color-change" value="outcome">
                <div class="box-header">
                    <div class="header-left bg-color-change inline">
                        <div class="box-icon icon-type outcome"></div>
                        <span class="uppercase">outcome</span>
                    </div>

                    <div class="header-middle inline">
                        <h5 class="color-change">Knee Injury and Ostearthritis Outcome</h5>
                    </div>

                    <div class="form-group header-right inline">
                        <input type="radio" class="box-radio" name="task-template"/>
                    </div>
                </div>

                <div class="box-content">
                    <p>Please read the following to have an understanding about Total Knee Replacement operation</p>
                </div>

            </div>
        </div>

        <div class="content">
            <div>
                <h4>When should John Smith receive this?</h4>

                <div class="radio-box">
                    <label>
                        <input type="radio" name="time" value="1"/>
                        Now
                    </label>
                </div>

                <div class="radio-box">
                    <label>
                        <input type="radio" name="time" value="2">
                        A time related to the surgery date
                    </label>
                </div>

            </div>

            <div>
                <h4>Should care team be notified if John Smith didn't complete this task?</h4>

                <div class="radio-box">
                    <label class="label-notify">
                        <input type="radio" name="remind" value="1"/>
                        Yes
                    </label>
                    <label>
                        Remind us if it's not completed in:
                        <select>
                            <option>1</option>
                            <option>2</option>
                        </select>
                        days
                        <select>
                            <option>1</option>
                            <option>2</option>
                        </select>
                        hours upon receiving
                    </label>
                </div>

                <div class="radio-box">
                    <label>
                        <input type="radio" name="remind" value="2">
                        No, it doesn't matter
                    </label>
                </div>

            </div>
        </div>

    </g:form>

</div>
