import { Field, ObjectType } from "@nestjs/graphql";
import { Permission } from "../../permission/entity/permission.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Role {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Permission)
    @JoinTable({ name: 'role_permission' })
    permission: Permission[]

}