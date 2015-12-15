var webpack = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var contextUrl = "grails-app/assets/javascripts";
var absoluteContext = __dirname + "/" + contextUrl;

module.exports = {
    devtool: 'source-map',
    context: contextUrl,
    entry: {
        patientList: "./flightPages/patientList.js",
        patientDetail: "./flightPages/patientDetail.js",
        accounts: "./flightPages/accounts.js",
        groups: './flightPages/groups.js',
        accountDetail: "./flightPages/accountDetail.js",
        profile: "./flightPages/profile.js"
    },
    output: {
        path: absoluteContext,
        filename: "./dist/[name].bundle.js"
    },
    resolve: {
        root: absoluteContext,
        alias: {
            jquery: "bower_components/jquery/dist/jquery.js",
            lodash: "bower_components/lodash/lodash.js",
            "jquery-ui-tabs": "bower_components/jquery-ui/ui/tabs.js",
            "jquery-ui-dialog": "bower_components/jquery-ui/ui/dialog.js",
            "jquery-ui-datepicker": "bower_components/jquery-ui/ui/datepicker.js",
            "jquery-ui-autocomplete": "bower_components/jquery-ui/ui/autocomplete.js",
            "jquery.ui.widget": "bower_components/jquery-ui/ui/widget.js",
            "jquery-file-upload": "bower_components/jquery-file-upload/js/jquery.fileupload.js",
            "velocity": "bower_components/velocity/velocity.js",
            "velocity-ui": "bower_components/velocity/velocity.ui.js",
            flight: "libs/flight/index.js",
            jForm: "bower_components/jquery-form/jquery.form.js",
            dataTable: "bower_components/DataTables/media/js/jquery.dataTables.js",
            moment: "bower_components/moment/min/moment.min.js",
            momentTZ: "bower_components/moment-timezone/builds/moment-timezone-with-data.js",
            intlTelInput: "bower_components/intl-tel-input/build/js/intlTelInput.js",
            "intlTelInput-utils": "bower_components/intl-tel-input/lib/libphonenumber/build/utils.js",
            "ZeroClipboard": "bower_components/zeroclipboard/dist/ZeroClipboard.js",
            "libphonenumber": "bower_components/google-libphonenumber/dist/browser/libphonenumber.js",
            select2: "bower_components/select2/select2.js",
            "snapsvg": "bower_components/Snap.svg/dist/snap.svg.js"
        }
    },
    module: {
        noParse: [
        ],
        loaders: [{
            test: require.resolve(absoluteContext + '/bower_components/Snap.svg/dist/snap.svg.js'),
            loader: __dirname + '/node_modules/imports-loader?this=>window,fix=>module.exports=0'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            _: "lodash",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        }),
        new CommonsChunkPlugin("./dist/commons.chunk.js")
    ]
};
