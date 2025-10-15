import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { HistoryItem } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';

interface HistoryProps {
  items: HistoryItem[];
}

export default function History({ items }: HistoryProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-bold text-lg">Patient Medical History</CardTitle>
          <CardDescription>
            A timeline of recent medical events and consultations.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <a href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 pr-4 -mr-4">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-3"></div>
            {items.map((item, index) => (
              <div key={index} className="relative mb-8">
                <div className="absolute -left-3 top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background"></div>
                <p className="font-semibold text-primary-foreground bg-primary inline-block px-2 py-0.5 rounded-md text-sm mb-1">{item.date}</p>
                <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
