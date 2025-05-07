import Link from "next/link"
import Image from "next/image"
import { Leaf, Github, Linkedin, Mail, Globe, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Reemplazar el array teamMembers con la información real del equipo
const teamMembers = [
  {
    name: "Julian Bastidas",
    role: "Ingeniero de Software",
    bio: "Project Manager - Software Architect - DevOps. Especialista en TypeScript, Next.js y Node.js.",
    image: "/images/avatar1.jpeg",
    github: "https://github.com/julianbastidas",
    linkedin: "https://linkedin.com/in/julianbastidas",
    email: "julian@espuma-tech.com",
  },
  {
    name: "Chris Santacruz",
    role: "Ingeniero de Software",
    bio: "Full-stack - AR/VR - Blockchain - Machine Learning. Experto en React, Angular y Next.js.",
    image: "/images/chris.jpeg",
    github: "https://github.com/chrissantacruz",
    linkedin: "https://linkedin.com/in/chrissantacruz",
    email: "chris@espuma-tech.com",
  },
  {
    name: "Camilo Pulistar",
    role: "Ingeniero de Software",
    bio: "Full-stack - QA - Designer. Especializado en Angular, JavaScript y React.",
    image: "/images/pulistar.jpeg",
    github: "https://github.com/camilopulistar",
    linkedin: "https://linkedin.com/in/camilopulistar",
    email: "camilo@espuma-tech.com",
  },
  {
    name: "Luis Inguilan",
    role: "Ingeniero de Software",
    bio: "Mobile. Especialista en React Native, Swift y Kotlin para desarrollo móvil.",
    image: "/images/david3.jpeg",
    github: "https://github.com/luisinguilan",
    linkedin: "https://linkedin.com/in/luisinguilan",
    email: "luis@espuma-tech.com",
  },
  {
    name: "Jhon Ortiz",
    role: "Ingeniero de Software",
    bio: "Backend. Especializado en desarrollo de APIs, bases de datos y arquitectura de servidores.",
    image: "/images/jhonortiz.webp?height=300&width=300&text=Jhon",
    github: "https://github.com/jhonortiz",
    linkedin: "https://linkedin.com/in/jhonortiz",
    email: "jhon@espuma-tech.com",
  },
]

const projects = [
  {
    title: "Ecocommers Nariño",
    description: "Marketplace de plantas nativas de la región de Nariño, Colombia.",
    link: "/",
  },
  {
    title: "Sistema de Gestión Ambiental",
    description: "Plataforma para monitoreo y gestión de recursos naturales en zonas protegidas.",
    link: "#",
  },
  {
    title: "App de Seguimiento de Cultivos",
    description: "Aplicación móvil para agricultores que permite seguimiento y optimización de cultivos.",
    link: "#",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-800">Ecocommers Nariño</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-green-800 font-medium hover:text-green-600">
              Inicio
            </Link>
            <Link href="/marketplace" className="text-green-800 font-medium hover:text-green-600">
              Tienda
            </Link>
            <Link href="/about" className="text-green-800 font-medium hover:text-green-600">
              Nosotros
            </Link>
          </nav>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/marketplace">Comprar Ahora</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-4 md:py-8 lg:py-10 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-2 md:px-3">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">Nuestro Equipo</h1>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Somos Espuma Tech, un equipo de desarrolladores apasionados por crear soluciones digitales innovadoras y
                sostenibles para el sector agrícola y ambiental.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={member.image || "/placeholder.svg"} fill alt={member.name} className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={member.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5 text-gray-600 hover:text-green-600" />
                    </Link>
                    <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5 text-gray-600 hover:text-green-600" />
                    </Link>
                    <Link href={`mailto:${member.email}`}>
                      <Mail className="h-5 w-5 text-gray-600 hover:text-green-600" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-4 md:py-8 bg-white">
          <div className="container px-2 md:px-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Nuestra Misión</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                En Espuma Tech, nos dedicamos a crear soluciones digitales que conecten a las personas con la naturaleza
                y promuevan prácticas sostenibles en la agricultura y el cuidado del medio ambiente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button asChild variant="outline" className="border-green-600 text-green-600">
                  <Link href="https://espuma-tech.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    Visitar Nuestro Portafolio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-4 md:py-8 bg-green-50">
          <div className="container px-2 md:px-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Contáctanos</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                ¿Tienes un proyecto en mente? ¡Hablemos! Estamos aquí para ayudarte a llevar tus ideas a la realidad.
              </p>
              <div className="flex flex-col items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">espuma.tech.startup@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">Pasto, Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-green-800 text-white py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-bold">Ecocommers Nariño</span>
          </div>
          <div className="text-sm text-green-100">© 2025 Ecocommers Nariño. Todos los derechos reservados.</div>
          <div className="flex gap-4">
            <Link href="#" className="text-green-100 hover:text-white">
              Términos
            </Link>
            <Link href="#" className="text-green-100 hover:text-white">
              Privacidad
            </Link>
            <Link href="/about" className="text-green-100 hover:text-white">
              Nosotros
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
