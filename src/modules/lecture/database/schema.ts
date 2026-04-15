import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseEntity } from "../../course/database/schema";

@Entity("lectures")
export class LectureEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  @ManyToOne(() => CourseEntity, (course) => course.lectures, { nullable: false })
  courseId: string;

  @Column({ type: "bigint", nullable: false })
  position: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 255 })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
