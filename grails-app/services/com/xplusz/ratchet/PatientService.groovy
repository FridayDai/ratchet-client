package com.xplusz.ratchet


class PatientService {

    def loadPatients() {
        def patient1 = new Patient("001", "33091234", "John", "Smith", "john@gmail.com", "544-4847-9794", "Rotator Cuff Essential")
        def patient2 = new Patient("002", "32980987", "Julia", "Roberts", "julia@gmail.com", "514-4855-9784", "Rotator Cuff Vanilla")
        def patient3 = new Patient("003", "32980142", "Jany", "Roby", "jany@gmail.com", "514-4855-1264", "Rotator Cuff Vanilla")
        def data = [patient1, patient2, patient3]
        return  data
    }
}
