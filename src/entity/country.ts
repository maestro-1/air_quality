import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

import { Location } from "./location";
  


@Entity()
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Location, (location) => location.country)
    location:  Location[]
}