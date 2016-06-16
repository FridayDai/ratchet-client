// locations to search for config files that get merged into the main config;
// config files can be ConfigSlurper scripts, Java properties files, or classes
// in the classpath in ConfigSlurper format

// grails.config.locations = [ "classpath:${appName}-config.properties",
//                             "classpath:${appName}-config.groovy",
//                             "file:${userHome}/.grails/${appName}-config.properties",
//                             "file:${userHome}/.grails/${appName}-config.groovy"]

if (System.properties["${appName}.config.location"]) {
    grails.config.locations << "file:" + System.properties["${appName}.config.location"]
}

grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination

// The ACCEPT header will not be used for content negotiation for user agents containing the following strings (defaults to the 4 major rendering engines)
grails.mime.disable.accept.header.userAgents = ['Gecko', 'WebKit', 'Presto', 'Trident']
grails.mime.types = [ // the first one is the default format
                      all          : '*/*', // 'all' maps to '*' or the first available format in withFormat
                      atom         : 'application/atom+xml',
                      css          : 'text/css',
                      csv          : 'text/csv',
                      form         : 'application/x-www-form-urlencoded',
                      html         : ['text/html', 'application/xhtml+xml'],
                      js           : 'text/javascript',
                      json         : ['application/json', 'text/json'],
                      multipartForm: 'multipart/form-data',
                      rss          : 'application/rss+xml',
                      text         : 'text/plain',
                      hal          : ['application/hal+json', 'application/hal+xml'],
                      xml          : ['text/xml', 'application/xml'],
                      pdf          : 'application/pdf'
]

// URL Mapping Cache Max Size, defaults to 5000
//grails.urlmapping.cache.maxsize = 1000

// Legacy setting for codec used to encode data with ${}
grails.views.default.codec = "html"

// The default scope for controllers. May be prototype, session or singleton.
// If unspecified, controllers are prototype scoped.
grails.controllers.defaultScope = 'singleton'

// GSP settings
grails {
    views {
        gsp {
            encoding = 'UTF-8'
            htmlcodec = 'xml' // use xml escaping instead of HTML4 escaping
            codecs {
                expression = 'html' // escapes values inside ${}
                scriptlet = 'html' // escapes output from scriptlets in GSPs
                taglib = 'none' // escapes output from taglibs
                staticparts = 'none' // escapes output from static template parts
            }
        }
        // escapes all not-encoded output at final stage of outputting
        // filteringCodecForContentType.'text/html' = 'html'
    }
}


grails.converters.encoding = "UTF-8"
// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'

// Set to false to use the new Grails 1.2 JSONBuilder in the render method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []
// whether to disable processing of multi part requests
grails.web.disable.multipart = false

// request parameters to mask when logging exceptions
grails.exceptionresolver.params.exclude = ['password']

// configure auto-caching of queries by default (if false you can cache individual queries with 'cache: true')
grails.hibernate.cache.queries = false

// configure passing transaction's read-only attribute to Hibernate session, queries and criterias
// set "singleSession = false" OSIV mode in hibernate configuration after enabling
grails.hibernate.pass.readonly = false
// configure passing read-only to OSIV session by default, requires "singleSession = false" OSIV mode
grails.hibernate.osiv.readonly = false

//Config wkhtmltopdf plugin
grails.plugin.wkhtmltox.binary = System.getProperty("WKHTMLTOPDF_DIR")?:"/usr/local/bin/wkhtmltopdf"

environments {
    development {
        grails.logging.jul.usebridge = true     
    }
    production {
        grails.logging.jul.usebridge = false
        // TODO: grails.serverURL = "http://www.changeme.com"
    }
}

// log4j configuration
log4j.main = {
    // Example of changing the log pattern for the default console appender:
    //
    //appenders {
    //    console name:'stdout', layout:pattern(conversionPattern: '%d %level %c{2} %m%n')
    //}

    if (System.getProperty("ELK_TCP_ADDR")) {
        appenders {
            console name: 'stdout', layout: pattern(conversionPattern: '%d [%t] %p %C - %m%n')
            appender new biz.paluch.logging.gelf.log4j.GelfLogAppender(name: 'central',
                    host: System.getProperty("ELK_TCP_ADDR"), port: 12201, additionalFields: "app_type=client")
        }

        root { info "central", "stdout", "stacktrace" }
    }

    info 'com.ratchethealth.client',
            'grails.app.domain',
            'grails.app.services',
            'grails.app.controllers',
            'grails.app.filters.com.ratchethealth.client.LoggingFilters'

    error 'org.codehaus.groovy.grails.web.servlet',        // controllers
            'org.codehaus.groovy.grails.web.pages',          // GSP
            'org.codehaus.groovy.grails.web.sitemesh',       // layouts
            'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
            'org.codehaus.groovy.grails.web.mapping',        // URL mapping
            'org.codehaus.groovy.grails.commons',            // core / classloading
            'org.codehaus.groovy.grails.plugins',            // plugins
            'org.codehaus.groovy.grails.orm.hibernate',      // hibernate integration
            'org.springframework',
            'org.hibernate',
            'net.sf.ehcache.hibernate',
            'com.granicus.grails.plugins.cookiesession.CookieSessionFilter',
            'com.granicus.grails.plugins.cookiesession.SessionRepositoryRequestWrapper',
            'com.granicus.grails.plugins.cookiesession.SessionRepositoryResponseWrapper',
            'com.granicus.grails.plugins.cookiesession.CookieSessionRepository'

    environments {
        development {
            debug 'com.ratchethealth.client',
                    'grails.app.domain',
                    'grails.app.services',
                    'grails.app.controllers'
        }
    }
}






grails.resources.resourceLocatorEnabled = false
grails.plugin.cookiesession.enabled = true
grails.plugin.cookiesession.cookiename = "ratchet-session"
grails.plugin.cookiesession.sessiontimeout = -1
grails.plugin.cookiesession.secret = "udwRZecLE9R4c+qumJKz7)*kZ".bytes.encodeBase64(false).toString()

// locations to search for config files that get merged into the main config;
// config files can be ConfigSlurper scripts, Java properties files, or classes
// in the classpath in ConfigSlurper format
String defaultOverrideLocation = "classpath:resources/noredist/override.properties"
String systemOverrideLocation = System.getProperty("override")
String overrideLocation = systemOverrideLocation ? "file:${systemOverrideLocation}" : defaultOverrideLocation
grails.config.locations = [
        overrideLocation
]

// asset-pipeline
grails.assets.excludes = [
        'bower_components/**',
        '.sass-cache/**',
        'sass/**',
        'config.rb',
        'components/**',
        'constants/**',
        'libs/**',
        'utils/**',
]

grails.assets.plugin."resources".excludes = ["**"]
grails.assets.plugin."cookie-session".excludes = ["**"]
grails.plugin.cookiesession.httponly = true
grails.plugin.cookiesession.setsecure = !System.getProperty("NOT_SUPPORT_HTTPS")?.toBoolean()


if (System.getProperty("CDN_ENABLE")?.toBoolean()) {
    cdn_domain = System.getProperty("CDN_ASSET_DOMAIN_CLIENT") ?: "https://d3pngev0rteoe.cloudfront.net"
    grails.assets.url = "${cdn_domain}/assets/"
}


grails.cache.enabled = true

grails.cache.config = {
    provider {
        name 'ehcache-client-portal-' + (new Date().format('yyyyMMddHHmmss'))
    }
    cache {
        name 'announcement'
    }
    defaultCache {
        memoryStoreEvictionPolicy 'LRU'
    }

    defaults {
        maxElementsInMemory 10
        eternal false
        overflowToDisk false
        maxElementsOnDisk 0
        timeToIdleSeconds 600
        timeToLiveSeconds 600
    }
}

cors.url.pattern = '/assets/*'
cors.headers = ['Access-Control-Allow-Origin': '*']

ratchet.api.anonymous.token = System.getProperty("ANONYMOUS_API_TOKEN") ?: "FkvVedyg9hT\$dvkUGhNVqj"

ratchetv2 {
    server {
        url {
            base = System.getProperty("SERVER_URL") ?: "http://api.develop.ratchethealth.com"

            // Authentication
            login = "${ratchetv2.server.url.base}/api/v1/login"
            logout = "${ratchetv2.server.url.base}/api/v1/logout"
            validateSessionId = "${ratchetv2.server.url.base}/api/v1/check_token"

            //send Exception Email
            stackTraceEmail = "${ratchetv2.server.url.base}/api/v1/send/stacktrace/email"

            //forgotPassword
            password {
                reset = "${ratchetv2.server.url.base}/api/v1/password/reset"
                restCheck = "${ratchetv2.server.url.base}/api/v1/password/reset/check"
                confirm = "${ratchetv2.server.url.base}/api/v1/password/confirm"
            }

            // Patients URL
            patients = "${ratchetv2.server.url.base}/api/v1/patients"
            patient = "${ratchetv2.server.url.base}/api/v1/patients/%s"
            addPatient = "${ratchetv2.server.url.base}/api/v1/patients/%d/records"
            invitePatient = "${ratchetv2.server.url.base}/api/v1/patient/invite/%s"
            showPatient = "${ratchetv2.server.url.base}/api/v1/patients/patientId/%s"
            uploadPatient = "${ratchetv2.server.url.base}/api/v1/clients/%s/bulk/import"
            downloadErrors = "${ratchetv2.server.url.base}/api/v1/clients/%s/bulk/error/link"
            savePatient = "${ratchetv2.server.url.base}/api/v1/clients/%s/bulk/save"
            lookup = "${ratchetv2.server.url.base}/api/v1/clients/%s/bulk/lookup"
            checkPatientEmail = "${ratchetv2.server.url.base}/api/v1/patients/check_email"
            notify = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/notify-now"
            generateInClinicCode = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/generate/in-clinic/code"
            hasActiveTasks = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/has-active-tasks"

            //Report URL
            taskConversion = "${ratchetv2.server.url.base}/api/v1/clients/conversion"

            // Staff URL
            staffs = "${ratchetv2.server.url.base}/api/v1/staffs"

            //Account
            getAccount = "${ratchetv2.server.url.base}/api/v1/staffs/%s"
            inviteStaff = "${ratchetv2.server.url.base}/api/v1/staff/invite/%d"
            updatePassword = "${ratchetv2.server.url.base}/api/v1/password/update"
            activeStaff = "${ratchetv2.server.url.base}/api/v1/staff/confirm"
            confirmCode = "${ratchetv2.server.url.base}/api/v1/staff/validation/%s"
            deactivateStaff = "${ratchetv2.server.url.base}/api/v1/staff/deactivate/%d"
            activateStaff = "${ratchetv2.server.url.base}/api/v1/staff/activate/%d"
            checkAccountEmail = "${ratchetv2.server.url.base}/api/v1/staff/email/check"
            checkNPI = "${ratchetv2.server.url.base}/api/v1/staff/npi/check"

            //Group
            createGroup = "${ratchetv2.server.url.base}/api/v1/clients/%s/groups"
            updateGroup = "${ratchetv2.server.url.base}/api/v1/clients/%s/groups/%s"
            showGroup = "${ratchetv2.server.url.base}/api/v1/clients/%s/groups/%s"
            deleteGroup = "${ratchetv2.server.url.base}/api/v1/clients/%s/groups/%s"
            showGroups = "${ratchetv2.server.url.base}/api/v1/clients/%s/groups"
            getStaffGroups = "${ratchetv2.server.url.base}/api/v1/clients/%s/groups/myGroups"
            updateTreatmentsOnGroup = "${ratchetv2.server.url.base}/api/v1/clients/%s/groups/%s/treatments"
            checkTreatmentUsed = "${ratchetv2.server.url.base}/api/v1/clients/%s/groups/%s/treatments/%s/used" //deprecated
            patientGroups = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/groups"
            deletePatientGroup = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/groups/%s"

            //Patient report section
            individualReport = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/tools/%s/report"
            getPatientTools = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/tools"

            // Treatment URL
            getTreatments = "${ratchetv2.server.url.base}/api/v1/clients/%s/treatments"
            assignTreatments = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/assign/record"
            assignTreatmentToExistPatient = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/assign/record"
            getTreatmentInfo = "${ratchetv2.server.url.base}/api/v1/clients/%s/treatments/%s"
            updateEventTime = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s"
            archived = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s/archived"
            getToolsOfTreatment = "${ratchetv2.server.url.base}/api/v1/treatments/%s/tools/loadToolByTreatment"
            getTreatmentAvailabelYears = "${ratchetv2.server.url.base}/api/v1/report/availableYears"
            adhocTasksToTreatment = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s/ad-hoc"
            deleteTreatment = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s"

            //task
            //for taskService
            task {
                sendEmail = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s/tasks/%s/sendMail"
                getResult = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s/tasks/%s/result"
                delete = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s/tasks/%s"
                callVoice = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s/tasks/%s/call"
                resolveVoice = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s/tasks/%s/attention/resolve"
                answerUserTask = "${ratchetv2.server.url.base}/api/v1/client/%s/patient/%s/userevent/%s/answer"
            }
            getOverdueTask = "${ratchetv2.server.url.base}/api/v1/patients/%s/records/%s/overdue"


            //activity
            getActivity = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/activities"

            //caregiver and careTeam
            caregivers = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/caregivers"
            caregiver = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/caregivers/%s"
            checkCaregiverEmail = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/caregivers/email"

            //for medicalRecord
            showMedicalRecords = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/records/%s"
            medicalRecord {
                tasks = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/records/%s/tasks"
                assignTask = "${ratchetv2.server.url.base}/api/v1/clients/%s/patients/%s/records/%s/tasks"
            }

            addAssist = "${ratchetv2.server.url.base}/api/v1/assist"

            //Announcement
            announcements = "${ratchetv2.server.url.base}/api/v1/announcements"

            //Report
            providerAverage = "${ratchetv2.server.url.base}/api/v1/report/outcome"

            // Alert
            alerts = "${ratchetv2.server.url.base}/api/v1/clients/%s/staffs/%s/alerts"
            updateAlertStatus = "${ratchetv2.server.url.base}/api/v1/clients/%s/staffs/%s/alerts/%s"
        }

        clientPlatform = "ancient"
        clientType = "client"

        caregiverType = 1
        careTeamType = 2

        patientTreatmentLimit = 3
    }

    googleAnalytics {
        trackingId = System.getProperty("GA_CLIENT_CODE") ?: "UA-60192214-2"
    }
}

grails.plugin.awssdk.accessKey = System.getProperty("AWS_ACCESS_KEY")
grails.plugin.awssdk.secretKey = System.getProperty("AWS_SECRET_KEY")
grails.plugin.awssdk.region = System.getProperty("AWS_REGION") ?: "us-east-1"

ratchet {
    s3 {
        scanned_pdf_bucket = System.getProperty("SCANNED_PDF_BUCKET") ?: 'com-xplusz-ratchet-pdf-dev'
    }
}

Pingdom {
    real_user_monitor = System.getProperty("RUM_ENABLE")?.toBoolean() ?: false
}
