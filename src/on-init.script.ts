import { User } from "@prisma/client";
import { TYPES } from "./injection/types";
import { myContainer } from "./inversify.config";
import "dotenv/config"
import { UserServiceInterface } from "./user/user.service";

class OnInit {

    static async createUser() {
        try {
            console.log('on init: creating user')
            const userService: UserServiceInterface = myContainer.get(TYPES.UserServiceInterface);

            const userPayload: User = {
                id: process.env.DEFAULT_ADMIN_UUID as string,
                userName: process.env.DEFAULT_USER as string,
                password: process.env.DEFAULT_PASSWORD as string,
                email: process.env.DEFAULT_ADMIN_EMAIL as string,
                role: "ADMIN",
                isActive: true
            }

            const _user = await userService.findById(userPayload);

            if(_user)
                return console.log('Usuário admin já existente');

            await userService.createUser(userPayload)
            console.log('on init: user.created')
        } catch(e) {
            console.log('Create User Error', e);
        }
    }

    static async execute() {
        await this.createUser();
    }
}

export default OnInit