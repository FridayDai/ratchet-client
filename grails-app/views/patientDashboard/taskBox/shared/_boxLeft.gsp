<%@ page import="org.joda.time.DateTimeZone; org.joda.time.DateTime" %>

<div class="box-item-left">

    <span class="task-date">
        %{--<g:formatDate date="${task?.sendTime}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}"--}%
        %{--format="MMM dd, yyyy"/>--}%

        <% DateTimeZone vancouver = DateTimeZone.forID('America/Vancouver'); %>
        <% DateTime dt = new DateTime(task?.sendTime, vancouver) %>
        <% String month = dt.monthOfYear().getAsShortText() %>
        <% int year = dt.getYear() %>
        <% int day = dt.getDayOfMonth() %>

        <div class="date-month">${month}</div>

        <div class="date-day">${day}</div>

        <div class="date-year">${year}</div>

    </span>

</div>
