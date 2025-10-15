
import { Bell, Home, Users, Stethoscope, BarChart3, Hospital } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Appointments from './appointments'

export default function Sidebar() {
    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <a href="/" className="flex items-center gap-2 font-semibold">
                    <Stethoscope className="h-6 w-6 text-primary" />
                    <span className="">Medi-Care Connect</span>
                </a>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                    >
                        <Home className="h-4 w-4" />
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Users className="h-4 w-4" />
                        Patients
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            6
                        </Badge>
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Hospital className="h-4 w-4" />
                        Departments
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <BarChart3 className="h-4 w-4" />
                        Analytics
                    </a>
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Appointments />
            </div>
        </div>
    )
}
