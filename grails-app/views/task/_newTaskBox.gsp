<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>
<div class="box-item ${task?.status}">

    <div class="item-header">
        <p>ID: ${task?.id}</p>
    </div>

    <div class="item-title">
        <h4>${task?.title}The Disabilities of the Arm, Shoulder and Hand Score</h4>
    </div>

    <div class="item-status ${task?.status}">
        <label class="uppercase status-background">${task?.status}complete</label>
    </div>

    <div class="item-datetime">
        <label>DUE: <g:formatDate date="${new java.util.Date()}" format="MMM/dd/yyyy, HH:mm aaa"></g:formatDate></label>
    </div>

    <div class="item-context">
        <p>Please read the following information to have an understanding about Total Knee, what are you need? what are you need? what are you need? what are you need?</p>
    </div>

    <div class="item-datetime">
        <label>Send Time: <g:formatDate date="${new java.util.Date()}" format="MMM/dd/yyyy, HH:mm aaa"></g:formatDate></label>
    </div>

    <div>
        <button class="task-email" data-task-id="${task?.id}">Click to notify</button>
    </div>

</div>

    %{--<div class="item-left pull-left">--}%
        %{--<ul>--}%
            %{--<li class="item-left-one item-left-li">--}%
                %{--<div class="box-icon icon-type ${task?.type}"></div>--}%
                %{--<span class="uppercase">${task?.type}</span>--}%
            %{--</li>--}%
            %{--<li class="item-left-two item-left-li capitalize ${task?.status}">${task?.status}</li>--}%
            %{--<li class="item-datetime item-left-li">--}%
                %{--Due Date--}%
                %{--<label class="datetime-picker-label"></label>--}%
                %{--<input type="hidden" class="datetime-picker" data-id="${task?.id}"/>--}%

                %{--<div class="box-icon icon-calender"></div>--}%
            %{--</li>--}%
            %{--<li class="item-left-four item-left-li btn-dropdown">--}%
                %{--<div class="box-icon icon-share"></div>--}%
                %{--share--}%
                %{--<ul class="dropdown-list ">--}%
                    %{--<li><a>Copy</a></li>--}%

                    %{--<div class="divider"></div>--}%
                    %{--<li><a>Via Message</a></li>--}%

                    %{--<div class="divider"></div>--}%
                    %{--<li><a>Via Email</a></li>--}%

                    %{--<div class="divider"></div>--}%
                    %{--<li><a>Print</a></li>--}%

                    %{--<div class="divider"></div>--}%
                    %{--<li><a>Notify</a></li>--}%
                %{--</ul>--}%

            %{--</li>--}%
        %{--</ul>--}%
    %{--</div>--}%

    %{--<div class="item-right pull-left">--}%

        %{--<div class="right-one border-bottom">--}%
            %{--<div class="bullet">--}%
                %{--<h5>${task?.title}</h5>--}%
            %{--</div>--}%

        %{--</div>--}%

        %{--<div class="right-two border-bottom">--}%
            %{--<div class="bullet">--}%
                %{--<p>Please read the following information to have an understanding about Total Knee, what are you need?</p>--}%
            %{--</div>--}%
        %{--</div>--}%

        %{--<div class="right-three">--}%
            %{--<div class="bullet note-container">--}%
                %{--<h5>Note:--}%
                    %{--<div class="item-note icon-note"></div>--}%
                %{--</h5>--}%

                %{--<div class="note-content">--}%
                    %{--<p class="note-p">do you want to edit me ?</p>--}%
                    %{--<textarea rows="5" cols="20" class="text-area-form required">--}%
                    %{--</textarea>--}%
                %{--</div>--}%
            %{--</div>--}%
        %{--</div>--}%
    %{--</div>--}%

%{--</div>--}%



%{--<div class="box-item ${toolType}" status="${status}" value="${toolType}">--}%

%{--<div class="item-header clear">--}%
%{--<p class="pull-left">ID: ${id}</p>--}%
%{--<a class="a-remove pull-right" data-id="${id}">--}%
%{--<div class="box-icon icon-dustbin"></div>--}%
%{--</a>--}%
%{--</div>--}%

%{--<div class="item-left pull-left">--}%
%{--<ul>--}%
%{--<li class="item-left-one item-left-li">--}%
%{--<div class="box-icon icon-type ${toolType}"></div>--}%
%{--<span class="uppercase">${toolType}</span>--}%
%{--</li>--}%
%{--<li class="item-left-two item-left-li capitalize ${status}">${status}</li>--}%
%{--<li class="item-datetime item-left-li">--}%
%{--Due Date--}%
%{--<label class="datetime-picker-label datetime-color">--}%
%{--<g:formatDate date="${sendTime}" format="yyyy-MM-dd HH:mm:ss"></g:formatDate>--}%
%{--</label>--}%
%{--<input type="hidden" class="datetime-picker" data-id="${id}"/>--}%


%{--<div class="box-icon icon-calender"></div>--}%
%{--</li>--}%
%{--<li class="item-left-four item-left-li btn-dropdown">--}%
%{--<div class="box-icon icon-share"></div>--}%
%{--share--}%
%{--<ul class="dropdown-list ">--}%
%{--<li><a>Copy</a></li>--}%

%{--<div class="divider"></div>--}%
%{--<li><a>Via Message</a></li>--}%

%{--<div class="divider"></div>--}%
%{--<li><a>Via Email</a></li>--}%

%{--<div class="divider"></div>--}%
%{--<li><a>Print</a></li>--}%

%{--<div class="divider"></div>--}%
%{--<li><a>Notify</a></li>--}%
%{--</ul>--}%

%{--</li>--}%
%{--</ul>--}%
%{--</div>--}%

%{--<div class="item-right pull-left">--}%

%{--<div class="right-one border-bottom">--}%
%{--<div class="bullet">--}%
%{--<h5 class="h-color">${title}</h5>--}%
%{--</div>--}%

%{--</div>--}%

%{--<div class="right-two border-bottom">--}%
%{--<div class="bullet">--}%
%{--<p>${description}</p>--}%
%{--</div>--}%
%{--</div>--}%

%{--<div class="right-three">--}%
%{--<div class="bullet note-container note-bg">--}%
%{--<h5 class="note-color">Note:--}%
%{--<div class="item-note icon-note"></div>--}%
%{--</h5>--}%

%{--<div class="note-content">--}%
%{--<p class="note-p  note-color">do you want to edit me ?</p>--}%
%{--<textarea rows="5" cols="20" class="text-area-form required">--}%
%{--</textarea>--}%
%{--</div>--}%
%{--</div>--}%
%{--</div>--}%
%{--</div>--}%

%{--</div>--}%
%{--</g:else>--}%
