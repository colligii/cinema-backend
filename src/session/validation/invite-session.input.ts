import { z } from "zod"

export const InviteSession = z.object({
    name: z.string({ message: 'Nome da sessão no formato invalido. '}).min(2, { message: 'Nome da sessão precisa ser pelo menos 2 caracteres. '}),
    email: z.string({ message: 'E-mail no formato invalido. '}).email({ message: 'E-mail no formato invalido. '})
})