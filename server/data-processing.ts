
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

            // "First Match" rule: If this doctor has already been assigned to a clinic, skip.
            if (processedDoctors.has(doctorId)) {
                // Even if the doctor is already processed, we need to add them to this clinic's list
                const clinicDoctors = processedClinics.get(clinic.clinic_id).doctors;
                const doctorInfo = processedDoctors.get(doctorId);
                 if (doctorInfo && !clinicDoctors.some((d: any) => d.id === doctorId)) {
                    clinicDoctors.push({ id: doctorId, name: doctorInfo.name });
                }
                continue;
            }

            // If it's a new doctor, process them.
            const doctorName = doctorNameMap.get(doctorId);
            if (doctorName) {
                // Add the doctor to our main processed list
                processedDoctors.set(doctorId, {
                    id: doctorId,
                    name: doctorName,
                    // Assign the primary clinic based on the first match
                    clinicId: clinic.clinic_id,
                    clinicName: clinic.name,
                });
                
                // Also add the doctor to the current clinic's list of doctors
                const clinicDoctors = processedClinics.get(clinic.clinic_id).doctors;
                 if (!clinicDoctors.some((d: any) => d.id === doctorId)) {
                    clinicDoctors.push({ id: doctorId, name: doctorName });
                }
            }
        }
    }
    
    // Now, ensure every doctor in a clinic's list is also in every other clinic they belong to.
    // This is a correction to ensure the clinic-to-doctor mapping is complete.
    for (const clinic of clinicList) {
        if(!processedClinics.has(clinic.clinic_id)) continue;
        const currentClinic = processedClinics.get(clinic.clinic_id);

        for (const doctorId of clinic.doctors) {
            if(!doctorId) continue;
            const doctorName = doctorNameMap.get(doctorId);
            if(doctorName && !currentClinic.doctors.some((d: any) => d.id === doctorId)) {
                currentClinic.doctors.push({ id: doctorId, name: doctorName });
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
