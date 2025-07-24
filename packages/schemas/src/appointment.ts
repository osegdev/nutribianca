import { z } from 'zod';

export const appointmentSchema = z.object({
  id: z.string().uuid().optional(),
  patientName: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  patientEmail: z.string().email('Email inválido'),
  patientPhone: z.string().min(8, 'Teléfono debe tener al menos 8 dígitos'),
  appointmentDate: z.string().datetime('Fecha inválida'),
  appointmentType: z.enum(['consultation', 'followup', 'epigenetic']),
  notes: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).default('pending'),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type Appointment = z.infer<typeof appointmentSchema>;

export const createAppointmentSchema = appointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

export type CreateAppointment = z.infer<typeof createAppointmentSchema>;
