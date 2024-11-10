import { z } from "zod"

export const SessionInput = z.object({
    name: z.string({ message: 'Nome da sessão no formato invalido. '}).min(2, { message: 'Nome da sessão precisa ser pelo menos 2 caracteres. '})
})