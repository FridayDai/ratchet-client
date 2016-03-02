
<div class="box-item-header">

    <div>
        <span class="task-date">
            <g:formatDate date="${taskTime}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                          format="MMM dd, yyyy"/>
        </span>

        <div class="number-id">
            <label>ID:</label>
            <span class="number-font">${task?.id}</span>
        </div>

    </div>

    <div class="item-title">
        ${task?.title}
    </div>

    <g:if test="${task?.sendTimeOffset && task.sendTimeOffset != 'null'}">
        <div class="item-datetime">
            <g:if test="${!(task?.immediate && !task?.surgeryTime)}">
                <% Long timeOffset = Long.valueOf((task?.sendTimeOffset) ?: 0) %>
                <% Long sentTimeDays = timeOffset / (24 * 60 * 60 * 1000) %>
                <g:if test="${sentTimeDays == 0}">
                    <label class="numeral">on surgery day</label>
                </g:if>
                <g:else>
                    <span class="label-space">${sentTimeDays.abs()}</span>
                    <label class="label-space">${sentTimeDays.abs() == 1 ? 'day' : 'days'}</label>
                    <span class="label-space">${sentTimeDays > 0 ? 'after' : 'before'}</span>
                    <label>surgery</label>
                </g:else>
            </g:if>
        </div>
    </g:if>
</div>
