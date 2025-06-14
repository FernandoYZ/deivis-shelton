import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  User,
} from "lucide-react";
import { mockPatients } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Pacientes
          </h1>
          <p className="text-gray-600 mt-1">
            Administra la información de todos los pacientes
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar pacientes por nombre, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Pacientes
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockPatients.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pacientes Activos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockPatients.filter((p) => p.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Con Alergias
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockPatients.filter((p) => p.allergies.length > 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>
            {filteredPatients.length} pacientes encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary-700">
                      {patient.firstName[0]}
                      {patient.lastName[0]}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <Badge
                        variant={
                          patient.status === "active" ? "default" : "secondary"
                        }
                      >
                        {patient.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {patient.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                      </div>
                    </div>
                    {patient.allergies.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="h-3 w-3 text-amber-500" />
                        <span className="text-xs text-amber-600">
                          Alergias: {patient.allergies.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {patient.nextAppointment && (
                    <Badge variant="outline" className="text-xs">
                      Próxima:{" "}
                      {new Date(patient.nextAppointment).toLocaleDateString()}
                    </Badge>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {patient.firstName} {patient.lastName}
                        </DialogTitle>
                        <DialogDescription>
                          Información completa del paciente
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Información Personal
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                {patient.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                {patient.phone}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                {patient.address}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                {new Date(
                                  patient.dateOfBirth,
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Contacto de Emergencia
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <strong>Nombre:</strong>{" "}
                                {patient.emergencyContact.name}
                              </p>
                              <p>
                                <strong>Teléfono:</strong>{" "}
                                {patient.emergencyContact.phone}
                              </p>
                              <p>
                                <strong>Relación:</strong>{" "}
                                {patient.emergencyContact.relationship}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Historial Médico
                            </h4>
                            {patient.medicalHistory.length > 0 ? (
                              <ul className="space-y-1 text-sm">
                                {patient.medicalHistory.map(
                                  (condition, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center"
                                    >
                                      <span className="h-1.5 w-1.5 bg-red-400 rounded-full mr-2"></span>
                                      {condition}
                                    </li>
                                  ),
                                )}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500">
                                Sin condiciones médicas registradas
                              </p>
                            )}
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Alergias
                            </h4>
                            {patient.allergies.length > 0 ? (
                              <ul className="space-y-1 text-sm">
                                {patient.allergies.map((allergy, index) => (
                                  <li key={index} className="flex items-center">
                                    <AlertTriangle className="h-3 w-3 text-amber-500 mr-2" />
                                    {allergy}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500">
                                Sin alergias conocidas
                              </p>
                            )}
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Última Visita
                            </h4>
                            <p className="text-sm">
                              {patient.lastVisit
                                ? new Date(
                                    patient.lastVisit,
                                  ).toLocaleDateString()
                                : "Sin visitas registradas"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Editar información</DropdownMenuItem>
                      <DropdownMenuItem>
                        Ver historial de citas
                      </DropdownMenuItem>
                      <DropdownMenuItem>Agendar nueva cita</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Desactivar paciente
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
