package com.xplusz.ratchet


class PatientService {

    def loadPatients(params) {
        def start = params?.start
        def length = params?.length
        def order = params?.order
        def columns = params?.column
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
        def patient3 = new Patient("003", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient4 = new Patient("004", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient5 = new Patient("005", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient6 = new Patient("006", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient7 = new Patient("007", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient8 = new Patient("008", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient9 = new Patient("009", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def patient10 = new Patient("010", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")

        def data = [patient1, patient2, patient3, patient4, patient5, patient6, patient7, patient8, patient9, patient10]
        map.put("data", data)
        return  map
    }
}
