'use client'
import { useState } from 'react'
import { Calendar, Trash2, Plus, MapPin, User as UserIcon, Clock, Info, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CitasView() {
  const [selectedCita, setSelectedCita] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [citas, setCitas] = useState([
    { 
      id: 1, 
      mascota: "Luna", 
      fecha: "15/03/2026", 
      hora: "10:00 AM", 
      motivo: "Vacunación Anual",
      veterinario: "Dr. Alejandro Martínez",
      direccion: "Av. Universidad #450, Col. Centro",
      descripcion: "Refuerzo de vacuna quíntuple y revisión de peso general."
    }
  ]);

  const handleSaveCita = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const nuevaCita = {
      id: citas.length + 1,
      mascota: formData.get('mascota'),
      fecha: formData.get('fecha'),
      hora: formData.get('hora'),
      motivo: formData.get('motivo'),
      veterinario: formData.get('veterinario'),
      direccion: "Av. Universidad #450, Col. Centro",
      descripcion: formData.get('descripcion') || "Sin descripción adicional."
    };

    setCitas([...citas, nuevaCita as any]);
    setIsAdding(false);
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50/50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Mis Citas</h2>
          <p className="text-slate-500">Gestión de consultas para tus mascotas</p>
        </div>
        <Button 
          onClick={() => setIsAdding(true)}
          className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-md rounded-xl px-6 py-6"
        >
          <Plus className="w-5 h-5" /> Agendar Cita
        </Button>
      </div>

      <div className="grid gap-4">
        {citas.map((cita) => (
          <div 
            key={cita.id} 
            onClick={() => setSelectedCita(cita)}
            className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group animate-in slide-in-from-bottom-2"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Calendar className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{cita.mascota}</h4>
                <p className="text-sm text-slate-500">{cita.fecha} • {cita.hora}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Detalles</span>
          </div>
        ))}
      </div>

      {/* MODAL: AGENDAR CITA */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setIsAdding(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">Nueva Cita</h3>
              <button onClick={() => setIsAdding(false)}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSaveCita} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Mascota</label>
                <input name="mascota" required className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none" placeholder="Nombre de tu mascota" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Veterinario</label>
                <select name="veterinario" className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none">
                  <option>Dr. Alejandro Martínez</option>
                  <option>Dra. Arlette Silva</option>
                  <option>Dr. Roberto Gómez</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Fecha</label>
                  <input name="fecha" type="date" required className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Hora</label>
                  <input name="hora" type="time" required className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Motivo</label>
                <input name="motivo" required className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none" placeholder="Ej. Revisión dental" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Descripción</label>
                <textarea name="descripcion" className="w-full mt-1 p-3 bg-slate-100 rounded-xl outline-none h-24 resize-none" placeholder="Detalles adicionales..."></textarea>
              </div>
              <Button type="submit" className="w-full py-6 bg-blue-600 rounded-xl font-bold">Confirmar Cita</Button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETALLES DE CITA */}
      {selectedCita && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setSelectedCita(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Detalles de la Cita</h3>
                <p className="text-blue-100 text-sm">Paciente: {selectedCita.mascota}</p>
              </div>
              <button onClick={() => setSelectedCita(null)}><X className="w-6 h-6" /></button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="p-2 h-fit bg-slate-100 rounded-lg text-slate-600"><UserIcon className="w-5 h-5" /></div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold">Veterinario</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedCita.veterinario}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 h-fit bg-slate-100 rounded-lg text-slate-600"><Clock className="w-5 h-5" /></div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold">Horario</p>
                    <p className="text-sm font-semibold text-slate-800">{selectedCita.fecha} • {selectedCita.hora}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 h-fit bg-slate-100 rounded-lg text-slate-600"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Ubicación</p>
                  <p className="text-sm font-semibold text-slate-800">{selectedCita.direccion}</p>
                </div>
              </div>

              {/* SECCIÓN DE DESCRIPCIÓN RESTAURADA */}
              <div className="flex gap-3 border-t pt-6">
                <div className="p-2 h-fit bg-blue-50 rounded-lg text-blue-600"><Info className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] uppercase text-blue-400 font-bold">Motivo y Descripción</p>
                  <p className="text-sm text-slate-700 leading-relaxed mt-1">
                    <span className="font-bold">{selectedCita.motivo}:</span> {selectedCita.descripcion}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex gap-3">
              <Button variant="outline" onClick={() => setSelectedCita(null)} className="flex-1 rounded-xl">Cerrar</Button>
              <Button 
                variant="destructive" 
                className="flex-1 gap-2 rounded-xl"
                onClick={() => {
                  setCitas(citas.filter(c => c.id !== selectedCita.id));
                  setSelectedCita(null);
                }}
              >
                <Trash2 className="w-4 h-4" /> cancelar_cita()
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}