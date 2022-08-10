import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
// import { Geometry } from 'geojson';

import { Pollution } from "./pollution";
import { Country } from "./country";
  
  
@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    city: string;

    @Column()
    state: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Country, (country) => country.location)
    country: Country;

    // uncomment below if point location(latitude and longitude) desired
    // @Column({ unique: true })
    // location: Geometry

    @OneToMany(() => Pollution, (pollution) => pollution.location)
    pollutions:  Pollution[]
}

