import { boolean, date, literal, number, object, string, z } from 'zod';


export const registerSchema = object({
  name: string()
    .nonempty('Campo obbligatorio')
    .max(32, 'Name must be less than 32 characters'),
  email: string().nonempty('Campo obbligatorio').email('Formato email non corretta'),
  gender: string({
    invalid_type_error: 'Campo obbligatorio'
  }),
  // birthday: number({
  //   required_error: 'Campo obbligatorio',
  // }),
  password: string()
    .nonempty('Campo obbligatorio')
    .min(4, 'Password must be more than 4 characters')
    .max(16, 'Password must be less than 16 characters'),
  passwordConfirm: string().nonempty('Confermare la password'),
  terms: boolean().refine(val => val === true, {message: 'Accettazione obbligatoria'}),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});