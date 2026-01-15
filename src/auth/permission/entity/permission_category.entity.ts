import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";

@ObjectType()
@Entity()
export class PermissionCategory {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 255, unique: true })
    code: string;

    @OneToMany(() => Permission, permission => permission.permission_category)
    permission?: Permission[];
}