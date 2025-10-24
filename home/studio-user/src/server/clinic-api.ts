
import { makeApiRequest } from './eka-auth';
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { processBusinessEntities } from './data-processing';

async function fetchSlotsForDate(doctorId: string, clinicId: string, startDate: Date, endDate: Date): Promise<any[]> {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    console.log(`--- Fetching available slots for doctor: ${doctorId}, clinic: ${clinicId}, from: ${formattedStartDate} to ${formattedEndDate} ---`);

    try {
        const response = await makeApiRequest(async (client) => {
            return client.get(`/dr/v1/doctor/${doctorId}/clinic/${clinicId}/appointment/slot`, {
                params: {
                    start_date: formattedStartDate,
                    end_date: formattedEndDate
                }
            });
        });
        
        const responseData = response.data;
        console.log(`RAW SLOT API RESPONSE for ${doctorId}/${clinicId} on ${formattedStartDate}:`, JSON.stringify(responseData, null, 2));

        if (!responseData?.data?.schedule) {
            console.log(`INFO: No schedule object found for ${doctorId}/${clinicId} on ${formattedStartDate}.`);
            return [];
        }

        const schedule = responseData.data.schedule;
        let availableSlots: any[] = [];
        
        const clinicSchedule = schedule[clinicId];
        if (clinicSchedule && Array.isArray(clinicSchedule)) {
            clinicSchedule.forEach(scheduleItem => {
                if (scheduleItem.slots && Array.isArray(scheduleItem.slots)) {
                    scheduleItem.slots.forEach((slot: any) => {
                        availableSlots.push({
                            startTime: slot.s,
                            endTime: slot.e,
                            available: slot.available,
                            doctorId,
                            clinicId,
                        });
                    });
                }
            });
        }
        
        if (availableSlots.length > 0) {
            console.log(`SUCCESS: Found ${availableSlots.length} raw slots from API.`);
        } else {
            console.log(`INFO: No slots found in API response for the requested date range.`);
        }
        return availableSlots;

    } catch (error: any) {
        console.error(`ERROR fetching slots for ${doctorId}/${clinicId}:`, error.message);
        return [];
    }
}


export async function getAvailableSlots(doctorId: string, clinicId: string, date: string): Promise<any[]> {
    const requestedDate = new Date(date);
    const now = new Date();

    const apiStartDate = startOfDay(requestedDate);
    const apiEndDate = addDays(apiStartDate, 1);

    let slots = await fetchSlotsForDate(doctorId, clinicId, apiStartDate, apiEndDate);

    const finalFilteredSlots = slots.filter(slot => {
        if (!slot.available) {
            return false;
        }

        const slotStartTime = new Date(slot.startTime);

        if (format(slotStartTime, 'yyyy-MM-dd') !== format(requestedDate, 'yyyy-MM-dd')) {
            return false;
        }
        
        if (format(requestedDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')) {
            if (isBefore(slotStartTime, now)) {
                return false;
            }
        }
        return true;
    });

    console.log(`INFO: After filtering, returning ${finalFilteredSlots.length} valid slots.`);
    return finalFilteredSlots;
}


export async function getBusinessEntitiesAndDoctors(): Promise<any> {
    console.log("--- Starting getBusinessEntitiesAndDoctors ---");
    
    const response = await makeApiRequest(async (client) => {
        console.log('INFO: Fetching business entities (/dr/v1/business/entities)...');
        return client.get('/dr/v1/business/entities');
    });

    const { doctors: doctorList, clinics: clinicList } = response.data;

    if (!doctorList || doctorList.length === 0) {
        console.warn("WARN: No doctors found in business entities response.");
        return { doctors: [], clinics: [] };
    }
     if (!clinicList || clinicList.length === 0) {
        console.warn("WARN: No clinics found in business entities response.");
        return { doctors: [], clinics: [] };
    }
    
    console.log(`INFO: Found ${doctorList.length} doctors and ${clinicList.length} clinics. Processing data...`);
    
    const { doctors: processedDoctors, clinics: processedClinics } = processBusinessEntities(doctorList, clinicList);

    console.log(`--- Finished getBusinessEntitiesAndDoctors. Returning ${processedDoctors.length} doctors and ${processedClinics.length} clinics. ---`);
    
    console.log("--- Returned Doctors List (DEBUG) ---");
    console.log(JSON.stringify(processedDoctors, null, 2));
    console.log("-------------------------------------");

    return { doctors: processedDoctors, clinics: processedClinics };
}
