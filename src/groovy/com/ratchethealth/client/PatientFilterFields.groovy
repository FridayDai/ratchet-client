package com.ratchethealth.client

class PatientFilterFields extends FilterFields {
    String columns
    String search
    String draw
    String patientType
    Long treatmentId
    Long surgeonId
    Long appointmentDate
    int emailStatus
    String patientIdOrName
    Boolean activeTreatmentOnly = true
    int treatmentStatus
    int taskStatus
}
