(function ($, undefined) {
    'use strict';

    var team = RC.pages.team = RC.pages.team || {};

    //Define provider page global variables
    var opts = {
        defaultConfirmArguments: {
            confirmTeamFormArguments: {
                title: RC.constants.confirmTeamTitle,
                content: RC.constants.confirmContent,
                height: 200,
                width: 400
            },

            confirmGiverFormArguments: {
                title: RC.constants.confirmGiverTitle,
                content: RC.constants.confirmContent,
                height: 200,
                width: 400
            },

            editGiverFormArguments: {
                title: RC.constants.editGiverTitle,
                content: RC.constants.confirmContent,
                height: 200,
                width: 400
            },

            deleteTeamWaringArguments: {
                title: RC.constants.deleteTeamWaringTitle,
                message: RC.constants.warningTip
            },

            deleteGiverWaringArguments: {
                title: RC.constants.deleteGiverWaringTitle,
                message: RC.constants.warningTip
            }
        },
        urls: {
            query: "{0}/getPatients".format(RC.constants.baseUrl),
            cares: "{0}/clients/".format(RC.constants.baseUrl),
            getStaffs: "{0}/getStaffs".format(RC.constants.baseUrl)
        }

    };


    /**
     * bind add team event
     * @private
     */
    function _bindAddTeamEvent() {
        // new a record
        $("#add-member").on("click", function (e) {
            e.preventDefault();
            $(".addTeamForm")[0].reset();
            var grandParent = $(this).parent();
            var medicalRecordId = grandParent.find('.medicalRecordId').attr('value');
            var clientId = grandParent.find('.clientId').attr('value');
            var patientId = grandParent.find('.patientId').attr('value');

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmTeamFormArguments, {
                element: $(".addTeamForm"),
                okCallback: function () {
                    if ($(".addTeamForm").valid()) {
                        var staffId = $("#selectStaff").val();
                        //var isPrimaryCareTeam;
                        //$("#primaryCareTeam").attr("checked") === "checked" ? isPrimaryCareTeam = true : isPrimaryCareTeam = false;

                        var careTeamInfo = {
                            medicalRecordId: medicalRecordId,
                            staffId: staffId
                            //isPrimaryCareTeam: isPrimaryCareTeam
                        };
                        _addCareTeam(clientId, patientId, careTeamInfo);
                        return true;
                    }
                    return false;
                }
            }));
        });
    }

    function _addCareTeam(clientId, patientId, careTeamInfo) {
        $.ajax({
            url: opts.urls.cares + clientId + '/patients/' + patientId + '/care_team',
            type: 'POST',
            data: careTeamInfo,
            dataType: 'json'
            //success: function () {
            //}
        });
    }

    /**
     *
     * @param clientId
     * @param patientId
     * @param careTeamInfo
     * @private
     */
    function _addCareTeam(clientId, patientId, careTeamInfo) {
        $.ajax({
            url: opts.urls.cares + clientId + '/patients/' + patientId + '/care_team',
            type: 'POST',
            data: careTeamInfo
        }).done(function (data) {
            $("#careTeamBody").append(data);
            _removeCareTeam();
        });
    }

    /**
     * bind invite giver event
     * @private
     */
    function _bindInviteGiverEvent() {
        // new a record
        $("#invite-giver").on("click", function (e) {
            e.preventDefault();
            $(".inviteGiverForm")[0].reset();
            var grandParent = $(this).parent();
            var medicalRecordId = grandParent.find('.medicalRecordId').attr('value');
            var clientId = grandParent.find('.clientId').attr('value');
            var patientId = grandParent.find('.patientId').attr('value');

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmGiverFormArguments, {
                element: $(".inviteGiverForm"),
                okCallback: function () {
                    if ($(".inviteGiverForm").valid()) {

                        var email = $("#giver-email").val();
                        var relationship = $("#relationship").val();

                        var careGiverInfo = {
                            medicalRecordId: medicalRecordId,
                            email: email,
                            relationship: relationship
                        };
                        _addCareGiver(clientId, patientId, careGiverInfo);
                        //_add();
                        return true;
                    }
                    return false;
                }
            }));
        });
    }

    function _addCareGiver(clientId, patientId, careGiverInfo) {
        $.ajax({
            url: opts.urls.cares + clientId + '/patients/' + patientId + '/care_giver',
            type: 'POST',
            data: careGiverInfo,
            dataType: 'json'
            //success: function () {
            //}
        });
    }

    /**
     *
     * @param clientId
     * @param patientId
     * @param careGiverInfo
     * @private
     */
    function _addCareGiver(clientId, patientId, careGiverInfo) {
        $.ajax({
            url: opts.urls.cares + clientId + '/patients/' + patientId + '/care_giver',
            type: 'POST',
            data: careGiverInfo
        }).done(function (data) {
            $("#careGiverBody").append(data);
            _removeCareGiver();
        });
    }

    /**
     * remove care team event
     * @private
     */
    function _removeCareTeam() {
        $(".btn-remove-team").on("click", function (e) {
            e.preventDefault();
            var grandParent = $(this).parent().parent();
            var careTeamId = grandParent.find(".p-id").attr("value");
            var medicalRecordId = grandParent.find('.medicalRecordId').attr('value');
            var clientId = grandParent.find('.clientId').attr('value');
            var patientId = grandParent.find('.patientId').attr('value');
            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.deleteTeamWaringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    _removeTeam(clientId, patientId, careTeamId, medicalRecordId, grandParent);
                }
            }));
        });
    }

    function _removeTeam(clientId, patientId, careTeamId, medicalRecordId, grandParent) {
        $.ajax({
            url: opts.urls.cares + clientId + '/patients/' + patientId + '/care_team/' + careTeamId + '/' + medicalRecordId,
            type: 'DELETE',
            success: function () {
                grandParent.remove();
            }
        });
    }

    /**
     *
     * @param clientId
     * @param patientId
     * @param careTeamId
     * @param medicalRecordId
     * @param grandParent
     * @private
     */
    function _removeTeam(clientId, patientId, careTeamId, medicalRecordId, grandParent) {
        $.ajax({
            url: opts.urls.cares + clientId + '/patients/' + patientId + '/care_team/' + careTeamId + '/' + medicalRecordId,
            type: 'DELETE',
            success: function () {
                grandParent.remove();
            }
        });
    }

    /**
     * remove care giver event
     * @private
     */
    function _removeCareGiver() {
        $(".btn-remove-giver").on("click", function (e) {
            e.preventDefault();
            var grandParent = $(this).parent().parent();
            var careGiverId = grandParent.find(".p-id").attr("value");
            var medicalRecordId = grandParent.find('.medicalRecordId').attr('value');
            var clientId = grandParent.find('.clientId').attr('value');
            var patientId = grandParent.find('.patientId').attr('value');
            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.deleteGiverWaringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    _removeGiver(clientId, patientId, careGiverId, medicalRecordId, grandParent);
                }
            }));
        });
    }

    function _removeGiver(clientId, patientId, careGiverId, medicalRecordId, grandParent) {
        $.ajax({
            url: opts.urls.cares + clientId + '/patients/' + patientId + '/care_giver/' + careGiverId + '/' + medicalRecordId,
            type: 'DELETE',
            success: function () {
                grandParent.remove();
            }
        });
    }

    /**
     *
     * @param clientId
     * @param patientId
     * @param careGiverId
     * @param medicalRecordId
     * @param grandParent
     * @private
     */
    function _removeGiver(clientId, patientId, careGiverId, medicalRecordId, grandParent) {
        $.ajax({
            url: opts.urls.cares + clientId + '/patients/' + patientId + '/care_giver/' + careGiverId + '/' + medicalRecordId,
            type: 'DELETE',
            success: function () {
                grandParent.remove();
            }
        });
    }

    /**
     * edit care giver event
     * @private
     */
    function _EditCareGiver() {
        // Edit record
        $('.btn-edit').on('click', function (e) {
            e.preventDefault();

            var grandParent = $(this).parent().parent();
            $("#giver-emid").val(grandParent.find('.p-id').attr('value'));
            $("#giver-name").val(grandParent.find('.p-name').attr('value'));
            $("#giver-email").val(grandParent.find('.p-email').attr('value'));
            $("#relationship").val(grandParent.find('.p-relationship').attr('value'));

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editGiverFormArguments, {
                element: $(".inviteGiverForm"),
                okCallback: function () {
                }
            }));
        });
    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect() {
        $('#selectStaff').select2({
            ajax: {
                transport: function (params) {
                    params.beforeSend = function () {
                        RC.common.progress(false);
                    };
                    return $.ajax(params);
                },
                url: opts.urls.getStaffs,
                cache: "true",
                data: function (term) {
                    return {
                        term: term
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.firstName + " " + item.lastName
                        });
                    });
                    return {
                        results: myResults
                    };
                }
            }
        });
    }

    /**
     * patientTeam page Initialization
     * @private
     */
    function _init() {
        _bindAddTeamEvent();
        _bindInviteGiverEvent();
        _removeCareTeam();
        _removeCareGiver();
        _EditCareGiver();
        _initStaffSelect();
    }

    $.extend(team, {
        init: function () {
            _init();
        }
    });

})(jQuery);
