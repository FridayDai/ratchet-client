package com.xplusz.ratchet


class PatientService {

    def loadPatients(params) {
        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search

//        def map = new HashMap<String,Object>()
        def map = [:]

        map.put(start, start)
        map.put(length, length)
        map.put(order, order)
        map.put(columns, columns)
        map.put(search, search)

        def patient1 = new Patient("001", "33091234", "John", "Smith", "john@gmail.com", "544-4847-9794", "Rotator Cuff Essential")
        def patient2 = new Patient("002", "32980987", "Julia", "Roberts", "julia@gmail.com", "514-4855-9784", "Rotator Cuff Vanilla")
        def patient3 = new Patient("003", "32980111", "Jany1", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient4 = new Patient("004", "32980122", "Jany2", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient5 = new Patient("005", "32980133", "Jany3", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient6 = new Patient("006", "32980144", "Jany4", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient7 = new Patient("007", "32980155", "Jany5", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient8 = new Patient("008", "32980166", "Jany6", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient9 = new Patient("009", "32980177", "Jany7", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient10 = new Patient("010", "32980188", "Jany8", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")

        def data = [patient1, patient2, patient3, patient4, patient5, patient6, patient7, patient8, patient9, patient10]
        map.put("data", data)
        return map
    }


    def loadActivities(params) {
        def selectLevel = params?.selectLevel
        def selectBy = params?.selectBy
        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.columns
        def search = params?.search

        def map = [:]
        map.put(start, start)
        map.put(length, length)
        map.put(order, order)
        map.put(columns, columns)
        map.put(search, search)

        def data

        if (selectLevel == "all") {
            if (selectBy == "all") {
                def activity1 = new Activity("001", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity2 = new Activity("002", "Task 'SDM' is sent to patient", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity3 = new Activity("003", "Task 'DASH outcome' is overdue, a request has been sent to the care team to follow up", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity4 = new Activity("004", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity5 = new Activity("005", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity6 = new Activity("006", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity7 = new Activity("007", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity8 = new Activity("008", "Patient created", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity9 = new Activity("009", "Patient created", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity10 = new Activity("010", "Patient created", "Critical", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity11 = new Activity("011", "Patient created", "Critical", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity12 = new Activity("012", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity13 = new Activity("013", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity14 = new Activity("014", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity15 = new Activity("015", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                data = [activity1, activity2, activity3, activity4, activity5, activity6, activity7, activity8, activity9, activity10, activity11, activity12, activity13, activity14, activity15]
            } else if (selectBy == "ratchet") {
                def activity2 = new Activity("002", "Task 'SDM' is sent to patient", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity3 = new Activity("003", "Task 'DASH outcome' is overdue, a request has been sent to the care team to follow up", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity4 = new Activity("004", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity5 = new Activity("005", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity6 = new Activity("006", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity7 = new Activity("007", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity8 = new Activity("008", "Patient created", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity9 = new Activity("009", "Patient created", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                data = [activity2, activity3, activity4, activity5, activity6, activity7, activity8, activity9]
            }
        } else if (selectLevel == "critical") {
            if (selectBy == "all") {
                def activity3 = new Activity("003", "Task 'DASH outcome' is overdue, a request has been sent to the care team to follow up", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity4 = new Activity("004", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity5 = new Activity("005", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity6 = new Activity("006", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity7 = new Activity("007", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity10 = new Activity("010", "Patient created", "Critical", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                def activity11 = new Activity("011", "Patient created", "Critical", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
                data = [activity3, activity4, activity5, activity6, activity7, activity10, activity11]
            } else if (selectBy == "ratchet") {
                def activity3 = new Activity("003", "Task 'DASH outcome' is overdue, a request has been sent to the care team to follow up", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity4 = new Activity("004", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity5 = new Activity("005", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity6 = new Activity("006", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                def activity7 = new Activity("007", "Patient created", "Critical", "Ratchet", "Jan 7 2015, 8:13:00 AM")
                data = [activity3, activity4, activity5, activity6, activity7]
            }
        } else if (selectLevel == "normal") {
            def activity1 = new Activity("001", "Patient created", "Normal", "Joseph Yan", "Jan 7 2015, 8:13:00 AM")
            def activity2 = new Activity("002", "Task 'SDM' is sent to patient", "Normal", "Ratchet", "Jan 7 2015, 8:13:00 AM")
            data = [activity1, activity2]
        }
        map.put("data", data)
        return map
    }


    def loadCareTeam() {
        def team = []
        def team1 = new Team("001", "33091234", "John Smith", "john@gmail.com", "Surgeon", "in August 2004,I left QingDao to BeiJing and worked for a foreign enterprise as a automation software test engineer.")
        def team2 = new Team("002", "33091235", "Sid Smith", "Sid@gmail.com", "Surgeon", "in August 2004,I left QingDao to BeiJing and worked for a foreign enterprise as a automation software test engineer.")
        def team3 = new Team("003", "33091236", "Colin Smith", "Colin@gmail.com", "Surgeon", "in August 2004,I left QingDao to BeiJing and worked for a foreign enterprise as a automation software test engineer.")
        team.add(team1)
        team.add(team2)
        team.add(team3)
        return team
    }

    def loadCareGiver() {
        def giver = []
        def giver1 = new Giver("003", "33091234", "John Smith", "john@gmail.com", "Sibling", "ACTIVE")
        def giver2 = new Giver("004", "33091235", "Sid Smith", "sid@gmail.com", "Spouse", "INVITED")
        giver.add(giver1)
        giver.add(giver2)
        return giver
    }
}
