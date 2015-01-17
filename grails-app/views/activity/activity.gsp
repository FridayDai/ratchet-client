%{--<g:set var="scriptPath" value="patientActivityBundle"/>--}%
%{--<g:set var="cssPath" value="patientActivity"/>--}%
%{--<g:applyLayout name="main">--}%
    %{--<html>--}%
    %{--<head>--}%
        %{--<title>Welcome to ratchet</title>--}%
    %{--</head>--}%

<div class="clear">
    <div class="search">
        <form action="#"></form>
        <label for="activities">Activity Level:</label>
        <select name="activities" id="activities">
            <option value="all" selected="selected">All</option>
            <option value="critical">Critical</option>
            <option value="normal">Normal</option>
        </select>

        <label for="organization" class="lbl-by">By</label>
        <select name="organization" id="organization">
            <option value="all" selected="selected">All</option>
            <option value="ratchet">Ratchet</option>
        </select>
    </div>

    <div class="activity-list-table">
        <table id="activityTable" class="display activityTable">
            <thead>
            <tr>
                <th>Description</th>
                <th>Level</th>
                <th>By</th>
                <th>Time</th>
            </tr>
            </thead>
        </table>
    </div>
</div>

