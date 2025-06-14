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
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  Clock,
  DollarSign,
  Stethoscope,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { mockServices } from "@/lib/data";
import { Service } from "@/types";

const categoryColors = {
  Prevención: "bg-green-100 text-green-800",
  Consulta: "bg-blue-100 text-blue-800",
  Restauración: "bg-yellow-100 text-yellow-800",
  Cirugía: "bg-red-100 text-red-800",
  Estética: "bg-purple-100 text-purple-800",
};

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState(mockServices);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleServiceStatus = (serviceId: string) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, isActive: !service.isActive }
          : service,
      ),
    );
  };

  const activeServices = services.filter((s) => s.isActive).length;
  const totalRevenue = services
    .filter((s) => s.isActive)
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Servicios
          </h1>
          <p className="text-gray-600 mt-1">
            Administra los servicios ofrecidos por la clínica
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Servicio
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Servicios
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {services.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Servicios Activos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeServices}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Precio Promedio
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  S/ {Math.round(totalRevenue / activeServices) || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Duración Promedio
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    services.reduce((sum, s) => sum + s.duration, 0) /
                      services.length,
                  ) || 0}{" "}
                  min
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar servicios por nombre o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className={`transition-all ${service.isActive ? "" : "opacity-60"}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge
                    className={
                      categoryColors[
                        service.category as keyof typeof categoryColors
                      ] || "bg-gray-100 text-gray-800"
                    }
                  >
                    {service.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={service.isActive}
                    onCheckedChange={() => toggleServiceStatus(service.id)}
                  />
                  {service.isActive ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {service.description}
              </CardDescription>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {service.duration} min
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    S/ {service.price}
                  </span>
                </div>
              </div>

              {service.requirements && service.requirements.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Requisitos:
                  </h4>
                  <ul className="space-y-1">
                    {service.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="text-xs text-gray-600 flex items-center"
                      >
                        <span className="h-1 w-1 bg-gray-400 rounded-full mr-2"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron servicios
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta con otros términos de búsqueda o crea un nuevo servicio.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Crear Nuevo Servicio
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
