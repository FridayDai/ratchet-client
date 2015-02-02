<div>

<g:hiddenField name="task-info-hidden" id="task-info-hidden" data-client-id="${clientId}" data-patient-id="${patientId}"
               data-medical-record-id="${medicalRecordId}"></g:hiddenField>

<div class="task-header">
    <button id="add-task" class="btn btn-right btn-task">+ Add Task</button>
</div>

<div class="tasks-list">
    <h4 class="complete">SENT</h4>

    <div class="task-row" id="task-row-sent">
        <g:each in="${sentTasks}" var="task">
            <g:render template="taskBox" model="['task': task]"></g:render>
        </g:each>

    </div>
</div>

<div class="tasks-list">
    <h4 class="new">SCHEDULE</h4>

    <div class="task-row" id="task-row-schedule">
        <g:each in="${scheduleTasks}" var="task">
            <g:render template="taskBox" model="['task': task]"></g:render>
        </g:each>

    </div>
</div>

<g:form class="task-form ui-hidden" id="task-form" name="task-form">

    <div class="divider"></div>

    <div class="task-content-up">
        <h4>Select a task from the list:</h4>
    <div class="display-flex">
    <g:each in="${tools}" var="tool">
        <g:if test="${tool?.type == 2}">
            <g:set var="toolType" value="basic"></g:set>
        </g:if>
        <g:else>
            <g:set var="toolType" value="outcome"></g:set>
        </g:else>
        <div class="form-box border-color-change" value="${toolType}">
            <div class="box-header">
                <div class="header-left bg-color-change inline">
                    <div class="box-icon icon-type ${toolType}"></div>
                    <span class="uppercase">${toolType}</span>
                </div>

                <div class="header-middle inline">
                    <div class="bullet">
                        <h5 class="color-change">${tool.title}</h5>
                    </div>
                </div>

                <div class="form-group header-right inline">
                    <input type="radio" class="box-radio" name="task-template"
                           data-require-completion="${tool?.requireCompletion}" value="${tool?.id}"/>
                </div>
            </div>

            <div class="box-content">
                <p>${tool.description}</p>
            </div>
        </div>
    </g:each>
    </div>


%{--<div class="form-box border-color-change" value="basic">--}%
%{--<div class="box-header">--}%
%{--<div class="header-left bg-color-change inline">--}%
%{--<div class="box-icon icon-type basic"></div>--}%
%{--<span class="uppercase">basic</span>--}%
%{--</div>--}%

%{--<div class="header-middle inline">--}%
%{--<div class="bullet">--}%
%{--<h5 class="color-change">Pre Qualification</h5>--}%
%{--</div>--}%
%{--</div>--}%

%{--<div class="form-group header-right inline">--}%
%{--<input type="radio" class="box-radio" name="task-template"/>--}%
%{--</div>--}%
%{--</div>--}%

%{--<div class="box-content">--}%
%{--<p>Please read the following to have an understanding about Total Knee Replacement operation</p>--}%
%{--</div>--}%
%{--</div>--}%

%{--<div class="form-box border-color-change" value="outcome">--}%
%{--<div class="box-header">--}%
%{--<div class="header-left bg-color-change inline">--}%
%{--<div class="box-icon icon-type outcome"></div>--}%
%{--<span class="uppercase">outcome</span>--}%
%{--</div>--}%

%{--<div class="header-middle inline">--}%
%{--<div class="bullet">--}%
%{--<h5 class="color-change">Knee Injury and Ostearthritis Outcome</h5>--}%
%{--</div>--}%
%{--</div>--}%

%{--<div class="form-group header-right inline">--}%
%{--<input type="radio" class="box-radio" name="task-template"/>--}%
%{--</div>--}%
%{--</div>--}%

%{--<div class="box-content">--}%
%{--<p>Please read the following to have an understanding about Total Knee Replacement operation</p>--}%
%{--</div>--}%

%{--</div>--}%
%{--</div>--}%

    <div class="form-content">
        <div>
            <h4>* When should ${patient?.name} receive this?</h4>

            <div class="radio-box">
                <label>
                    <input type="radio" name="time" value="2"/>
                    Now
                </label>
            </div>

            <div class="radio-box">
                <label class="label-height">
                    <input type="radio" name="time" value="3">
                    A time related to the surgery date

                    <label id="relative-choices">
                        <select name="relativeInterval" id="relativeInterval">
                            <option value="-1">Before</option>
                            <option value="1">After</option>
                        </select>

                        <select name="receive-week" id="receive-week">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                        weeks
                        <select name="receive-day" id="receive-day">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                        days
                        <select name="receive-hour" id="receive-hour">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                        </select>
                        hours
                        <select name="receive-minute" id="receive-minute">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                        </select>
                        minutes
                    </label>
                </label>
            </div>

        </div>

        <div id="hide-message" class="visible-hidden">
            <h4>* When should the task be due?</h4>

            <div class="radio-box">

                <label>
                    In:
                    <select name="remind-days" id="remind-days">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    days
                    <select name="remind-hours" id="remind-hours">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    hours upon receiving
                </label>
            </div>

        </div>
    </div>

</g:form>

</div>

%{--used in taskJS for render new task--}%
%{--<script type="text/html" id="newTaskTemplate">--}%
%{--<div  class="note-content">--}%
%{--<p><%= "hello GSP"%></p>--}%
%{--<P class="<%key << "name"%>">KEY</P>--}%
%{--<P class="<%= key%>">KEY</P>--}%
%{--<P class="<%key << name%>">KEY</P>--}%
%{--<p>${"<%= key%>"}</p>--}%
%{--<p><!=name !></p>--}%
%{--<p class="note-p  note-color"><%= name %></p>--}%
%{--</div>--}%
%{--</script>--}%

