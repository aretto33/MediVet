'use client'
import { useState } from 'react'
import { Stethoscope, MapPin, Phone, Calendar, Clock, Star, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ListaVeterinariosView() {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedVet, setSelectedVet] = useState<any>(null);

  const veterinarios = [
    {
      id: 1,
      nombre: "Dr. Alejandro Martínez",
      especialidad: "Cirugía de Pequeñas Especies",
      direccion: "Av. Universidad #450, Col. Center",
      telefono: "555-0123-456",
      costo: "$500.00",
      calificacion: 4.9,
      disponibilidad: "Lunes a Viernes",
      horario: "09:00 AM - 06:00 PM"
    },
    {
      id: 2,
      nombre: "Dra. Arlette Silva",
      especialidad: "Dermatología Veterinaria",
      direccion: "Calle Roble #12, Plaza Veterinaria",
      telefono: "555-9876-543",
      costo: "$650.00",
      calificacion: 5.0,
      disponibilidad: "Martes a Sábado",
      horario: "10:00 AM - 07:00 PM"
    }
  ];

  const handleOpenBooking = (vet: any) => {
    setSelectedVet(vet);
    setIsAdding(true);
  };

  const handleConfirmCita = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Cita agendada con éxito con el ${selectedVet.nombre}!`);
    setIsAdding(false);
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50/50 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Nuestros Especialistas</h2>
        <p className="text-slate-500 text-lg">Selecciona un médico y agenda tu cita al instante</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {veterinarios.map((vet) => (
          <div key={vet.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{vet.nombre}</h3>
                    <p className="text-blue-600 font-medium text-sm">{vet.especialidad}</p>
                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">{vet.calificacion}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Costo Consulta</p>
                  <p className="text-2xl font-black text-slate-900">{vet.costo}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{vet.direccion}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{vet.telefono}</span>
                  </div>
                </div>
                <div className="space-y-3 border-l md:pl-6 border-slate-100">
                  <div className="flex items-center gap-3 text-slate-600 font-semibold italic text-blue-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{vet.disponibilidad}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{vet.horario}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleOpenBooking(vet)}
                className="w-full py-7 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all text-lg shadow-lg group-hover:scale-[1.02]"
              >
                Generar Cita con este Especialista
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL PARA AGENDAR DIRECTAMENTE AQUÍ */}
      {isAdding && selectedVet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setIsAdding(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Nueva Cita</h3>
                <p className="text-blue-100 text-sm italic">Con el {selectedVet.nombre}</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleConfirmCita} className="p-8 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre de la Mascota</label>
                <input required className="w-full mt-1 p-3 bg-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej. Luna o Max" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Fecha</label>
                  <input type="date" required className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Hora</label>
                  <input type="time" required className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Motivo de Consulta</label>
                <textarea required className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none h-24 resize-none focus:ring-2 focus:ring-blue-500" placeholder="Escribe el motivo de la cita..."></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full py-6 bg-blue-600 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700">
                  Confirmar y Agendar
                </Button>
                <p className="text-center text-[10px] text-slate-400 mt-3 uppercase tracking-tighter">
                  Esta cita se guardará automáticamente en tu agenda de Mis Citas
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}