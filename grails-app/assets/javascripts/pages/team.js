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
            addCareTeam: "{0}/addCareTeam".format(RC.constants.baseUrl)
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

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmTeamFormArguments, {
                element: $(".addTeamForm"),
                okCallback: function () {
                    if ($(".addTeamForm").valid()) {
                        var emid = $("#team-emid").val();
                        var name = $("#team-name").val();
                        var email = $("#team-email").val();
                        var role = $("#roles").val();
                        var des = $("#team-des").val();
                        _addTeamMember(emid, name, email, role, des);
                        //_add();
                        return true;
                    }
                    return false;
                }
            }));
        });
    }

    function _addTeamMember(emid, name, email, role, des) {
        $.ajax({
            url: opts.urls.addCareTeam,
            type: 'POST',
            data: {emid: emid, name: name, email: email, role: role, des: des},
            dataType: 'json'
            //success:function(data){
            //    $('#nav-username').empty().append(data.username);
            //}
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

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmGiverFormArguments, {
                element: $(".inviteGiverForm"),
                okCallback: function () {
                    if ($(".inviteGiverForm").valid()) {
                        //_add();
                        return true;
                    }
                    return false;
                }
            }));
        });
    }

    /**
     * remove care team event
     * @private
     */
    function _removeCareTeam() {
        $(".btn-remove-team").on("click", function (e) {
            e.preventDefault();
            var parent = $(this).parent().parent();
            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.deleteTeamWaringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    parent.remove();
                }
            }));
        });
    }

    /**
     * remove care giver event
     * @private
     */
    function _removeCareGiver() {
        $(".btn-remove-giver").on("click", function (e) {
            e.preventDefault();
            var parent = $(this).parent().parent();
            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.deleteGiverWaringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    parent.remove();
                }
            }));
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
     * patientTeam page Initialization
     * @private
     */
    function _init() {
        _bindAddTeamEvent();
        _bindInviteGiverEvent();
        _removeCareTeam();
        _removeCareGiver();
        _EditCareGiver();
    }

    $.extend(team, {
        init: function () {
            _init();
        }
    });

})(jQuery);
