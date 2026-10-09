/**
 * Reglas de reservas para alojamientos chicos (cabañas, hosterías) del interior sanjuanino.
 * Fechas como AAAA-MM-DD; la salida (checkout) es exclusiva: la noche del checkout no se cobra.
 */

export interface Reserva {
  unidadId: string;
  checkin: string;
  checkout: string;
}

const DIA = 86_400_000;

function parse(fecha: string): number {
  const [y, m, d] = fecha.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function noches(checkin: string, checkout: string): number {
  const n = Math.round((parse(checkout) - parse(checkin)) / DIA);
  if (n <= 0) throw new Error("La salida debe ser posterior a la entrada");
  return n;
}

/** Dos reservas de la misma unidad se pisan si comparten al menos una noche. */
export function seSuperponen(a: Reserva, b: Reserva): boolean {
  if (a.unidadId !== b.unidadId) return false;
  return a.checkin < b.checkout && b.checkin < a.checkout;
}

/** ¿Se puede tomar esta reserva sin pisar las existentes? */
export function estaDisponible(nueva: Reserva, existentes: Reserva[]): boolean {
  return !existentes.some((r) => seSuperponen(nueva, r));
}

/**
 * Precio total con tarifa por noche y recargo de temporada alta.
 * `temporadaAlta` recibe una fecha y dice si esa noche es de temporada alta
 * (por ejemplo fines de semana largos, Fiesta del Sol, vacaciones de invierno).
 */
export function precioEstadia(
  checkin: string,
  checkout: string,
  tarifaNocheCents: number,
  recargoTemporadaAltaPct: number,
  temporadaAlta: (fecha: string) => boolean,
): number {
  let total = 0;
  const n = noches(checkin, checkout);
  for (let i = 0; i < n; i++) {
    const fecha = new Date(parse(checkin) + i * DIA).toISOString().slice(0, 10);
    const recargo = temporadaAlta(fecha) ? recargoTemporadaAltaPct : 0;
    total += Math.round(tarifaNocheCents * (1 + recargo / 100));
  }
  return total;
}

/** Ocupación (%) de un conjunto de unidades en un rango [desde, hasta). */
export function ocupacion(
  reservas: Reserva[],
  unidades: number,
  desde: string,
  hasta: string,
): number {
  const nochesDisponibles = noches(desde, hasta) * unidades;
  let ocupadas = 0;
  for (const r of reservas) {
    const inicio = Math.max(parse(r.checkin), parse(desde));
    const fin = Math.min(parse(r.checkout), parse(hasta));
    if (fin > inicio) ocupadas += Math.round((fin - inicio) / DIA);
  }
  return Math.round((ocupadas / nochesDisponibles) * 1000) / 10;
}
