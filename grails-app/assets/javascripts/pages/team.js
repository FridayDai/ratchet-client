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
                    width: 620
                },

                editSurgeonFormArguments: {
                    title: RC.constants.editSurgeonTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 400
                },


                editGiverFormArguments: {
                    title: RC.constants.editGiverTitle,
                    content: RC.constants.confirmContent,
                    height: 200,
                    width: 620
                },

                deleteTeamWaringArguments: {
                    title: RC.constants.deleteTeamWaringTitle,
                    message: RC.constants.warningTip
                },

                deleteGiverWaringArguments: {
                    title: RC.constants.deleteGiverWaringTitle,
                    message: RC.constants.deleteGiverWarningMsg
                }
            },
            urls: {
                query: "/getPatients",
                getCareTeam: "/getCareTeam",
                getCareGiver: "/getCareGiver",
                getStaffs: "/getStaffs",
                updateCareTeamSurgeon: "/updateCareTeamSurgeon",
                addCareTeam: "/clients/{0}/patients/{1}/care_team",
                addCareGiver: "/clients/{0}/patients/{1}/care_giver",
                deleteCareTeam: "/clients/{0}/patients/{1}/care_team/{2}/{3}",
                deleteCareGiver: "/clients/{0}/patients/{1}/care_giver/{2}/{3}",
                updateCareGiver: "/updateCareGiver"
            }
        },
        careTeamRole =
            ["Anesthesiologist", "Medical Assistant", "Management", "Nurse", "Physical Therapists", "Primary Physician", "Scheduler", "Surgeon"],
        careGiverRelation = ["Spouse", "Parent", "Child", "Friend", "Other"],
        careGiverStatus = ["INACTIVE", "ACTIVE"],
        careTeamTable,
        careGiverTable;

    /**
     *
     * @param data
     * @private
     */

    function _initGiverTable(element) {

        var medicalRecordId = element.find('#hidden-medical-record').val();
        var data = {
            medicalRecordId: medicalRecordId
        };

        if (careGiverTable) {
            careGiverTable.destroy();
        }

        careGiverTable = element.find("#careGiverTable").DataTable({
            paging: true,
            searching: false,
            ordering: true,
            //"scrollCollapse": true,
            pageLength: 10,
            info: false,
            bLengthChange: false,
            "serverSide": true,
            //"bPaginate": true,
            "fnDrawCallback": function (oSettings, json) {
                $(".previous").text('');
                $(".next").text('');
                $(".dataTables_paginate").css("display", "none");
            },
            ajax: $.fn.dataTable.pipeline({
                url: opts.urls.getCareGiver,
                pages: 1, // number of pages to cache
                data: data
            }),
            columns: [
                {
                    data: "id",
                    width: "10%"
                },
                {
                    data: "firstName",
                    class: "firstName",
                    width: "15%"
                },
                {
                    data: "lastName",
                    class: "lastName",
                    width: "15%"
                },
                {
                    data: function (source) {
                        return careGiverRelation[source.relationShip - 1];
                    },
                    class: "relationship",
                    width: "15%"
                },
                {
                    data: "email",
                    class: "email",
                    width: "20%"
                },
                {
                    data: function (source) {
                        return careGiverStatus[source.status - 1];
                    },
                    width: "15%"
                },
                {
                    data: function (source) {
                        return '<a href="#" id="edit-care-giver" class="btn-edit" data-care-giver-id="' + source.id + '" ></a>' +
                            '<a href="#" id="remove-care-team" class="btn-remove-team" data-care-giver-id="' + source.id + '" > </a>';
                    },
                    class: "icons",
                    width: "10%"
                }
            ]
        });
    }

    /**
     * load Data from server side
     * @private
     */
    function _loadData(element) {

        _initGiverTable(element);
    }

    /**
     *edit surgeon
     * @private
     */
    function _editSurgeon(element) {
        element.find("#btn-edit-surgeon").on("click", function (e) {
            e.preventDefault();
            $(".editSurgeon")[0].reset();

            var medicalRecordId = $(this).data("medicalRecordId");
            var existSurgeonId = $(this).parent().find("#surgeonId").text();

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editSurgeonFormArguments, {
                element: element.find(".editSurgeon"),
                okCallback: function () {
                    if ($(".editSurgeon").valid()) {

                        var staffId = $("#selectStaff").val();
                        var ids = {
                            medicalRecordId: medicalRecordId,
                            staffId: staffId
                        };

                        _updateCareTeamSurgeon(ids, element);
                        return true;
                    }
                    return false;
                }
            }));

            _initStaffSelect(existSurgeonId);
        });
    }

    /**
     *
     * @param ids
     * @private
     */
    function _updateCareTeamSurgeon(ids, element) {
        $.ajax({
            url: opts.urls.updateCareTeamSurgeon,
            type: 'POST',
            data: ids
        }).done(function (data) {
            element.find("#surgeonId").text(data.id);
            element.find("#surgeonFirstName").text(data.firstName);
            element.find("#surgeonLastName").text(data.lastName);
            element.find("#surgeonEmail").text(data.email);
        });
    }

    /**
     * bind invite giver event
     * @private
     */
    function _bindInviteGiverEvent(element) {

        var ele = element;

        ele.find("#invite-giver").on("click", function (e) {
            e.preventDefault();
            $(".inviteGiverForm")[0].reset();
            var medicalRecordId = $(this).data("medicalRecordId");
            var clientId = $(this).data("clientId");
            var patientId = $(this).data("patientId");
            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmGiverFormArguments, {
                element: element.find(".inviteGiverForm"),
                okCallback: function () {
                    if ($(".inviteGiverForm").valid()) {

                        var firstName = $("#giver-firstName").val();
                        var lastName = $("#giver-lastName").val();
                        var email = $("#giver-email").val();
                        var relationship = $("#relationships").val();

                        var careGiverInfo = {
                            medicalRecordId: medicalRecordId,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            relationship: relationship
                        };
                        _addCareGiver(clientId, patientId, careGiverInfo, element);
                        return true;
                    }
                    return false;
                }
            }));
            _initSelect();

        });

    }

    /**
     *
     * @param clientId
     * @param patientId
     * @param careGiverInfo
     * @private
     */
    function _addCareGiver(clientId, patientId, careGiverInfo, element) {
        $.ajax({
            url: opts.urls.addCareGiver.format(clientId, patientId),
            type: 'POST',
            data: careGiverInfo
        }).done(function (data) {
            if (data.resp === true) {
                var medicalRecordId = data.medicalRecordId;
                var ids = {
                    medicalRecordId: medicalRecordId
                };
                //_initGiverTable(element, ids);
                _initGiverTable(element);
                _removeCareGiver(element);
            }
        });
    }

    /**
     * remove care giver event
     * @private
     */
    function _removeCareGiver(element) {
        element.find("#careGiverTable").on("click", "tr .btn-remove-team", function (e) {
            e.preventDefault();

            var grandParent = $(this).parent().parent();
            var careGiverId = $(this).data("careGiverId");
            var medicalRecordId = $("#hidden-medical-record").val();
            var clientId = $("#hidden-client-id").val();
            var patientId = $("#hidden-patient-id").val();

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
            url: opts.urls.deleteCareGiver.format(clientId, patientId, careGiverId, medicalRecordId),
            type: 'DELETE',
            success: function (data) {
                if (data.resp === true) {
                    grandParent.remove();
                }
            }
        });
    }

    /**
     *
     * @private
     */
    function _editCareGiver(element) {
        element.find("#careGiverTable").on("click", "tr .btn-edit", function (e) {
            e.preventDefault();

            $(".inviteGiverForm")[0].reset();
            var careGiverId = $(this).data("careGiverId");
            var medicalRecordId = $("#hidden-medical-record").val();
            var clientId = $("#hidden-client-id").val();
            var patientId = $("#hidden-patient-id").val();

            var parent = $(this).parent().parent();
            var firstName = parent.find("td.firstName").text();
            var lastName = parent.find("td.lastName").text();
            var relationship = parent.find("td.relationship").text();
            var email = parent.find("td.email").text();

            var eleParent = element.parents()
            eleParent.find("#giver-firstName").val(firstName);
            eleParent.find("#giver-lastName").val(lastName);
            eleParent.find("#giver-email").val(email);

            $("select option").filter(function () {
                return $(this).text() === relationship;
            }).prop('selected', true);

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editGiverFormArguments, {
                element: element.find(".inviteGiverForm"),
                okCallback: function () {
                    if ($(".inviteGiverForm").valid()) {

                        var firstName = $("#giver-firstName").val();
                        var lastName = $("#giver-lastName").val();
                        var email = $("#giver-email").val();
                        var relationship = $("#relationships").val();

                        var careGiverInfo = {
                            medicalRecordId: medicalRecordId,
                            careGiverId: careGiverId,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            relationship: relationship
                        };
                        _updateCareGiver(clientId, patientId, careGiverInfo, parent, element);
                        return true;
                    }
                    return false;
                }
            }));
            _initSelect();
        });
    }

    /**
     *
     * @param clientId
     * @param patientId
     * @param careGiverInfo
     * @private
     */
    function _updateCareGiver(clientId, patientId, careGiverInfo, parent, element) {
        $.ajax({
            url: opts.urls.updateCareGiver,
            type: 'POST',
            data: careGiverInfo
        }).done(function (data) {
            if (data.resp === true) {
                _initGiverTable(element);
                //element.find("td.firstName")[0].text(careGiverInfo.firstName);
                //element.find("td.firstName")[0].text(careGiverInfo.firstName);
                //element.find("td.lastName")[0].text(careGiverInfo.lastName);
                //element.find("td.relationship")[0].text(careGiverRelation[careGiverInfo.relationship - 1]);
                //element.find("td.email")[0].text(careGiverInfo.email);
                _initSelect();
            }
        });
    }

    /**
     * init select
     * @private
     */
    function _initSelect() {
        $("#relationships").select2();
    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect(existSurgeonId) {
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

                    if (existSurgeonId) {
                        var ids = {},
                            filterResult = [];
                        ids[existSurgeonId] = true;

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

    /**
     *
     * @param data
     * @private
     */
    //function _initTeamTable(data) {
    //
    //    if (careTeamTable) {
    //        careTeamTable.destroy();
    //    }
    //
    //    careTeamTable = $("#careTeamTable").DataTable({
    //        paging: true,
    //        searching: false,
    //        ordering: false,
    //        pageLength: 10,
    //        info: false,
    //        bLengthChange: false,
    //        "serverSide": true,
    //        ajax: $.fn.dataTable.pipeline({
    //            url: opts.urls.getCareTeam,
    //            pages: 2, // number of pages to cache
    //            data: data
    //        }),
    //        columns: [
    //            {
    //                data: function (source) {
    //                    if (careTeamRole[source.staffType - 1] === "Surgeon") {
    //                        return '<div class="bottom-content">' +
    //                            '<a href="#" id="remove-care-team" class="btn-remove-team" data-care-team-id="' + source.id + '" > <div class="icon-remove"></div> </a>' +
    //                            '</div>';
    //                    } else {
    //                        return '';
    //                    }
    //                }
    //            },
    //            {
    //                data: "id",
    //                className: "careTeamId"
    //            },
    //            {data: "firstName"},
    //            {data: "lastName"},
    //            {
    //                data: function (source) {
    //                    return careTeamRole[source.staffType - 1];
    //                }
    //            },
    //            {data: "email"},
    //            {
    //                data: function (source) {
    //                    return '<div class="bottom-content">' +
    //                        '<a href="#" id="remove-care-team" class="btn-remove-team" data-care-team-id="' + source.id + '" > <div class="icon-remove"></div> </a>' +
    //                        '</div>';
    //                }
    //            }
    //        ]
    //    });
    //}


    /**
     * bind add team event
     * @private
     */
    //function _bindAddTeamEvent() {
    //    // new a record
    //    $("#add-member").on("click", function (e) {
    //        e.preventDefault();
    //        $(".addTeamForm")[0].reset();
    //
    //        var medicalRecordId = $(this).data("medicalRecordId");
    //        var clientId = $(this).data("clientId");
    //        var patientId = $(this).data("patientId");
    //
    //        var careTeams = $(this).parents().find("td.careTeamId");
    //        var existCareTeam = [];
    //        $.each(careTeams, function (index, item) {
    //            existCareTeam.push({
    //                'id': $(item).text()
    //            });
    //        });
    //
    //        _initStaffSelect(existCareTeam);
    //
    //        RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmTeamFormArguments, {
    //            element: $(".addTeamForm"),
    //            okCallback: function () {
    //                if ($(".addTeamForm").valid()) {
    //                    var staffId = $("#selectStaff").val();
    //                    //var isPrimaryCareTeam;
    //                    //$("#primaryCareTeam").attr("checked") === "checked" ? isPrimaryCareTeam = true : isPrimaryCareTeam = false;
    //                    var careTeamInfo = {
    //                        medicalRecordId: medicalRecordId,
    //                        staffId: staffId
    //                        //isPrimaryCareTeam: isPrimaryCareTeam
    //                    };
    //                    _addCareTeam(clientId, patientId, careTeamInfo);
    //                    return true;
    //                }
    //                return false;
    //            }
    //        }));
    //    });
    //}

    /**
     *
     * @param clientId
     * @param patientId
     * @param careTeamInfo
     * @private
     */
    //function _addCareTeam(clientId, patientId, careTeamInfo) {
    //    $.ajax({
    //        url: opts.urls.addCareTeam.format(null, clientId, patientId),
    //        type: 'POST',
    //        data: careTeamInfo
    //    }).done(function (data) {
    //        if (data.resp === true) {
    //            var medicalRecordId = data.medicalRecordId;
    //            var ids = {
    //                medicalRecordId: medicalRecordId
    //            };
    //            _initTeamTable(ids);
    //            _removeCareTeam();
    //        }
    //    });
    //}


    /**
     * remove care team event
     * @private
     */
    //function _removeCareTeam() {
    //    $("#careTeamTable").on("click", "tr .btn-remove-team", function (e) {
    //        e.preventDefault();
    //
    //        var grandParent = $(this).parent().parent().parent();
    //        var careTeamId = $(this).data("careTeamId");
    //        var medicalRecordId = $("#hidden-medical-record").val();
    //        var clientId = $("#hidden-client-id").val();
    //        var patientId = $("#hidden-patient-id").val();
    //
    //        RC.common.warning(_.extend({}, opts.defaultConfirmArguments.deleteTeamWaringArguments, {
    //            element: $(".warn"),
    //            closeCallback: function () {
    //                _removeTeam(clientId, patientId, careTeamId, medicalRecordId, grandParent);
    //            }
    //        }));
    //    });
    //}

    /**
     *
     * @param clientId
     * @param patientId
     * @param careTeamId
     * @param medicalRecordId
     * @param grandParent
     * @private
     */
    //function _removeTeam(clientId, patientId, careTeamId, medicalRecordId, grandParent) {
    //    $.ajax({
    //        url: opts.urls.deleteCareTeam.format(null, clientId, patientId, careTeamId, medicalRecordId),
    //        type: 'DELETE',
    //        success: function (data) {
    //            if (data.resp === true) {
    //                grandParent.remove();
    //            }
    //        }
    //    });
    //}


    /**
     * patientTeam page Initialization
     * @private
     */
    function _init(element) {
        _loadData(element);
        _bindInviteGiverEvent(element);
        _removeCareGiver(element);
        _editCareGiver(element);
        _editSurgeon(element);
    }

    $.extend(team, {
        init: function (element) {
            _init(element);
        }
    });

})(jQuery);
