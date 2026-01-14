import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "../../session/entity/session.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Field()
    @Column({ type: 'varchar', length: 255 })
    last_name: string;

    @Field()
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
    
    @OneToMany(() => Session, session => session.user)
    session: Session[];
}