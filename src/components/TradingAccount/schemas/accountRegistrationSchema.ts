
import { z } from 'zod';

// Form validation schema
export const accountRegistrationSchema = z.object({
  broker: z.string().min(1, 'Broker is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  authorizeContact: z.boolean().refine(val => val === true, {
    message: 'You must authorize JaguarForex to contact the broker'
  }),
  isDemo: z.boolean().optional(),
});

export type AccountRegistrationFormValues = z.infer<typeof accountRegistrationSchema>;
