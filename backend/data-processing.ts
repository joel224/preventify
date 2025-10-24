
// This file contains the logic for processing the business entities data from the Eka API.

export function processBusinessEntities(doctorList: any[], clinicList: any[]) {
    // A map to hold processed doctors to avoid duplicates and handle the "first match" rule.
    const processedDoctors = new Map();
    const processedClinics = new Map();

    // First, create a quick lookup for doctor names by their ID.
    const doctorNameMap = new Map();
    for (const doctor of doctorList) {
        if (doctor.doctor_id && doctor.name) {
            doctorNameMap.set(doctor.doctor_id, doctor.name);
        }
    }
    
    // Iterate through each clinic to find the doctors associated with it.
    for (const clinic of clinicList) {
        if (!clinic.clinic_id || !clinic.name || !Array.isArray(clinic.doctors)) {
            continue; // Skip malformed clinic entries
        }

        // Add clinic to the processed clinics map if it's not already there.
        if (!processedClinics.has(clinic.clinic_id)) {
            processedClinics.set(clinic.clinic_id, {
                id: clinic.clinic_id,
                name: clinic.name,
                doctors: [], // We will populate this next
            });
        }
        
        // Go through the doctors in the current clinic
        for (const doctorId of clinic.doctors) {
            if (!doctorId) continue; // Skip null/empty doctor IDs

            // "First Match" rule: If this doctor has already been assigned to a primary clinic, skip assigning a new primary.
            if (!processedDoctors.has(doctorId)) {
                const doctorName = doctorNameMap.get(doctorId);
                if (doctorName) {
                    // Add the doctor to our main processed list with their primary clinic
                    processedDoctors.set(doctorId, {
                        id: doctorId,
                        name: doctorName,
                        // Assign the primary clinic based on the first match
                        clinicId: clinic.clinic_id,
                        clinicName: clinic.name,
                    });
                }
            }
            
            // Regardless of first match, we still need to associate this doctor with this clinic
            // for the clinic's list of doctors.
            const doctorName = doctorNameMap.get(doctorId);
            if (doctorName) {
                const clinicDoctors = processedClinics.get(clinic.clinic_id)?.doctors;
                if (clinicDoctors && !clinicDoctors.some((d: any) => d.id === doctorId)) {
                    clinicDoctors.push({ id: doctorId, name: doctorName });
                }
            }
        }
    }

    // Convert the Maps to arrays for the final return value.
    const finalDoctors = Array.from(processedDoctors.values());
    const finalClinics = Array.from(processedClinics.values());
    
    return {
        doctors: finalDoctors,
        clinics: finalClinics,
    };
}
