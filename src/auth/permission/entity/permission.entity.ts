import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "../../role/entity/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PermissionCategory } from "./permission_category.entity";

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

    @Column({ type: 'uuid', nullable: false })
    permission_category_id: string;

    @ManyToOne(() => PermissionCategory)
    @JoinColumn({ name: 'permission_category_id' })
    permission_category: PermissionCategory;
}