<div class="content">

    <div class="task-header">
        <button id="add-task" class="btn btn-right">+ Add Task</button>
    </div>

    <div class="tasks-list">
        <h4>Overdued Tasks:</h4>

        <div class="task-row">
            <g:each in="${taskOverdue}" var="task">
                <g:render template="taskBox" collection="${task}"></g:render>
            </g:each>
        </div>
    </div>

    <div class="tasks-list">
        <h4>New Tasks:</h4>

        <div class="task-row">
            <g:each in="${taskNew}" var="task">
                <g:render template="taskBox" collection="${task}"></g:render>
            </g:each>

        </div>
    </div>

    <div class="tasks-list">
        <h4>Future Tasks:</h4>

        <div class="task-row">
            <g:each in="${taskFuture}" var="task">
                <g:render template="taskBox" collection="${task}"></g:render>
            </g:each>

        </div>
    </div>

    <div class="tasks-list">
        <h4>Completed Tasks:</h4>

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

        <div class="content">
            <h4>Select a task from the list:</h4>

            <div class="form-box border-color-change" value="SDM">
                <div class="box-header">
                    <div class="header-left bg-color-change inline">
                        %{--<asset:image src=""/>SDM--}%
                        <span>SDM</span>
                    </div>

                    <div class="header-middle inline">
                        <h5>Total Knee Replacement knowledge</h5>
                    </div>

                    <div class="header-right inline">
                        <g:checkBox name="checkbox1" value="" checked="false"/>
                    </div>
                </div>

                <div class="box-content">
                    <p>Please read the following to have an understanding about Total Knee Replacement operation</p>
                </div>
            </div>

            <div class="form-box border-color-change" value="basic">
                <div class="box-header">
                    <div class="header-left bg-color-change inline">
                        %{--<asset:image src=""/>SDM--}%
                        <span>BASIC</span>
                    </div>

                    <div class="header-middle inline">
                        <h5>Pre Qualification</h5>
                    </div>

                    <div class="header-right inline">
                        <g:checkBox name="checkbox1" value="" checked="false"/>
                    </div>
                </div>

                <div class="box-content">
                    <p>Please read the following to have an understanding about Total Knee Replacement operation</p>
                </div>
            </div>

            <div class="form-box border-color-change" value="outcome">
                <div class="box-header">
                    <div class="header-left bg-color-change inline">
                        %{--<asset:image src=""/>SDM--}%
                        <span>OUTCOME</span>
                    </div>

                    <div class="header-middle inline">
                        <h5>Knee Injury and Ostearthritis Outcome</h5>
                    </div>

                    <div class="header-right inline">
                        <g:checkBox name="checkbox1" value="" checked="false"/>
                    </div>
                </div>

                <div class="box-content">
                    <p>Please read the following to have an understanding about Total Knee Replacement operation</p>
                </div>
            </div>

            <div>
                <h4>When should John Smith receive this?</h4>

                <div class="checkbox">
                    <label>
                        <input type="radio" name="time" value="1"/>
                        Now
                    </label>
                </div>

                <div class="checkbox">
                    <label>
                        <input type="radio" name="time" value="2">
                        A time related to the surgery date
                    </label>
                </div>

            </div>

            <div>
                <h4>Should care team be notified if John Smith didn't complete this task?</h4>

                <div class="checkbox">
                    <label>
                        <input type="radio" name="remind" value="1"/>
                        Yes
                    </label>
                </div>

                <div class="checkbox">
                    <label>
                        <input type="radio" name="remind" value="2">
                        No, it doesn't matter
                    </label>
                </div>

            </div>

        </div>

    </g:form>

    <g:form class="note-form ui-hidden" id="task-form" name="task-form">
        <div class="form-group form-content">
            <textarea rows="5" cols="20" class="text-area-form required">
            </textarea>
        </div>
    </g:form>

</div>
