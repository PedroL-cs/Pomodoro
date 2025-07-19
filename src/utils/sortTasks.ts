import type { TaskModel } from '../models/TaskModel';

export type SortTaskOptions = {
   tasks: TaskModel[];
   direction?: 'asc' | 'desc';
   field?: keyof TaskModel;
};

export function sortTasks({
   field = 'startDate',
   direction = 'desc',
   tasks = [],
}: SortTaskOptions): TaskModel[] {
   return [...tasks].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      // Tratando valores nulos

      // Se os dois forem nulos, ordem não muda
      if (aValue === null && bValue === null) return 0;

      // Se apenas o primeiro for nulo, ele vai para o final
      if (aValue === null) return 1;

      // Se apenas o segundo for nulo, ele vai para o final
      if (bValue === null) return -1;

      // Comparação numérica

      // Se os dois valores forem números, fazemos uma subtração para ordenar
      if (typeof aValue === 'number' && typeof bValue === 'number') {
         return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Comparação de strings

      // Se os dois valores forem textos, usa localeCompare para comprar em ordem alfabética
      if (typeof aValue === 'string' && typeof bValue === 'string') {
         return direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
      }

      return 0;
   });
}
