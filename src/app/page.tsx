import { estaDisponible, precioEstadia } from "@/lib/reservas";

function Ejemplo() {
  const existentes = [{ unidadId: "cabana-1", checkin: "2026-11-20", checkout: "2026-11-23" }];
  const pedido = { unidadId: "cabana-1", checkin: "2026-11-22", checkout: "2026-11-24" };
  const finde = (f: string) => f === "2026-11-21";
  return (
    <ul>
      <li>Cabaña 1 reservada del 20 al 23/11: ¿disponible del 22 al 24? <strong>{estaDisponible(pedido, existentes) ? "Sí" : "No, se superpone"}</strong></li>
      <li>3 noches a $ 50.000 con 20% de recargo el sábado: <strong>{ars(precioEstadia("2026-11-20", "2026-11-23", 50_000_00, 20, finde))}</strong></li>
    </ul>
  );
}

export default function Page() {
  return (
    <main className="page">
      <header className="top">
        <p className="eyebrow">San Juan · En construcción</p>
        <h1>Reservas Turismo · San Juan</h1>
      </header>
      <section className="card">
        <h2>Qué es</h2>
        <p>Sistema de reservas, disponibilidad y precios por temporada para cabañas y hosterías de Calingasta, Iglesia, Valle Fértil y otros destinos sanjuaninos.</p>
        <p className="muted">La demanda llega en picos: ~60-65% de ocupación promedio en verano 2026 con picos del 100% en fiestas y eventos deportivos.</p>
      </section>
      <section className="card">
        <h2>Reglas de negocio ya implementadas</h2>
        <Ejemplo />
      </section>
      <section className="card">
        <h2>Próximos pasos</h2>
        <ol>
          <li>Alta de unidades y calendario de disponibilidad.</li>
          <li>Página pública de reservas por alojamiento y cobro de seña.</li>
          <li>Calendario de eventos de San Juan para sugerir precios en temporada alta.</li>
        </ol>
      </section>
    </main>
  );
}

function ars(cents: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(cents / 100);
}
