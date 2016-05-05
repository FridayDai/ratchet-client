package com.ratchethealth.client

class PatientFilterFields extends FilterFields {
    String columns
    String search
    String draw
    String patientType
    Long treatmentId
    Long surgeonId
    int emailStatus
    String patientIdOrName
    Boolean activeTreatmentOnly = true
    int attentionStatus
    int treatmentStatus
    int taskStatus
}
