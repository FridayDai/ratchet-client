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
                    alert("OK");
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
     * patientTeam page Initialization
     * @private
     */
    function _init() {
        _bindAddTeamEvent();
        _bindInviteGiverEvent();
    }

    _init();
})(jQuery);
