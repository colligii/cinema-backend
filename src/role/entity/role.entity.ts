import { Permission } from "src/permission/entity/permission.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @ManyToMany(() => Permission)
    @JoinTable({ name: 'role_permission' })
    permission: Permission[]

}