export interface TaskType {
  id: number;
  title: string;
  status: 'pending' | 'completed';
}

export type LineNumber = number | undefined;
