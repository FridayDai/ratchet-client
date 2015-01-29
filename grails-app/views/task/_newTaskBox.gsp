<div class="box-item ${toolType}" status="${status}" value="${toolType}">

    <div class="item-header clear">
        <p class="pull-left">ID: ${id}</p>
        <a class="a-remove pull-right" data-id="${id}">
            <div class="box-icon icon-dustbin"></div>
        </a>
    </div>

    <div class="item-left pull-left">
        <ul>
            <li class="item-left-one item-left-li">
                <div class="box-icon icon-type ${toolType}"></div>
                <span class="uppercase">${toolType}</span>
            </li>
            <li class="item-left-two item-left-li capitalize ${status}">${status}</li>
            <li class="item-datetime item-left-li">
                Due Date
                <label class="datetime-picker-label datetime-color"></label>
                <input type="hidden" class="datetime-picker" data-id="${id}"/>


                %{--<div class="box-icon icon-calender"></div>--}%
            </li>
            <li class="item-left-four item-left-li btn-dropdown">
                <div class="box-icon icon-share"></div>
                share
                <ul class="dropdown-list ">
                    <li><a>Copy</a></li>

                    <div class="divider"></div>
                    <li><a>Via Message</a></li>

                    <div class="divider"></div>
                    <li><a>Via Email</a></li>

                    <div class="divider"></div>
                    <li><a>Print</a></li>

                    <div class="divider"></div>
                    <li><a>Notify</a></li>
                </ul>

            </li>
        </ul>
    </div>

    <div class="item-right pull-left">

        <div class="right-one border-bottom">
            <div class="bullet">
                <h5 class="h-color">${title}</h5>
            </div>

        </div>

        <div class="right-two border-bottom">
            <div class="bullet">
                <p>${description}</p>
            </div>
        </div>

        <div class="right-three">
            <div class="bullet note-container note-bg">
                <h5 class="note-color">Note:
                    <div class="item-note icon-note"></div>
                </h5>

                <div class="note-content">
                    <p class="note-p  note-color">do you want to edit me ?</p>
                    <textarea rows="5" cols="20" class="text-area-form required">
                    </textarea>
                </div>
            </div>
        </div>
    </div>

</div>
