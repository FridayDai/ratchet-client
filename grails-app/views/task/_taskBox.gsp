<g:if test="${task?.status == "complete"}">
    <div class="box-item" status="${task?.status}" value="${task?.type}">

        <div class="item-header clear">
            <p class="pull-left">ID: ${task?.id}</p>
            <a class="a-remove pull-right" data-id="${task?.id}">
                <div class="box-icon icon-dustbin"></div>
            </a>
        </div>

        <div class="item-left pull-left">
            <ul>
                <li class="item-left-one item-left-li">
                    <div class="box-icon icon-type ${task?.type}"></div>
                    <span class="uppercase">${task?.type}</span>
                </li>
                <li class="item-left-two item-left-li capitalize ${task?.status}">${task?.status}</li>
                <li class="item-datetime item-left-li">
                    Due Date
                    <input class="datetime-picker" data-id="${task?.id}"/>

                    <div class="box-icon icon-calender"></div>
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
                    <h5>${task?.title}</h5>
                </div>

            </div>

            <div class="right-two border-bottom">
                <div class="bullet">
                    <p>Please read the following information to have an understanding about Total Knee, what are you need?</p>
                </div>
            </div>

            <div class="right-three">
                <div class="bullet">
                    <h5>Note:
                        <div class="item-note icon-note"></div>
                    </h5>

                    <div class="note-content">
                        <p class="note-p">do you want to edit me ?</p>
                        <textarea rows="5" cols="20" class="text-area-form required">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>

    </div>
</g:if>
<g:else>
    <div class="box-item ${task?.type}" status="${task?.status}" value="${task?.type}">

        <div class="item-header clear">
            <p class="pull-left">ID: ${task?.id}</p>
            <a class="a-remove pull-right" data-id="${task?.id}">
                <div class="box-icon icon-dustbin"></div>
            </a>
        </div>

        <div class="item-left pull-left">
            <ul>
                <li class="item-left-one item-left-li">
                    <div class="box-icon icon-type ${task?.type}"></div>
                    <span class="uppercase">${task?.type}</span>
                </li>
                <li class="item-left-two item-left-li capitalize ${task?.status}">${task?.status}</li>
                <li class="item-datetime item-left-li">
                    Due Date
                    <input class="datetime-picker" data-id="${task?.id}"/>

                    <div class="box-icon icon-calender"></div>
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
                    <h5 class="h-color">${task?.title}</h5>
                </div>

            </div>

            <div class="right-two border-bottom">
                <div class="bullet">
                    <p>Please read the following information to have an understanding about Total Knee, what are you need?</p>
                </div>
            </div>

            <div class="right-three note-bg">
                <div class="bullet">
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
</g:else>

