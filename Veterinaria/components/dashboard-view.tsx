'use client'

import { Servicios } from '@/lib/types'
import { 
  Stethoscope, 
  Syringe, 
  Scissors, 
  Bug, 
  Sparkles,
  ScanLine,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DashboardViewProps {
  servicios: Servicios[]
  onLogin: () => void
}

// Mapeo de iconos por nombre de servicio
const iconMap: Record<string, React.ElementType> = {
  'Consulta General': Stethoscope,
  'Vacunacion': Syringe,
  'Cirugia Menor': Scissors,
  'Desparasitacion': Bug,
  'Limpieza Dental': Sparkles,
  'Radiografia': ScanLine,
}

export function DashboardView({ servicios, onLogin }: DashboardViewProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Sistema de Gestion Veterinaria
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Cuidado profesional para tu mejor amigo
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                MediVet te ofrece una plataforma integral para gestionar la salud de tus mascotas. 
                Agenda citas, accede a historiales medicos y manten sus vacunas al dia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={onLogin} className="gap-2">
                  Comenzar ahora
                  <ArrowRight className="w-4 h-4" />
                </Button>
                {/* BOTÓN ACTUALIZADO CON SCROLL SUAVE */}
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Conocer mas
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card rounded-3xl p-8 shadow-xl border">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-primary">+500</p>
                    <p className="text-sm text-muted-foreground">Mascotas atendidas</p>
                  </div>
                  <div className="bg-accent/10 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-accent">+1200</p>
                    <p className="text-sm text-muted-foreground">Consultas realizadas</p>
                  </div>
                  <div className="bg-secondary rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Clientes satisfechos</p>
                  </div>
                  <div className="bg-secondary rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-foreground">24/7</p>
                    <p className="text-sm text-muted-foreground">Soporte disponible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Nuestros Servicios */}
      <section id="servicios" className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Servicios</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Nuestros Servicios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contamos con un equipo de profesionales altamente capacitados y la tecnologia 
              mas avanzada para brindar el mejor cuidado a tu mascota.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((servicio) => {
              const Icon = iconMap[servicio.nombre] || Stethoscope
              return (
                <Card 
                  key={servicio.id_servicio} 
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-lg font-semibold">
                        ${servicio.precio.toFixed(2)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mt-4">{servicio.nombre}</CardTitle>
                    <CardDescription>{servicio.descripción}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between group-hover:text-primary" onClick={onLogin}>
                      Agendar cita
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unete a MediVet y comienza a gestionar la salud de tus mascotas de manera profesional y eficiente.
          </p>
          <Button size="lg" onClick={onLogin} className="gap-2">
            Crear cuenta gratuita
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer Actualizado a MediVet */}
      <footer className="py-8 px-6 border-t bg-card">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 MediVet. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terminos
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}