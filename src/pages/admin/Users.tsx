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
  Shield,
  User,
  Settings,
  MoreHorizontal,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
} from "lucide-react";
import { mockUsers } from "@/lib/data";
import { User as UserType } from "@/types";
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
import { Switch } from "@/components/ui/switch";

const roleIcons = {
  admin: Shield,
  doctor: UserCheck,
  staff: User,
  patient: User,
};

const roleColors = {
  admin: "bg-red-100 text-red-800",
  doctor: "bg-blue-100 text-blue-800",
  staff: "bg-green-100 text-green-800",
  patient: "bg-gray-100 text-gray-800",
};

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  suspended: "bg-red-100 text-red-800",
};

const roleLabels = {
  admin: "Administrador",
  doctor: "Doctor",
  staff: "Personal",
  patient: "Paciente",
};

const statusLabels = {
  active: "Activo",
  inactive: "Inactivo",
  suspended: "Suspendido",
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "active"
                  ? "suspended"
                  : ("active" as UserType["status"]),
            }
          : user,
      ),
    );
  };

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin").length,
    doctors: users.filter((u) => u.role === "doctor").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600 mt-1">
            Administra usuarios y permisos del sistema
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Usuarios
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats.total}
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
                  Usuarios Activos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats.active}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Administradores
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats.admins}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Doctores</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats.doctors}
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
              placeholder="Buscar usuarios por nombre, email o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {filteredUsers.length} usuarios encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const RoleIcon = roleIcons[user.role];
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <RoleIcon className="h-6 w-6 text-primary-700" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </h3>
                        <Badge className={roleColors[user.role]}>
                          {roleLabels[user.role]}
                        </Badge>
                        <Badge className={statusColors[user.status]}>
                          {statusLabels[user.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{user.email}</span>
                        {user.lastLogin && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Último acceso:{" "}
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Activo</span>
                      <Switch
                        checked={user.status === "active"}
                        onCheckedChange={() => toggleUserStatus(user.id)}
                      />
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Permisos
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            Permisos de {user.firstName} {user.lastName}
                          </DialogTitle>
                          <DialogDescription>
                            Configura los permisos del usuario en el sistema
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">
                              Módulos del Sistema
                            </h4>

                            {[
                              "patients",
                              "doctors",
                              "appointments",
                              "services",
                              "reports",
                            ].map((module) => (
                              <div key={module} className="space-y-2">
                                <h5 className="text-sm font-medium text-gray-700 capitalize">
                                  {module === "patients" && "Pacientes"}
                                  {module === "doctors" && "Doctores"}
                                  {module === "appointments" && "Citas"}
                                  {module === "services" && "Servicios"}
                                  {module === "reports" && "Reportes"}
                                </h5>
                                <div className="grid grid-cols-2 gap-2">
                                  {["read", "create", "update", "delete"].map(
                                    (action) => (
                                      <div
                                        key={action}
                                        className="flex items-center space-x-2"
                                      >
                                        <Switch
                                          id={`${module}-${action}`}
                                          defaultChecked={user.role === "admin"}
                                          disabled={user.role === "admin"}
                                        />
                                        <label
                                          htmlFor={`${module}-${action}`}
                                          className="text-xs text-gray-600 capitalize"
                                        >
                                          {action === "read" && "Ver"}
                                          {action === "create" && "Crear"}
                                          {action === "update" && "Editar"}
                                          {action === "delete" && "Eliminar"}
                                        </label>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {user.role === "admin" && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                              <p className="text-sm text-amber-800">
                                Los administradores tienen acceso completo a
                                todos los módulos.
                              </p>
                            </div>
                          )}

                          <div className="flex space-x-2">
                            <Button className="flex-1">Guardar Cambios</Button>
                            <Button variant="outline">Cancelar</Button>
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
                        <DropdownMenuItem>Resetear contraseña</DropdownMenuItem>
                        <DropdownMenuItem>Ver actividad</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Suspender usuario
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-green-600"
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Activar usuario
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
