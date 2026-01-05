import { Role } from "src/role/entity/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    code: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToMany(() => Role)
    @JoinTable({ name: 'role_permission' })
    role: Role[]

}