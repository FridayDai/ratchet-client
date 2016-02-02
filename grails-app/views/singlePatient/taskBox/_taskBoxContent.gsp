<div class="box-item-content">

    <div class="item-fist middle-font">
        <label>ID:</label>
        <span class="id number-font">${task?.id}</span>
    </div>

    <div class="item-title">
        ${task?.title}
    </div>

    <g:if test="${task?.sendTimeOffset && task.sendTimeOffset != 'null'}">
        <div class="item-datetime relative-sent-time">
            <g:if test="${!(task?.immediate && !task?.surgeryTime)}">
                <% Long timeOffset = Long.valueOf((task?.sendTimeOffset) ?: 0) %>
                <% Long sentTimeDays = timeOffset / (24 * 60 * 60 * 1000) %>
                <g:if test="${sentTimeDays == 0}">
                    <label class="numeral">On Surgery Day</label>
                </g:if>
                <g:else>
                    <span class="numeral label-space number-font">${sentTimeDays.abs()}</span>
                    <label class="label-space">${sentTimeDays.abs() == 1 ? 'Day' : 'Days'}</label>
                    <span class="numeral label-space number-font">${sentTimeDays > 0 ? 'After' : 'Before'}</span>
                    <label>Surgery</label>
                </g:else>
            </g:if>
        </div>
    </g:if>

    <div class="item-context">
        <p>${task?.description}</p>
    </div>

</div>

