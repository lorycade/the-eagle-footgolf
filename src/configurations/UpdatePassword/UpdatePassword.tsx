import { object, string } from 'zod';


export const UpdatePasswordSchema = object({
  password: string()
    .nonempty('Campo obbligatorio')
    .min(4, 'La password deve essere almeno 4 caratteri')
    .regex(new RegExp('.*[0-9].*'), 'Inserire almeno un numero')
    .regex(new RegExp('.*[A-Z].*'), 'Inserire almeno una lettera maiuscola'),
  passwordConfirm: string().nonempty('Confermare la password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Le password devono coincidere',
});