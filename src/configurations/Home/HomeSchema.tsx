import { boolean, date, literal, number, object, string, z } from 'zod';


export const homeSchema = object({
  post_text: string()
    .nonempty('Campo obbligatorio')
    .max(200, 'Name must be less than 200 characters'),
})