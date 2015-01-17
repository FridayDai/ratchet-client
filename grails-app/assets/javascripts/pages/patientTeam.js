(function ($, undefined) {
    'use strict';

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
            waringArguments: {
                title: RC.constants.warningTipTitle,
                message: RC.constants.warningTip
            }
        },
        urls: {
            query: "{0}/getPatients".format(RC.constants.baseUrl)
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

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmTeamFormArguments, {
                element: $(".addTeamForm"),
                okCallback: function () {
                    if ($("#add-team-form").valid()) {
                        //_add();
                        return true;
                    }
                    return false;
                }
            }));
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

            RC.common.confirmForm(_.extend({}, opts.defaultConfirmArguments.confirmGiverFormArguments, {
                element: $(".inviteGiverForm"),
                okCallback: function () {
                    alert("No");
                }
            }));
        });
    }

    /**
     * remove care event
     * @private
     */
    function _removeCare() {
        $(".btn-remove").on("click", function () {
            var parent = $(this).parent().parent();
            RC.common.warning(_.extend({}, opts.defaultConfirmArguments.waringArguments, {
                element: $(".warn"),
                closeCallback: function () {
                    alert('ok');
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
                    alert('ok');
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
        _removeCare();
        _EditCareGiver();
    }

    _init();
})(jQuery);
