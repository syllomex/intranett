export function convertStatusToString(status: number): string {
  if (status === 0) return "Andamento";
  if (status === 1) return "Finalizada";
  return "Cancelada";
}
