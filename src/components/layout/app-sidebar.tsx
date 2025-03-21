// src/components/layout/app-sidebar.tsx
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LayoutDashboard,
  HelpCircle,
  Mail,
  MessageSquare,
  Stethoscope,
  Settings,
  X,
  BarChart3,
  MessagesSquare,
  ImageIcon,
  CalendarCheck,
  MousePointerClick
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export const company = {
  name: 'HealthcareAI',
  logo: Stethoscope,
  plan: 'Enterprise'
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const [helpDialogOpen, setHelpDialogOpen] = React.useState(false);
  
  // Check if sidebar is collapsed
  const isCollapsed = state === 'collapsed';

  // Create a mock user for demo purposes
  const demoUser = {
    name: 'Demo User',
    email: 'user@example.com',
    image: ''
  };

  // Navigation items with square box style
  const navItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      url: '/dashboard/overview',
      isActive: pathname === '/dashboard/overview',
      action: 'link'
    },
    {
      title: 'AI Assistant',
      icon: MessageSquare,
      url: '/dashboard/chat',
      isActive: pathname.includes('/dashboard/chat'),
      action: 'link'
    },
    {
      title: 'How to Use',
      icon: HelpCircle,
      url: '#',
      isActive: false,
      action: 'dialog'
    },
    {
      title: 'Contact Us',
      icon: Mail,
      url: '/dashboard/contact',
      isActive: pathname.includes('/dashboard/contact'),
      action: 'link'
    }
  ];

  const helpGuides = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: BarChart3,
      content: [
        "View healthcare analytics and statistics",
        "Monitor session trends and patient data",
        "Check recent activity and upcoming appointments",
        "Generate reports on healthcare metrics"
      ]
    },
    {
      id: 'assistant',
      title: 'AI Assistant',
      icon: MessagesSquare,
      content: [
        "Analyze clinical cases and patient scenarios",
        "Search medical literature and research",
        "Analyze symptoms and potential diagnoses",
        "Check drug interactions between medications"
      ]
    },
    {
      id: 'images',
      title: 'Image Analysis',
      icon: ImageIcon,
      content: [
        "Upload medical images for AI analysis",
        "Capture photos using your device camera",
        "Get detailed analysis of medical images",
        "Ask follow-up questions about image findings"
      ]
    },
    {
      id: 'appointments',
      title: 'Appointments',
      icon: CalendarCheck,
      content: [
        "View and manage upcoming patient appointments",
        "Schedule new appointments with specialists",
        "Receive reminders for scheduled appointments",
        "Generate Google Meet links for virtual consultations"
      ]
    }
  ];

  return (
    <>
      <Sidebar collapsible='icon'>
        <SidebarHeader>
          <div className='flex gap-2 py-2 text-sidebar-accent-foreground'>
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
              <company.logo className='size-4' />
            </div>
            <div className={`grid flex-1 text-left text-sm leading-tight ${isCollapsed ? 'hidden' : ''}`}>
              <span className='truncate font-semibold'>{company.name}</span>
              <span className='truncate text-xs'>{company.plan}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className='overflow-x-hidden'>
          <div className='flex flex-col gap-2 p-2'>
            {navItems.map((item) => (
              item.action === 'link' ? (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex flex-col items-center justify-center rounded-lg p-4 transition-colors 
                  ${item.isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card hover:bg-primary/10'}`}
                >
                  <div className="flex items-center justify-center w-6 h-6">
                    <item.icon className='w-6 h-6' />
                  </div>
                  {!isCollapsed && (
                    <span className='text-xs font-medium mt-2'>{item.title}</span>
                  )}
                </Link>
              ) : (
                <button
                  key={item.title}
                  className="flex flex-col items-center justify-center rounded-lg p-4 transition-colors bg-card hover:bg-primary/10"
                  onClick={() => setHelpDialogOpen(true)}
                >
                  <div className="flex items-center justify-center w-6 h-6">
                    <item.icon className='w-6 h-6' />
                  </div>
                  {!isCollapsed && (
                    <span className='text-xs font-medium mt-2'>{item.title}</span>
                  )}
                </button>
              )
            ))}
          </div>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size='lg'
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                  >
                    <Avatar className='h-8 w-8 rounded-lg'>
                      <AvatarImage
                        src={demoUser?.image || ''}
                        alt={demoUser?.name || ''}
                      />
                      <AvatarFallback className='rounded-lg'>
                        {demoUser?.name?.slice(0, 2)?.toUpperCase() || 'DU'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`grid flex-1 text-left text-sm leading-tight ${isCollapsed ? 'hidden' : ''}`}>
                      <span className='truncate font-semibold'>
                        {demoUser?.name || ''}
                      </span>
                      <span className='truncate text-xs'>
                        {demoUser?.email || ''}
                      </span>
                    </div>
                    <ChevronsUpDown className={`ml-auto size-4 ${isCollapsed ? 'hidden' : ''}`} />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                  side='bottom'
                  align='end'
                  sideOffset={4}
                >
                  <DropdownMenuLabel className='p-0 font-normal'>
                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                      <Avatar className='h-8 w-8 rounded-lg'>
                        <AvatarImage
                          src={demoUser?.image || ''}
                          alt={demoUser?.name || ''}
                        />
                        <AvatarFallback className='rounded-lg'>
                          {demoUser?.name?.slice(0, 2)?.toUpperCase() ||
                            'DU'}
                        </AvatarFallback>
                      </Avatar>
                      <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>
                          {demoUser?.name || ''}
                        </span>
                        <span className='truncate text-xs'>
                          {' '}
                          {demoUser?.email || ''}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Help Dialog - Improved UI */}
      <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold">
              <HelpCircle className="mr-2 h-5 w-5 text-primary" />
              Quick Start Guide
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="dashboard" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              {helpGuides.map(guide => (
                <TabsTrigger key={guide.id} value={guide.id}>
                  <guide.icon className="mr-1 h-4 w-4" />
                  <span className="hidden sm:inline">{guide.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {helpGuides.map(guide => (
              <TabsContent key={guide.id} value={guide.id} className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <guide.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="ml-3 text-lg font-medium">Using the {guide.title}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {guide.content.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <MousePointerClick className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Logic to show video tutorial would go here
                          console.log(`Show ${guide.title} video tutorial`);
                        }}
                      >
                        Watch Video
                      </Button>
                      
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => {
                          setHelpDialogOpen(false);
                          // Navigate to the relevant section
                          if (guide.id === 'dashboard') {
                            window.location.href = '/dashboard/overview';
                          } else if (guide.id === 'assistant') {
                            window.location.href = '/dashboard/chat';
                          }
                        }}
                      >
                        Try Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="flex justify-between items-center mt-4 pt-2 border-t">
            <span className="text-xs text-muted-foreground">Need more help? Contact support at support@healthcareai.com</span>
            <Button variant="ghost" size="sm" onClick={() => setHelpDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}