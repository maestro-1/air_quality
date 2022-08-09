import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
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
    ts: string;

    @ManyToOne(() => Location, (location) => location.pollutions)
    location: Location
}