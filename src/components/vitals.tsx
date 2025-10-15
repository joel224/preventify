'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Vitals as VitalsType } from '@/lib/types';
import { HeartPulse, Thermometer, Droplets, Activity, Wind } from 'lucide-react';

interface VitalsProps {
    vitals: VitalsType;
}

const VitalSign = ({ icon, label, value, unit, description }: { icon: React.ReactNode, label: string, value: string, unit?: string, description?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{label}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}{unit && <span className="text-xs text-muted-foreground"> {unit}</span>}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
    </Card>
)

export default function Vitals({ vitals }: VitalsProps) {
    const [systolic, diastolic] = vitals.bloodPressure.split('/');

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <VitalSign
                label="Blood Pressure"
                value={`${systolic}/${diastolic}`}
                unit="mmHg"
                description="Last reading"
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
            />
            <VitalSign
                label="Heart Rate"
                value={vitals.heartRate}
                unit="BPM"
                description="+2 since last hour"
                icon={<HeartPulse className="h-4 w-4 text-muted-foreground" />}
            />
            <VitalSign
                label="SpO2"
                value={vitals.spo2}
                unit="%"
                description="Normal range: 95-100%"
                icon={<Droplets className="h-4 w-4 text-muted-foreground" />}
            />
            <VitalSign
                label="Temperature"
                value={vitals.temperature}
                unit="°F"
                description="Body temperature"
                icon={<Thermometer className="h-4 w-4 text-muted-foreground" />}
            />
        </div>
    );
}
