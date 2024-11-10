import { z } from "zod"

export const LoginInput = z.object({
    userName: z.string({ message: 'Nome do usuário no formato invalido. '}).min(2, { message: 'Nome do usuário precisa ser pelo menos 2 caracteres. '}),
    password: z.string({ message: 'Senha no formato invalido. '}).min(2, { message: 'Senha precisa ser pelo menos 2 caracteres. '})
})