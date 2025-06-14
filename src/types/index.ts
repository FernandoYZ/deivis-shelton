export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  lastVisit?: string;
  nextAppointment?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  experience: number;
  schedule: {
    [day: string]: {
      start: string;
      end: string;
      available: boolean;
    };
  };
  avatar?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "doctor" | "staff" | "patient";
  permissions: Permission[];
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module:
    | "patients"
    | "doctors"
    | "appointments"
    | "users"
    | "services"
    | "reports";
  action: "create" | "read" | "update" | "delete" | "manage";
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  isActive: boolean;
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  status:
    | "scheduled"
    | "confirmed"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "no-show";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  todayAppointments: number;
  monthlyRevenue: number;
  doctorsAvailable: number;
  pendingAppointments: number;
}
