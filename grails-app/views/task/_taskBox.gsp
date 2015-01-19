<div class="box-item ${task?.type}" status="${task?.status}" value="${task?.type}">

    <div class="item-header">
        ID: ${task?.id}
        <a class="a-remove pull-right" data-id="${task?.id}">
            remove
        </a>
    </div>

    <div class="item-left pull-left">
        <ul>
            <li class="item-left-li">${task?.type}</li>
            <li>${task?.status}</li>
            <li class="item-datetime">
                Due Date
                <input class="datetime-picker" data-id="${task?.id}"/>
            </li>
            <li>Share</li>
        </ul>
    </div>

    <div class="item-right pull-left">
        <div class="right-one border-bottom">${task?.title}</div>

        <div class="right-two border-bottom">
            <p>Please read the following information to have an understanding about Total Knee</p>
        </div>

        <div class="right-three">
            <h5>Note<span class="item-note">edit</span></h5>

            <div class="note-content"></div>
        </div>
    </div>

</div>
