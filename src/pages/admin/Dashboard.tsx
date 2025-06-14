import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserMd,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";
import { dashboardStats, mockPatients, mockDoctors } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const statCards = [
  {
    title: "Total Pacientes",
    value: dashboardStats.totalPatients,
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Citas Hoy",
    value: dashboardStats.todayAppointments,
    change: "+5",
    changeType: "positive" as const,
    icon: Calendar,
    color: "bg-green-500",
  },
  {
    title: "Ingresos Mensuales",
    value: `S/ ${dashboardStats.monthlyRevenue.toLocaleString()}`,
    change: "+23%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "bg-emerald-500",
  },
  {
    title: "Doctores Disponibles",
    value: dashboardStats.doctorsAvailable,
    change: "2/2",
    changeType: "neutral" as const,
    icon: UserMd,
    color: "bg-purple-500",
  },
];

const recentPatients = mockPatients.slice(0, 3);
const availableDoctors = mockDoctors.filter((d) => d.status === "active");

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bienvenido al panel administrativo de Clínica Dental
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Ver Calendario
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cita
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp
                  className={`h-3 w-3 mr-1 ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                />
                <p
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change} desde el mes pasado
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-600" />
              Pacientes Recientes
            </CardTitle>
            <CardDescription>
              Últimos pacientes registrados en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {patient.firstName[0]}
                      {patient.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{patient.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      patient.status === "active" ? "default" : "secondary"
                    }
                  >
                    {patient.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                  {patient.nextAppointment && (
                    <p className="text-xs text-gray-500 mt-1">
                      Próxima cita:{" "}
                      {new Date(patient.nextAppointment).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Ver Todos los Pacientes
            </Button>
          </CardContent>
        </Card>

        {/* Available Doctors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserMd className="h-5 w-5 mr-2 text-medical-600" />
              Doctores Disponibles
            </CardTitle>
            <CardDescription>
              Estado actual de los doctores en la clínica
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-medical-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-medical-700">
                      {doctor.firstName.split(" ")[1][0]}
                      {doctor.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {doctor.firstName} {doctor.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Disponible</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {doctor.experience} años exp.
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
            Acciones Pendientes
          </CardTitle>
          <CardDescription>
            Tareas y notificaciones que requieren atención
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-900">
                    {dashboardStats.pendingAppointments} citas pendientes de
                    confirmación
                  </p>
                  <p className="text-sm text-amber-700">
                    Requieren confirmación del paciente
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Revisar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">
                    3 nuevos pacientes registrados
                  </p>
                  <p className="text-sm text-blue-700">
                    Pendientes de primera consulta
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Ver Detalles
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
