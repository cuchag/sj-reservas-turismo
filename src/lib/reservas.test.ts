import { describe, expect, it } from "vitest";
import { estaDisponible, noches, ocupacion, precioEstadia, seSuperponen } from "./reservas";

describe("noches", () => {
  it("cuenta noches con salida exclusiva", () => {
    expect(noches("2026-11-20", "2026-11-23")).toBe(3);
  });
  it("rechaza salida igual o anterior a la entrada", () => {
    expect(() => noches("2026-11-20", "2026-11-20")).toThrow();
  });
});

describe("superposición", () => {
  const a = { unidadId: "cabana-1", checkin: "2026-11-20", checkout: "2026-11-23" };
  it("permite entrar el día que otro sale", () => {
    expect(seSuperponen(a, { unidadId: "cabana-1", checkin: "2026-11-23", checkout: "2026-11-25" })).toBe(false);
  });
  it("detecta noches compartidas en la misma unidad", () => {
    expect(seSuperponen(a, { unidadId: "cabana-1", checkin: "2026-11-22", checkout: "2026-11-24" })).toBe(true);
  });
  it("ignora otras unidades", () => {
    expect(estaDisponible({ unidadId: "cabana-2", checkin: "2026-11-21", checkout: "2026-11-22" }, [a])).toBe(true);
  });
});

describe("precioEstadia", () => {
  it("aplica recargo solo a noches de temporada alta", () => {
    const finde = (f: string) => f === "2026-11-21";
    // 3 noches de $50.000, una con 20% de recargo
    expect(precioEstadia("2026-11-20", "2026-11-23", 50_000_00, 20, finde)).toBe(160_000_00);
  });
});

describe("ocupacion", () => {
  it("calcula noches ocupadas sobre disponibles en el rango", () => {
    const reservas = [
      { unidadId: "1", checkin: "2026-11-01", checkout: "2026-11-04" },
      { unidadId: "2", checkin: "2026-10-30", checkout: "2026-11-02" },
    ];
    // rango de 5 noches × 2 unidades = 10; ocupadas: 3 + 1 = 4
    expect(ocupacion(reservas, 2, "2026-11-01", "2026-11-06")).toBe(40);
  });
});
