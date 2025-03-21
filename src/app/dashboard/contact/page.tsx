// src/app/dashboard/contact/page.tsx
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Healthcare Dashboard - Contact Us'
};

interface DeveloperProps {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  imageSrc?: string;
  github?: string;
  linkedin?: string;
  skills: string[];
}

const developers: DeveloperProps[] = [
  {
    name: "Dharma Sai Kumar Reddy",
    role: "Senior Software Engineer",
    company: "Infosys",
    email: "dharma.saik@example.com",
    phone: "+91 9876543210",
    location: "Hyderabad, India",
    github: "https://github.com/dharmasaikumar",
    linkedin: "https://linkedin.com/in/dharmasaikumar",
    skills: ["React", "Next.js", "TypeScript", "Healthcare IT"]
  },
  {
    name: "N V Durga Prasad",
    role: "Technology Lead",
    company: "Infosys",
    email: "nvdurga.prasad@example.com",
    phone: "+91 9876543211",
    location: "Bangalore, India",
    github: "https://github.com/nvdurgaprasad",
    linkedin: "https://linkedin.com/in/nvdurgaprasad",
    skills: ["AI/ML", "Python", "Flask", "Healthcare Analytics"]
  },
  {
    name: "Sowjanya Badugu",
    role: "UI/UX Designer",
    company: "Infosys",
    email: "sowjanya.badugu@example.com",
    phone: "+91 9876543212",
    location: "Hyderabad, India",
    github: "https://github.com/sowjanyabadugu",
    linkedin: "https://linkedin.com/in/sowjanyabadugu",
    skills: ["UI Design", "UX Research", "Figma", "Accessibility"]
  },
  {
    name: "Saketh Tallam",
    role: "Backend Developer",
    company: "Infosys",
    email: "saketh.tallam@example.com",
    phone: "+91 9876543213",
    location: "Pune, India",
    github: "https://github.com/sakethtallam",
    linkedin: "https://linkedin.com/in/sakethtallam",
    skills: ["Node.js", "Database Design", "API Development", "Cloud Infrastructure"]
  }
];

const DeveloperCard = ({ developer }: { developer: DeveloperProps }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="bg-muted h-12"></div>
      <CardContent className="pt-0">
        <div className="flex flex-col items-center -mt-8">
          <Avatar className="h-16 w-16 border-4 border-background">
            <AvatarImage src={developer.imageSrc} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {developer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg mt-2">{developer.name}</h3>
          <div className="text-sm text-muted-foreground">{developer.role}</div>
          <Badge variant="outline" className="mt-1">
            {developer.company}
          </Badge>
          
          <div className="grid grid-cols-1 gap-2 w-full mt-4">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              <span>{developer.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              <span>{developer.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span>{developer.location}</span>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            {developer.github && (
              <a href={developer.github} target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Github className="h-4 w-4" />
              </a>
            )}
            {developer.linkedin && (
              <a href={developer.linkedin} target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-4 justify-center">
            {developer.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ContactPage() {
  return (
    <PageContainer>
      <div className='space-y-4'>
        <h2 className='text-3xl font-bold tracking-tight'>Development Team</h2>
        <p className='text-muted-foreground'>
          Meet the talented developers behind the Healthcare AI Dashboard
        </p>
        
        <div className="grid grid-cols-2 gap-6 mt-6">
          {developers.map((developer) => (
            <DeveloperCard key={developer.name} developer={developer} />
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground">support@healthcareai.com</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Office Address</h3>
              <p className="text-sm text-muted-foreground">Infosys, Hyderabad, India</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}