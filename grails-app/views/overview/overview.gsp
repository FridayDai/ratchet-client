<div class="overview-content clear">
    <div class="outcome-graph pull-left inner-content">
        <div class="left-header">
            <label class="lbl-outcome">Outcome</label>

            <div class="triangle">
                <span class="triangle-icon triangle-icon-down">
                    <span class="triangle-icon triangle-icon-upper">

                    </span>
                </span>
            </div>
        </div>


        <div class="graph">
            <div class="charts"></div>
        </div>
    </div>

    <div class="activity-task pull-left inner-content">
        <div class="right-header">

            <label>Overdue Tasks</label>

            <div class="triangle">
                <span class="triangle-icon triangle-icon-down">
                    <span class="triangle-icon triangle-icon-upper">

                    </span>
                </span>
            </div>

        </div>

        <div class="task">
            <g:each in="${overdueTask}" var="task">
                <ul class="activity-content">
                    <li class="li-content title-task">${task.title}</li>
                    <li>${task.description}</li>
                    <li class="li-last-update"><g:formatDate date="${new java.util.Date(task.remindTime)}" format="MMM d, yyyy h:mm:ss a"></g:formatDate></li>
                </ul>
            </g:each>
        </div>

        <div class="right-header">
            <label>Activities</label>

            <a href="#" class="btn-remove-giver">
                <div class="icon-refresh"></div>
            </a>

            <div class="triangle">
                <span class="triangle-icon triangle-icon-down">
                    <span class="triangle-icon triangle-icon-upper">

                    </span>
                </span>
            </div>
        </div>

        <div class="activity">
            <g:each in="${activityInfo}" var="activity">
                <ul class="activity-content">
                    <li>${activity.description}</li>
                    <li class="li-last-update"><g:formatDate date="${new java.util.Date(activity.dateCreated)}" format="MMM d, yyyy h:mm:ss a"></g:formatDate></li>
                </ul>
            </g:each>
        </div>



    </div>
</div>
