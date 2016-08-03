package com.ratchethealth.client

class PatientFilterFields extends FilterFields {
    String columns
    String search
    String draw
    String patientType
    String treatmentId
    String surgeonId
    Long appointmentDate
    String emailStatus
    String patientIdOrName
    Boolean activeTreatmentOnly = true
    String treatmentStatus
    String taskStatus
}
