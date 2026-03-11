'use client'

import { useState } from 'react'
import { Mascotas } from '@/lib/types'
import { 
  Plus, 
  PawPrint,
  Dog,
  Cat,
  Bird,
  Rabbit,
  Calendar,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ClienteViewProps {
  mascotas: Mascotas[]
  userName: string
  onAgregarMascota: (mascota: Omit<Mascotas, 'id'>) => void
}

export function ClienteView({ mascotas, userName, onAgregarMascota }: ClienteViewProps) {
  const [isMascotaDialogOpen, setIsMascotaDialogOpen] = useState(false)
  
  // Form state usando nombres del diagrama UML para Mascotas
  const [mascotaForm, setMascotaForm] = useState({
    Nombre: '',
    Especie: '',
    Raza: '',
    Fecha_Nacimiento: ''
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const especiesOptions = [
    { value: 'Canino', label: 'Canino', icon: Dog },
    { value: 'Felino', label: 'Felino', icon: Cat },
    { value: 'Ave', label: 'Ave', icon: Bird },
    { value: 'Roedor', label: 'Roedor', icon: Rabbit },
  ]

  const razasPorEspecie: Record<string, string[]> = {
    'Canino': ['Golden Retriever', 'Labrador', 'Bulldog Frances', 'Pastor Aleman', 'Chihuahua', 'Poodle', 'Husky', 'Beagle', 'Otro'],
    'Felino': ['Persa', 'Siames', 'Maine Coon', 'Britanico', 'Bengal', 'Ragdoll', 'Mestizo', 'Otro'],
    'Ave': ['Canario', 'Periquito', 'Cockatiel', 'Loro', 'Otro'],
    'Roedor': ['Hamster', 'Cobayo', 'Conejo', 'Chinchilla', 'Otro'],
  }

  const getSpeciesIcon = (Especie: string) => {
    switch(Especie.toLowerCase()) {
      case 'canino':
        return Dog
      case 'felino':
        return Cat
      case 'ave':
        return Bird
      case 'roedor':
        return Rabbit
      default:
        return PawPrint
    }
  }

  const getSpeciesColor = (Especie: string) => {
    switch(Especie.toLowerCase()) {
      case 'canino':
        return 'bg-amber-100 text-amber-700'
      case 'felino':
        return 'bg-violet-100 text-violet-700'
      case 'ave':
        return 'bg-sky-100 text-sky-700'
      case 'roedor':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-primary/10 text-primary'
    }
  }

  const openMascotaDialog = () => {
    setMascotaForm({
      Nombre: '',
      Especie: '',
      Raza: '',
      Fecha_Nacimiento: ''
    })
    setFormErrors({})
    setIsMascotaDialogOpen(true)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!mascotaForm.Nombre.trim()) {
      errors.Nombre = 'El nombre es requerido'
    }
    if (!mascotaForm.Especie) {
      errors.Especie = 'La especie es requerida'
    }
    if (!mascotaForm.Raza) {
      errors.Raza = 'La raza es requerida'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Metodo agregar_mascotas() segun diagrama UML de la clase Cliente
  const agregar_mascotas = () => {
    if (validateForm()) {
      onAgregarMascota({
        Nombre: mascotaForm.Nombre,
        Especie: mascotaForm.Especie,
        Raza: mascotaForm.Raza,
        Fecha_Nacimiento: mascotaForm.Fecha_Nacimiento || undefined,
        fk_cliente: 1
      })
      setIsMascotaDialogOpen(false)
      setMascotaForm({
        Nombre: '',
        Especie: '',
        Raza: '',
        Fecha_Nacimiento: ''
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mis Mascotas</h1>
          <p className="text-muted-foreground">Hola {userName}, gestiona la informacion de tus mascotas</p>
        </div>
        <Button className="gap-2" onClick={openMascotaDialog}>
          <Plus className="w-4 h-4" />
          Agregar Mascota
        </Button>
      </div>

      {/* Stats Cards - Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <PawPrint className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Mascotas</p>
              <p className="text-2xl font-bold">{mascotas.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-xl bg-accent/10">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Citas Pendientes</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-xl bg-green-100">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Proxima Cita</p>
              <p className="text-2xl font-bold">15 Mar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mascotas Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Tus Mascotas</h2>
          <Badge variant="secondary">{mascotas.length} registradas</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotas.map((mascota) => {
            const Icon = getSpeciesIcon(mascota.Especie)
            const colorClass = getSpeciesColor(mascota.Especie)
            
            return (
              <Card 
                key={mascota.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Card Header with gradient */}
                <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 relative">
                  <div className="absolute -bottom-8 left-6">
                    <div className={`w-16 h-16 rounded-2xl ${colorClass} flex items-center justify-center shadow-lg border-4 border-card`}>
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pt-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{mascota.Nombre}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {mascota.Especie}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Pet Details - Usando nombres exactos del diagrama UML */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Nombre</span>
                      <span className="font-medium">{mascota.Nombre}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Especie</span>
                      <span className="font-medium">{mascota.Especie}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Raza</span>
                      <span className="font-medium">{mascota.Raza}</span>
                    </div>
                    {mascota.Fecha_Nacimiento && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Fecha Nacimiento</span>
                        <span className="font-medium">{mascota.Fecha_Nacimiento}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Add Pet Card */}
          <Card 
            className="border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group flex items-center justify-center min-h-[300px]"
            onClick={openMascotaDialog}
          >
            <CardContent className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Agregar Mascota
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mascota Dialog - agregar_mascotas() */}
      <Dialog open={isMascotaDialogOpen} onOpenChange={setIsMascotaDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-primary" />
              Agregar Mascota
            </DialogTitle>
            <DialogDescription>
              Registra una nueva mascota en tu cuenta
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input 
                id="nombre"
                placeholder="Nombre de tu mascota"
                value={mascotaForm.Nombre}
                onChange={(e) => setMascotaForm({...mascotaForm, Nombre: e.target.value})}
                className={formErrors.Nombre ? 'border-destructive' : ''}
              />
              {formErrors.Nombre && (
                <p className="text-xs text-destructive">{formErrors.Nombre}</p>
              )}
            </div>

            {/* Especie */}
            <div className="space-y-2">
              <Label htmlFor="especie">Especie *</Label>
              <Select 
                value={mascotaForm.Especie} 
                onValueChange={(value) => setMascotaForm({...mascotaForm, Especie: value, Raza: ''})}
              >
                <SelectTrigger className={formErrors.Especie ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Selecciona la especie" />
                </SelectTrigger>
                <SelectContent>
                  {especiesOptions.map((especie) => (
                    <SelectItem key={especie.value} value={especie.value}>
                      <div className="flex items-center gap-2">
                        <especie.icon className="w-4 h-4" />
                        {especie.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.Especie && (
                <p className="text-xs text-destructive">{formErrors.Especie}</p>
              )}
            </div>

            {/* Raza */}
            <div className="space-y-2">
              <Label htmlFor="raza">Raza *</Label>
              <Select 
                value={mascotaForm.Raza} 
                onValueChange={(value) => setMascotaForm({...mascotaForm, Raza: value})}
                disabled={!mascotaForm.Especie}
              >
                <SelectTrigger className={formErrors.Raza ? 'border-destructive' : ''}>
                  <SelectValue placeholder={mascotaForm.Especie ? "Selecciona la raza" : "Primero selecciona la especie"} />
                </SelectTrigger>
                <SelectContent>
                  {mascotaForm.Especie && razasPorEspecie[mascotaForm.Especie]?.map((raza) => (
                    <SelectItem key={raza} value={raza}>
                      {raza}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.Raza && (
                <p className="text-xs text-destructive">{formErrors.Raza}</p>
              )}
            </div>

            {/* Fecha_Nacimiento */}
            <div className="space-y-2">
              <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento (opcional)</Label>
              <Input 
                id="fecha_nacimiento"
                type="date"
                value={mascotaForm.Fecha_Nacimiento}
                onChange={(e) => setMascotaForm({...mascotaForm, Fecha_Nacimiento: e.target.value})}
              />
            </div>

            {/* Preview */}
            {mascotaForm.Nombre && mascotaForm.Especie && (
              <div className="p-4 rounded-lg bg-muted/50 border">
                <p className="text-xs text-muted-foreground mb-2">Vista previa</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${getSpeciesColor(mascotaForm.Especie)} flex items-center justify-center`}>
                    {(() => {
                      const Icon = getSpeciesIcon(mascotaForm.Especie)
                      return <Icon className="w-5 h-5" />
                    })()}
                  </div>
                  <div>
                    <p className="font-medium">{mascotaForm.Nombre}</p>
                    <p className="text-xs text-muted-foreground">
                      {mascotaForm.Especie}{mascotaForm.Raza && ` - ${mascotaForm.Raza}`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMascotaDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={agregar_mascotas} className="gap-2">
              <Plus className="w-4 h-4" />
              Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
