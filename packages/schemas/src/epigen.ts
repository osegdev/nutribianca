import { z } from 'zod';

export const epigenTestSchema = z.object({
  id: z.string().uuid().optional(),
  patientId: z.string().uuid(),
  testType: z.enum(['basic', 'advanced', 'premium']),
  testStatus: z.enum(['ordered', 'sample_collected', 'processing', 'completed', 'cancelled']).default('ordered'),
  sampleType: z.enum(['saliva', 'blood']).default('saliva'),
  results: z.object({
    metabolicType: z.string().optional(),
    recommendedNutrients: z.array(z.string()).optional(),
    foodSensitivities: z.array(z.string()).optional(),
    exerciseType: z.enum(['cardio', 'strength', 'mixed']).optional(),
    detoxCapacity: z.enum(['low', 'medium', 'high']).optional(),
  }).optional(),
  reportUrl: z.string().url().optional(),
  orderDate: z.date().default(() => new Date()),
  completedDate: z.date().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type EpigenTest = z.infer<typeof epigenTestSchema>;

export const epigenTestPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  currency: z.enum(['USD', 'HNL']).default('USD'),
  features: z.array(z.string()),
  testType: z.enum(['basic', 'advanced', 'premium']),
  processingTime: z.string(), // e.g., "2-3 weeks"
  sampleTypes: z.array(z.enum(['saliva', 'blood'])),
});

export type EpigenTestPlan = z.infer<typeof epigenTestPlanSchema>;

export const createEpigenTestSchema = epigenTestSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  results: true,
  reportUrl: true,
  completedDate: true,
});

export type CreateEpigenTest = z.infer<typeof createEpigenTestSchema>;