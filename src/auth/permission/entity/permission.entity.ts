import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "../../role/entity/role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Permission {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 50, unique: true })
    code: string;

    @Field()
    @Column({ type: 'text' })
    description: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Role)
    @JoinTable({ name: 'role_permission' })
    role: Role[]

}