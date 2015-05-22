// TODO: This code should be removed after refactor
/* jshint -W071 */
/* jshint -W072 */
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
                careGiver: "/patients/{0}/emergency-contact",
                deleteCareGiver: "/patients/{0}/{1}/emergency-contact/{2}",
                updateCareGiver: "/patients/{0}/emergency-contact/update",
                updateCareTeamSurgeon: "/patients/{0}/group-and-provider/update",
                getStaffs: "/staffs",
                getGroups: "/accounts/{0}/groups"
            }
        },
        careGiverRelation = ["Parent", "Spouse", "Child", "Friend", "Other"],
        careGiverStatus = ["INACTIVE", "ACTIVE"],
        careGiverTable;

    /**
     *
     * @param data
     * @private
     */

    function _initGiverTable(element) {

        var medicalRecordId = element.find('#hidden-medical-record').val();
        var patientId = element.find('#hidden-patient-id').val();
        var active = element.find('#hidden-active').val();
        var data = {
            medicalRecordId: medicalRecordId
        };

        if (careGiverTable) {
            careGiverTable.destroy();
        }

        careGiverTable = element.find("#careGiverTable").DataTable(_.extend({}, RC.common.dataTableOptions, {
            "fnDrawCallback": function () {
                $(".previous").text('');
                $(".next").text('');
                $(".dataTables_paginate").css("display", "none");
                var paginate = $(this).siblings();
                var bothDisabled = paginate
                                    .find(".previous")
                                    .hasClass("disabled") &&
                                paginate
                                    .find(".next")
                                    .hasClass("disabled");
                if (bothDisabled && paginate.find(".current").length === 0) {
                    paginate.hide();
                }
            },
            ajax: $.fn.dataTable.pipeline({
                url: opts.urls.careGiver.format(patientId),
                pages: 1, // number of pages to cache
                data: data,
                type: 'GET'
            }),
            columns: [
                {
                    data: "id",
                    width: "10%"
                },
                {
                    data: "firstName",
                    width: "15%"
                },
                {
                    data: "lastName",
                    width: "15%"
                },
                {
                    data: function (source) {
                        return careGiverRelation[source.relationShip - 1];
                    },
                    width: "15%"
                },
                {
                    data: "email",
                    width: "20%"
                },
                {
                    data: function (source) {

                        if (careGiverStatus[source.status - 1] === "ACTIVE") {
                            return '<span class="status-active">ACTIVE</span>';
                        } else {
                            return '<span class="status-inactive">INACTIVE</span>';
                        }
                    },
                    width: "15%"
                },
                {
                    "orderable": false,
                    data: function (source) {
                        if (active === "true") {
                            return [
                                '<button ',
                                    'id="edit-care-giver" ',
                                    'disabled="disabled" ',
                                    'class="btn-edit disabled" ',
                                    'data-care-giver-id="{0}"',
                                '</button>',
                                '<button ',
                                    'id="remove-care-team" ',
                                    'disabled="disabled" ',
                                    'class="btn-remove-team disabled" ',
                                    'data-care-giver-id="{0}"',
                                '</button>'
                            ].join('').format(source.id);

                        } else {
                            return [
                                '<a ',
                                    'href="#" ',
                                    'id="edit-care-giver" ',
                                    'class="btn-edit" ',
                                    'data-care-giver-id="{0}"',
                                '</a>',
                                '<a ',
                                    'href="#" ',
                                    'id="remove-care-team" ',
                                    'class="btn-remove-team" ',
                                    'data-care-giver-id="{0}"',
                                '</a>'
                            ].join('').format(source.id);
                        }
                    },
                    width: "10%"
                }
            ]
        }));
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
            $(".edit-surgeon")[0].reset();

            var medicalRecordId = $(this).data("medicalRecordId");
            var patientId = $(this).data("patientId");
            var accountId = $(this).data("accountId");
            var existSurgeonId = $(this).parent().find("#surgeonId").text();
            var firstName = element.find("#surgeonFirstName").text().trim();
            var lastName = element.find("#surgeonLastName").text().trim();
            var groupName = element.find("#group-name").text();
            element.find("#selectStaff").val(firstName + ' ' + lastName);
            element.find("#groupSelect").val(groupName);
            var existGroupId = element.find("#hidden-group-id").val();
            existSurgeonId = element.find("#hidden-surgeon-id").val();
            var form = element.find(".edit-surgeon");

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editSurgeonFormArguments, {
                element: form,
                okCallback: function () {
                    if (form.valid()) {

                        var selectStaffId = form.find("#selectStaff").data("id");
                        var selectGroupId = form.find("#groupSelect").data('id');
                        var groupId, staffId;
                        if (selectGroupId) {
                            groupId = selectGroupId;
                        } else {
                            groupId = existGroupId;
                        }
                        if (selectStaffId) {
                            staffId = selectStaffId;
                        } else {
                            staffId = existSurgeonId;
                        }
                        var ids = {
                            medicalRecordId: medicalRecordId,
                            staffId: staffId,
                            groupId: groupId
                        };

                        _updateCareTeamSurgeon(patientId, ids, element);
                        return true;
                    }
                    return false;
                }
            }));

            _initStaffSelect(form, existSurgeonId, existGroupId);
            _initSelectGroup(form, existSurgeonId, accountId);
        });
    }

    /**
     *
     * @param ids
     * @private
     */
    function _updateCareTeamSurgeon(patientId, ids, element) {
        $.ajax({
            url: opts.urls.updateCareTeamSurgeon.format(patientId),
            type: 'POST',
            data: ids
        }).done(function (data) {
            if (data.doctor === true) {
                element.find("#surgeonDoctor").text("");
                element.find("#surgeonDoctorHidden").text("Dr.").addClass("show");
            } else {
                element.find("#surgeonDoctor").text("");
                element.find("#surgeonDoctorHidden").text("");
            }
            element.find("#surgeonId").text(data.id);
            element.find("#hidden-surgeon-id").val(data.id);
            element.find("#surgeonFirstName").text(data.firstName);
            element.find("#surgeonLastName").text(data.lastName);
            element.find("#surgeonEmail").text(data.email);
            element.find("#group-name").text(data.groupName);
            element.find("#hidden-group-id").val(data.groupId);
        });
    }

    /**
     * bind invite giver event
     * @private
     */
    function _bindInviteGiverEvent(element) {

        element.find("#invite-giver").on("click", function (e) {
            e.preventDefault();
            element.find('.inviteGiverForm')[0].reset();
            $('.inviteGiverForm')[0].reset();
            var medicalRecordId = $(this).data("medicalRecordId");
            var clientId = $(this).data("clientId");
            var patientId = $(this).data("patientId");
            var form = element.find(".inviteGiverForm");

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmGiverFormArguments, {
                element: form,
                okCallback: function () {
                    if (form.valid()) {

                        var firstName = form.find("#giver-firstName").val();
                        var lastName = form.find("#giver-lastName").val();
                        var email = form.find("#giver-email").val();
                        var relationship = form.find("#relationships").data("id");

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
            _initSelect(form);

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
            url: opts.urls.careGiver.format(patientId),
            type: 'POST',
            data: careGiverInfo
        }).done(function (data) {
            if (data.resp === true) {
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
                yesCallback: function () {
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
            url: opts.urls.deleteCareGiver.format(patientId, medicalRecordId, careGiverId),
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
            var relationship = parent.find("td.relationship").text().trim();
            var email = parent.find("td.email").text();

            var data =
            {
                "Parent": 1,
                "Spouse": 2,
                "Child": 3,
                "Friend": 4,
                "Other": 5
            };
            var relationshipId = _.map(data, function (num, key) {
                if (key === relationship) {
                    return num;
                }
            });
            relationshipId = _.compact(relationshipId).toString();

            var eleParent = element.parents();
            eleParent.find("#giver-firstName").val(firstName);

            eleParent.find("#giver-lastName").val(lastName);
            eleParent.find("#giver-email").val(email);
            eleParent.find("#relationships").val(relationship).data('id', relationshipId);
            eleParent.find("#permissionConfirm").prop('checked', true);
            var form = element.find(".inviteGiverForm");

            //$("select option").filter(function () {
            //    return $(this).text() === relationship;
            //}).prop('selected', true);

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.editGiverFormArguments, {
                element: form,
                okCallback: function () {
                    if ($(".inviteGiverForm").valid()) {

                        var firstName = eleParent.find("#giver-firstName").val();
                        var lastName = eleParent.find("#giver-lastName").val();
                        var email = eleParent.find("#giver-email").val();
                        var relationship = eleParent.find("#relationships").data('id');

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
            _initSelect(form);
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
            url: opts.urls.updateCareGiver.format(patientId),
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
                //_initSelect(element);
            }
        });
    }

    /**
     * init select
     * @private
     */
    function _initSelect(form) {
        var data = [
            {label: "Parent", id: 1},
            {label: "Spouse", id: 2},
            {label: "Child", id: 3},
            {label: "Friend", id: 4},
            {label: "Other", id: 5}
        ];


        $(form).find("#relationships").combobox({
            source: function (request, response) {
                var sources = _.filter(data, function (num) {
                    return num.label.toLowerCase().indexOf(request.term.toLowerCase()) > -1;
                });
                if (!sources.length) {
                    var result = [
                        {
                            label: 'No matches found',
                            value: ''
                        }
                    ];
                    response(result);
                }
                else {
                    response($.map(sources, function (item) {

                        return {
                            label: item.label,
                            value: item.id
                        };
                    }));
                }
            },
            appendTo: ".container"
        });
    }

    /**
     * init select staff
     * @private
     */
    function _initStaffSelect(form, existSurgeonId, groupId) {
        if ($(form).find("#selectStaff").combobox()) {
            $(form).find("#selectStaff").combobox("destroy");
        }
        $(form).find("#selectStaff").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getStaffs,
                    type: "POST",
                    data: {
                        name: request.term,
                        type: 9,
                        groupId: groupId,
                        max: 1000
                    },
                    success: function (data) {
                        if (!data.length) {
                            var result = [
                                {
                                    label: 'No matches found',
                                    value: ''
                                }
                            ];
                            response(result);
                        }
                        else {
                            // normal response
                            if (existSurgeonId) {
                                var ids = {},
                                    filterResult = [];
                                ids[existSurgeonId] = true;

                                var existResult = _.filter(data, function (data) {
                                    return ids[data.id];
                                });

                                $.grep(data, function (e) {
                                    if ($.inArray(e, existResult) === -1) {
                                        filterResult.push(e);
                                    }
                                });

                                response($.map(filterResult, function (item) {
                                    return {
                                        label: item.firstName + " " + item.lastName,
                                        value: item.id
                                    };
                                }));
                            } else {
                                response($.map(data, function (item) {
                                    return {
                                        label: item.firstName + " " + item.lastName,
                                        value: item.id
                                    };
                                }));
                            }

                        }

                    }
                });
            },
            appendTo: ".container"

        });

    }

    /**
     * init select gruop
     * @private
     */
    function _initSelectGroup(form, existSurgeonId, accountId) {
        $(form).find("#groupSelect").combobox({
            source: function (request, response) {
                $.ajax({
                    beforeSend: function () {
                        RC.common.progress(false);
                    },
                    url: opts.urls.getGroups.format(accountId),
                    type: "POST",
                    data: {
                        name: request.term,
                        length: 1000
                    },
                    success: function (data) {
                        if (!data.length) {
                            var result = [
                                {
                                    label: 'No matches found',
                                    value: ''
                                }
                            ];
                            response(result);
                        }
                        else {
                            // normal response
                            response($.map(data, function (item) {
                                return {
                                    label: item.name,
                                    value: item.id
                                };
                            }));
                        }
                    }
                });
            },
            select: function (event, ui) {
                event.preventDefault();
                if (ui.item.value === "No matches found") {
                    return;
                }
                $(this).val(ui.item.label);
                $(this).data("id", ui.item.value);
                $(this).valid();
                $(form).find("#selectStaff").val("");
                $(form).find("#selectStaff").prop("disabled", false);
                _initStaffSelect(form, existSurgeonId, $(this).data("id"));
            },
            appendTo: ".container",
            focus: function (event, ui) {
                event.preventDefault();
                if (ui.item.value === "No matches found") {
                    $(this).val("");
                    return;
                }
                $(this).val(ui.item.label);
                $(this).data("id", ui.item.value);
                $(form).find("#selectStaff").val("");
                $(form).find("#selectStaff").prop("disabled", false);
                _initStaffSelect(form, existSurgeonId, $(this).data("id"));
                return false;
            }
        });
    }

    /**
     * check archived element height. if it can't fill the whole page, we will set it's height.
     * @param element
     * @private
     */
    function _checkArchivedWindowSize(element) {
        var content = element.find('.content');
        if (content.hasClass('archived') && $('.container').outerHeight() < $(window).height()) {
            var topHeight = element.offset().top;
            var contentHeight = $(window).height() - topHeight - $('.footer').height();
            content.height(contentHeight);
        }
    }

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
        _checkArchivedWindowSize(element);
    }

    $.extend(team, {
        init: function (element) {
            _init(element);
        }
    });

})(jQuery);
/* jshint +W071 */
/* jshint +W072*/
