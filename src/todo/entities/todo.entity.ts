import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ 
    name: 'is_complete',
    type: 'boolean',
    default: false 
  })
  isComplete: boolean;

  @CreateDateColumn({ 
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP' 
  })
  createdAt: Date;

  @ManyToOne('User', 'todos') // ⬅️ String-based
  user: User;
}