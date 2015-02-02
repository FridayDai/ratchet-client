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
            getStaffs: "{0}/getStaffs".format(RC.constants.baseUrl),
            addCareTeam: "{0}/clients/{1}/patients/{2}/care_team".format(RC.constants.baseUrl),
            addCareGiver: "{0}/clients/{1}/patients/{2}/care_giver".format(RC.constants.baseUrl),
            deleteCareTeam: "{0}/clients/{1}/patients/{2}/care_team/{3}/{4}".format(RC.constants.baseUrl),
            deleteCareGiver: "{0}/clients/{1}/patients/{2}/care_giver/{3}/{4}".format(RC.constants.baseUrl)
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
            var medicalRecordId = $(this).data("medicalRecordId");
            var clientId = $(this).data("clientId");
            var patientId = $(this).data("patientId");

            var careTeams = $(this).parent().parent().find(".detail-info");
            var existCareTeam = [];
            $.each(careTeams, function (index, item) {
                existCareTeam.push({
                    'id': $(item).data("careTeamId")
                });
            });

            _initStaffSelect(existCareTeam);

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

    /**
     *
     * @param clientId
     * @param patientId
     * @param careTeamInfo
     * @private
     */
    function _addCareTeam(clientId, patientId, careTeamInfo) {
        $.ajax({
            url: opts.urls.addCareTeam.format(null, clientId, patientId),
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
        $("#invite-giver").on("click", function (e) {
            e.preventDefault();
            $(".inviteGiverForm")[0].reset();
            var medicalRecordId = $(this).data("medicalRecordId");
            var clientId = $(this).data("clientId");
            var patientId = $(this).data("patientId");

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmGiverFormArguments, {
                element: $(".inviteGiverForm"),
                okCallback: function () {
                    //if (_validateInviteGiverForm()) {
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

    /**
     *
     * @param clientId
     * @param patientId
     * @param careGiverInfo
     * @private
     */
    function _addCareGiver(clientId, patientId, careGiverInfo) {
        $.ajax({
            url: opts.urls.addCareGiver.format(null, clientId, patientId),
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
            var careTeamId = $(this).data("careTeamId");
            var medicalRecordId = $(this).data("medicalRecordId");
            var clientId = $(this).data("clientId");
            var patientId = $(this).data("patientId");

            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.deleteTeamWaringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    _removeTeam(clientId, patientId, careTeamId, medicalRecordId, grandParent);
                }
            }));
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
            url: opts.urls.deleteCareTeam.format(null, clientId, patientId, careTeamId, medicalRecordId),
            type: 'DELETE',
            success: function (data) {
                if (data.resp === true) {
                    grandParent.remove();
                }
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
            var careGiverId = $(this).data("careGiverId");
            var medicalRecordId = $(this).data("medicalRecordId");
            var clientId = $(this).data("clientId");
            var patientId = $(this).data("patientId");

            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.deleteGiverWaringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    _removeGiver(clientId, patientId, careGiverId, medicalRecordId, grandParent);
                }
            }));
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
            url: opts.urls.deleteCareGiver.format(null, clientId, patientId, careGiverId, medicalRecordId),
            type: 'DELETE',
            success: function (data) {
                if (data.resp === true) {
                    grandParent.remove();
                }
            }
        });
    }

    /**
     * edit care giver event
     * @private
     */
    //function _EditCareGiver() {
    //    // Edit record
    //    $('.btn-edit').on('click', function (e) {
    //        e.preventDefault();
    //
    //        var grandParent = $(this).parent().parent();
    //        $("#giver-emid").val(grandParent.find('.p-id').attr('value'));
    //        $("#giver-name").val(grandParent.find('.p-name').attr('value'));
    //        $("#giver-email").val(grandParent.find('.p-email').attr('value'));
    //        $("#relationship").val(grandParent.find('.p-relationship').attr('value'));
    //
    //        RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editGiverFormArguments, {
    //            element: $(".inviteGiverForm"),
    //            okCallback: function () {
    //            }
    //        }));
    //    });
    //}

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect(existCareTeam) {
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
                    $.each(data, function (index, dataItem) {
                        myResults.push({
                            'id': dataItem.id,
                            'text': dataItem.firstName + " " + dataItem.lastName
                        });
                    });

                    if (existCareTeam) {
                        var ids = {},
                            filterResult = [];

                        _.each(existCareTeam, function (careTeam) {
                            ids[careTeam.id] = true;
                        });

                        var existResult = _.filter(myResults, function (myResult) {
                            return ids[myResult.id];
                        });

                        $.grep(myResults, function (e) {
                            if ($.inArray(e, existResult) === -1) {
                                filterResult.push(e);
                            }
                        });

                        return {
                            results: filterResult
                        };
                    } else {
                        return {
                            results: myResults
                        };
                    }
                }
            }
        });
    }

    //$.validator.setDefaults({
    //    debug: true,
    //    success: "valid"
    //});
    //function _validateInviteGiverForm() {
    //    //$(".inviteGiverForm").valid();
    //    $('#invite-giver-form').validate({
    //        rules: {
    //            email: {
    //                required: true
    //            }
    //        }
    //    });
    //}

    /**
     * patientTeam page Initialization
     * @private
     */
    function _init() {
        _bindAddTeamEvent();
        _bindInviteGiverEvent();
        _removeCareTeam();
        _removeCareGiver();
        //_EditCareGiver();
        //_initStaffSelect();
    }

    $.extend(team, {
        init: function () {
            _init();
        }
    });

})(jQuery);
