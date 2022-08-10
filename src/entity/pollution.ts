import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Location } from "./location";
  
  
@Entity()
export class Pollution extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    aqius: number;

    @Column()
    aqicn: number;

    @Column()
    mainus: string;

    @Column()
    maincn: string;

    @Column()
    recordedPollutionTime: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Location, (location) => location.pollutions)
    location: Location
}