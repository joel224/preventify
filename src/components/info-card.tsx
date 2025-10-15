'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InfoCardProps {
  title: string;
  description?: string;
  content: string[];
  isCollapsible?: boolean;
}

export default function InfoCard({ title, description, content, isCollapsible = false }: InfoCardProps) {
  const renderContent = () => (
    <ScrollArea className={isCollapsible ? 'h-48' : ''}>
      <ul className="space-y-2 text-sm text-muted-foreground pr-4">
        {content.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );

  return (
    <Card>
      {isCollapsible ? (
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-b-0">
             <AccordionTrigger className="p-6">
                <div>
                    <CardTitle className="text-base font-bold text-left">{title}</CardTitle>
                    {description && <CardDescription className="text-left mt-1">{description}</CardDescription>}
                </div>
             </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {renderContent()}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-base font-bold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </>
      )}
    </Card>
  );
}
