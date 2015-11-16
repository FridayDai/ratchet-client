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
                      xml          : ['text/xml', 'application/xml']
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
    //    console name:'stdout', layout:pattern(conversionPattern: '%c{2} %m%n')
    //}

    if (System.getProperty("ELK_TCP_ADDR")) {
        appenders {
            console name: 'stdout', layout: pattern(conversionPattern: '%c{2} %m%n')
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
        'javascripts/components/**',
        'javascripts/constants/**',
        'javascripts/libs/**',
        'javascripts/utils/**',
]

grails.assets.plugin."resources".excludes = ["**"]
grails.assets.plugin."cookie-session".excludes = ["**"]


if (System.getProperty("CDN_ENABLE")?.toBoolean() == true) {
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

ratchet.api.anonymous.token = System.getProperty("ANONYMOUS_API_TOKEN") ?: "FkvVedyg9hT\$dvkUGhNVqj"

ratchetv2 {
    server {
        url {
            base = System.getProperty("SERVER_URL") ?: "http://api.develop.ratchethealth.com/api/v1"

            // Authentication
            login = "${ratchetv2.server.url.base}/login"
            logout = "${ratchetv2.server.url.base}/logout"
            validateSessionId = "${ratchetv2.server.url.base}/check_token"

            //forgotPassword
            password {
                reset = "${ratchetv2.server.url.base}/password/reset"
                restCheck = "${ratchetv2.server.url.base}/password/reset/check"
                confirm = "${ratchetv2.server.url.base}/password/confirm"
            }

            // Patients URL
            patients = "${ratchetv2.server.url.base}/patients"
            patient = "${ratchetv2.server.url.base}/patients/%s"
            addPatient = "${ratchetv2.server.url.base}/patients/%d/records"
            invitePatient = "${ratchetv2.server.url.base}/patient/invite/%s"
            showPatient = "${ratchetv2.server.url.base}/patients/patientId/%s"
            uploadPatient = "${ratchetv2.server.url.base}/clients/%s/bulk/import"
            downloadErrors = "${ratchetv2.server.url.base}/clients/%s/bulk/error/link"
            savePatient = "${ratchetv2.server.url.base}/clients/%s/bulk/save"
            lookup = "${ratchetv2.server.url.base}/clients/%s/bulk/lookup"

            checkPatientEmail = "${ratchetv2.server.url.base}/patients/check_email"

            // Staff URL
            staffs = "${ratchetv2.server.url.base}/staffs"

            //Account
            getAccount = "${ratchetv2.server.url.base}/staffs/%s"
            inviteStaff = "${ratchetv2.server.url.base}/staff/invite/%d"
            updatePassword = "${ratchetv2.server.url.base}/password/update"
            activeStaff = "${ratchetv2.server.url.base}/staff/confirm"
            confirmCode = "${ratchetv2.server.url.base}/staff/validation/%s"
            deactivateStaff = "${ratchetv2.server.url.base}/staff/deactivate/%d"
            activateStaff = "${ratchetv2.server.url.base}/staff/activate/%d"
            checkAccountEmail = "${ratchetv2.server.url.base}/staff/email/check"
            checkNPI = "${ratchetv2.server.url.base}/staff/npi/check"

            //Group
            createGroup = "${ratchetv2.server.url.base}/clients/%s/groups"
            updateGroup = "${ratchetv2.server.url.base}/clients/%s/groups/%s"
            showGroup = "${ratchetv2.server.url.base}/clients/%s/groups/%s"
            deleteGroup = "${ratchetv2.server.url.base}/clients/%s/groups/%s"
            showGroups = "${ratchetv2.server.url.base}/clients/%s/groups"
            getStaffGroups = "${ratchetv2.server.url.base}/clients/%s/groups/myGroups"

            // Treatment URL
            getTreatments = "${ratchetv2.server.url.base}/clients/%s/treatments"
            assignTreatments = "${ratchetv2.server.url.base}/clients/%s/patients/assign/record"
            assignTreatmentToExistPatient = "${ratchetv2.server.url.base}/clients/%s/patients/%s/assign/record"
            getTreatmentInfo = "${ratchetv2.server.url.base}/clients/%s/treatments/%s"
            updateSurgeryTime = "${ratchetv2.server.url.base}/clients/%s/patients/%s/records/%s"
            archived = "${ratchetv2.server.url.base}/clients/%s/patients/%s/records/%s/archived"
            generateCode = "${ratchetv2.server.url.base}/clients/%s/patients/%s/records/%s/generate/treatment/code"
            notifyTreatmentTasks = "${ratchetv2.server.url.base}/clients/%s/patients/%s/records/%s/sendMail"
            getToolsOfTreatment = "${ratchetv2.server.url.base}/treatments/%s/tools/loadToolByTreatment"
            adhocTasksToTreatment = "${ratchetv2.server.url.base}/clients/%s/patients/%s/records/%s/ad-hoc"

            //task
            //for taskService
            task {
                sendEmail = "${ratchetv2.server.url.base}/clients/%s/patients/%s/records/%s/tasks/%s/sendMail"
            }
            getOverdueTask = "${ratchetv2.server.url.base}/patients/%s/records/%s/overdue"


            //activity
            getActivity = "${ratchetv2.server.url.base}/clients/%s/patients/%s/records/%s/activities"

            //careGiver and careTeam
            showMedicalCares = "${ratchetv2.server.url.base}/medicalCares"
            deleteCareTeam = "${ratchetv2.server.url.base}/records/%s/careteam/%s"
            deleteCareGiver = "${ratchetv2.server.url.base}/records/%s/caregiver/%s"
            updateCareTeam = "${ratchetv2.server.url.base}/records/%s/careteam/%s/groups/%s"
            checkCareGiverEmail = "${ratchetv2.server.url.base}/records/%s/caregiver/check_email"

            //for toolService
            tools {
                loadToolByTreatment = "${ratchetv2.server.url.base}/treatments/%s/tools/loadToolByTreatment"
            }

            //for medicalRecord
            showMedicalRecords = "${ratchetv2.server.url.base}/clients/%s/patients/records/%s"
            medicalRecord {
                tasks = "${ratchetv2.server.url.base}/clients/%s/patients/records/%s/tasks"
                assignTask = "${ratchetv2.server.url.base}/clients/%s/patients/%s/records/%s/tasks"
            }

            addAssist = "${ratchetv2.server.url.base}/assist"

            //Announcement
            announcements = "${ratchetv2.server.url.base}/announcements"

        }

        clientPlatform = "ancient"
        clientType = "client"

        careGiverType = 1
        careTeamType = 2

        patientTreatmentLimit = 3
    }

    googleAnalytics {
        trackingId = System.getProperty("GA_CLIENT_CODE") ?: "UA-60192214-2"
    }
}
