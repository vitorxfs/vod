import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseEntity } from "../../course/database/schema";
import { UserEntity } from '../../user/database/schema';

@Entity("lectures")
export class LectureEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  @ManyToOne(() => CourseEntity, (course) => course.lectures, { nullable: false })
  courseId: string;

  @OneToMany(() => LectureProgressEntity, (progress) => progress.lectureId)
  progress: LectureProgressEntity[];

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

@Entity("lecture_progress")
export class LectureProgressEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  @ManyToOne(() => LectureEntity, (lecture) => lecture.progress, { nullable: false })
  lectureId: string;

  @Column("uuid")
  @ManyToOne(() => UserEntity, (user) => user.progress, { nullable: false })
  userId: string;

  @Column({ type: "boolean", default: false })
  completed: boolean;

  @Column({ type: "bigint", default: 0 })
  elapsedTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
