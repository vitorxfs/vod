import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LectureEntity } from "../../lecture/database/schema";

@Entity("courses")
export class CourseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @OneToMany(() => LectureEntity, (lecture) => lecture.courseId)
  lectures: LectureEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
