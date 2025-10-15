'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Expand, X } from 'lucide-react';

export default function Appointments() {
  const [isExpanded, setIsExpanded] = useState(false);
  const calendarSrc = "https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Asia%2FKolkata&mode=WEEK&src=am9lbGpvc2h5ODdAZ21haWwuY29t&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%230b8043";

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 p-4 sm:p-8 flex items-center justify-center">
        <Card className="w-full h-full max-w-4xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <CardTitle>Upcoming Appointments</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 -mt-4 p-2 sm:p-6 sm:pt-0">
             <iframe
              src={calendarSrc}
              style={{
                border: 0,
                width: '100%',
                height: '100%',
              }}
              className="rounded-md border"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-bold">Upcoming Appointments</CardTitle>
          <CardDescription>View and manage patient schedules.</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={() => setIsExpanded(true)}>
          <Expand className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full rounded-lg overflow-hidden border">
           <iframe
            src={calendarSrc}
            style={{
              border: 0,
              width: '100%',
              height: '100%',
            }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
         <p className="text-xs text-muted-foreground mt-2">
          To see events, ensure the calendar is public in its settings.
        </p>
      </CardContent>
    </Card>
  );
}
