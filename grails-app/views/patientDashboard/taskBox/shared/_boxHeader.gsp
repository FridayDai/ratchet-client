
<div class="box-item-header">


        <div class="task-date">
            <g:formatDate date="${taskTime}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                          format="MMM dd, yyyy"/>
            &mdash;
            <g:if test="${task?.sendTimeOffset && task.sendTimeOffset != 'null'}">
                <span class="item-datetime">
                    <g:if test="${!(task?.immediate && !task?.surgeryTime)}">
                        <% Long timeOffset = Long.valueOf((task?.sendTimeOffset) ?: 0) %>
                        <% Long sentTimeDays = timeOffset / (24 * 60 * 60 * 1000) %>
                        <g:if test="${sentTimeDays == 0}">
                            <label class="numeral">On Surgery Day</label>
                        </g:if>
                        <g:else>
                            <span class="label-space">${sentTimeDays.abs()}</span>
                            <label class="label-space">${sentTimeDays.abs() == 1 ? 'Day' : 'Days'}</label>
                            <span class="label-space">${sentTimeDays > 0 ? 'After' : 'Before'}</span>
                            <label>Surgery</label>
                        </g:else>
                    </g:if>
                </span>
            </g:if>
        </div>



    <div class="item-title">
        ${task?.title}
    </div>

    <div>
        <span class="item-provider">
            Requested by <strong>${task?.providerName}</strong>
        </span>

        <div class="number-id">
            ID: <span class="id">${task?.id}</span>
        </div>
    </div>
</div>
