export interface IFloor {
  floor: string;
  zones: IFloorZone[];
}

export interface IFloorZone {
  zone: string;
  luci: ILuciComponent[];
  tende?: ITendaComponent[];
}

export interface ITendaComponent {
  name: string;
  index: number;
  channel: number;
  hide?: boolean;
}
export interface ILuciComponent {
  name: string;
  index: number;
  channel: number;
  hide?: boolean;
  isOnOff?: boolean;
}

export const luciConfig: IFloor[] = [
  {
    floor: "SPA / GARAGE",
    zones: [
      {
        zone: "Comuni",
        luci: [
          { name: "Disimpegno", index: 16, channel: 3 },
          { name: "Ingresso", index: 17, channel: 0 },
          { name: "Sospensioni scale", index: 17, channel: 1 },
          { name: "Scale", index: 17, channel: 2 },
        ],
        tende: [],
      },
      {
        zone: "Living",
        luci: [
          { name: "Strip scale", index: 15, channel: 0 },
          { name: "Strip corrimano", index: 15, channel: 1 },
          { name: "Strip tavolo", index: 15, channel: 2 },
          { name: "Faretti tavolo", index: 15, channel: 3 },
          { name: "Strip divano", index: 15, channel: 4 },
          { name: "Strip bottigliera", index: 15, channel: 5 },
          { name: "Segnapasso golf", index: 15, channel: 6 },
          { name: "Sospensioni tavolo", index: 15, channel: 7 },
          { name: "Cantina", index: 15, channel: 8 },
          { name: "Presa bottigliera", index: 15, channel: 9, isOnOff: true },
        ],
        tende: [{ name: "Scale", index: 15, channel: 0 }],
      },
      {
        zone: "SPA",
        luci: [
          { name: "Faretti centrali", index: 16, channel: 0 },
          { name: "Strip led", index: 16, channel: 1 },
          { name: "Faretti laterali", index: 16, channel: 2 },
          { name: "Bagno spa", index: 16, channel: 4 },
        ],
        tende: [],
      },
    ],
  },
  {
    floor: "ZONA GIORNO",
    zones: [
      {
        zone: "Comuni",
        luci: [
          { name: "Ingresso", index: 17, channel: 0 },
          { name: "Sospensioni scale", index: 17, channel: 1 },
          { name: "Scale", index: 17, channel: 2 },
        ],
        tende: [],
      },
      {
        zone: "Living",
        luci: [
          { name: "Sospensioni tavolo", index: 10, channel: 0 },
          // { name: "Sospensioni divano", index: 10, channel: 1 },
          { name: "Faretti divano", index: 10, channel: 2 },
          { name: "Tavolo", index: 10, channel: 3 },
          { name: "TV", index: 10, channel: 4 },
          { name: "Faretti TV", index: 10, channel: 5 },
          { name: "Strip TP", index: 10, channel: 6 },
          { name: "Faretti fondo", index: 10, channel: 7 },
          { name: "Strip tavolo", index: 10, channel: 8 },
        ],
        tende: [
          { name: "Salone SX1", index: 10, channel: 0 },
          { name: "Salone SX2", index: 10, channel: 1, hide: true },
          { name: "Salone CX", index: 10, channel: 2 },
          { name: "Salone DX", index: 10, channel: 3 },
        ],
      },
      {
        zone: "Cucina",
        luci: [
          { name: "Strip lunga", index: 13, channel: 0 },
          { name: "Isola", index: 13, channel: 1 },
          { name: "Finestra", index: 13, channel: 2 },
          {
            name: "Segnapasso lato piscina",
            index: 13,
            channel: 3,
            isOnOff: true,
          },
          {
            name: "Segnapasso lato loggiato",
            index: 13,
            channel: 4,
            isOnOff: true,
          },
          { name: "Lavanderia", index: 13, channel: 5, isOnOff: true },
          { name: "Dispensa", index: 13, channel: 6, isOnOff: true },
          { name: "Sospensioni isola", index: 13, channel: 7 },
          { name: "Strip tavolo", index: 13, channel: 8 },
        ],
        tende: [
          { name: "Scale", index: 13, channel: 0 },
          { name: "Cucina SX", index: 11, channel: 0 },
          { name: "Cucina CX", index: 11, channel: 1 },
          { name: "Cucina DX", index: 11, channel: 2 },
          { name: "Lavanderia", index: 11, channel: 3 },
          { name: "Dispensa", index: 11, channel: 4 },
        ],
      },
      {
        zone: "Bagno",
        luci: [
          { name: "Strip bagno", index: 14, channel: 0 },
          { name: "Faretti bagno", index: 14, channel: 1 },
          { name: "Strip antibagno", index: 14, channel: 2 },
          { name: "Faretti antibagno", index: 14, channel: 3 },
        ],
        tende: [],
      },
    ],
  },
  {
    floor: "ZONA NOTTE",
    zones: [
      {
        zone: "Comuni",
        luci: [
          { name: "Segnapasso", index: 9, channel: 0 },
          { name: "Strip corridoio", index: 9, channel: 1 },
          { name: "Strip disimpegno", index: 9, channel: 2 },
          { name: "Faretti corridoio", index: 9, channel: 3 },
          { name: "Terrazzo lato piscina", index: 9, channel: 4 },
          { name: "Terrazzo lato strada", index: 9, channel: 5 },
          { name: "Segnapasso Terrazzo", index: 9, channel: 6 },
        ],
        tende: [
          { name: "Scale SX", index: 9, channel: 0 },
          { name: "Scale DX", index: 9, channel: 1 },
          { name: "Disimpegno", index: 9, channel: 2 },
        ],
      },
      {
        zone: "Guardaroba",
        luci: [
          { name: "Faretti", index: 0, channel: 0 },
          { name: "Strip", index: 0, channel: 1 },
        ],
        tende: [],
      },
      {
        zone: "Padronale",
        luci: [
          { name: "Faretti", index: 1, channel: 0 },
          { name: "Faretti sx", index: 1, channel: 1 },
          { name: "Faretti dx", index: 1, channel: 2 },
          { name: "Abatjour dx", index: 1, channel: 3 },
          { name: "Abatjour sx", index: 1, channel: 4 },
          { name: "Centrale", index: 1, channel: 5 },
          { name: "Balcone", index: 1, channel: 6 },
          { name: "Segnapasso", index: 1, channel: 7 },
          { name: "Ufficio", index: 1, channel: 8 },
        ],
        tende: [
          { name: "Camera sx", index: 1, channel: 0 },
          { name: "Camera dx", index: 1, channel: 1 },
          { name: "Terrazzo", index: 1, channel: 2 },
        ],
      },
      {
        zone: "Bagno Padronale",
        luci: [
          { name: "Strip lunga", index: 2, channel: 0 },
          { name: "Faretti e strip 1", index: 2, channel: 1 },
          { name: "Faretti e strip 2", index: 2, channel: 2 },
          { name: "Specchio", index: 2, channel: 3 },
        ],
        tende: [],
      },
      {
        zone: "Camera 1",
        luci: [
          { name: "Faretti armadio", index: 3, channel: 0 },
          { name: "Faretti Scrivania", index: 3, channel: 1 },
        ],
        tende: [{ name: "Terrazzo", index: 3, channel: 0 }],
      },
      {
        zone: "Camera 2",
        luci: [
          { name: "Armadio", index: 4, channel: 0 },
          { name: "Scrivania", index: 4, channel: 1 },
        ],
        tende: [{ name: "Terrazzo", index: 4, channel: 0 }],
      },
      {
        zone: "Camera 3",
        luci: [
          { name: "Armadio", index: 5, channel: 0 },
          { name: "Scrivania", index: 5, channel: 1 },
        ],
        tende: [{ name: "Terrazzo", index: 5, channel: 0 }],
      },
      {
        zone: "Camera 4",
        luci: [
          { name: "Armadio", index: 6, channel: 0 },
          { name: "Scrivania", index: 6, channel: 1 },
          { name: "Specchio", index: 6, channel: 2 },
        ],
        tende: [
          { name: "Terrazzo dx", index: 6, channel: 0 },
          { name: "Terrazzo sx", index: 6, channel: 1 },
        ],
      },
      {
        zone: "Bagno 1",
        luci: [
          { name: "Faretti e strip", index: 7, channel: 0 },
          { name: "Faretti", index: 7, channel: 1 },
          { name: "Specchio", index: 7, channel: 2 },
        ],
        tende: [{ name: "Terrazzo", index: 7, channel: 0 }],
      },
      {
        zone: "Bagno 2",
        luci: [
          { name: "Faretti e strip", index: 8, channel: 0 },
          { name: "Faretti", index: 8, channel: 1 },
          { name: "Specchio", index: 8, channel: 2 },
        ],
        tende: [{ name: "Terrazzo", index: 8, channel: 0 }],
      },
    ],
  },
  {
    floor: "ESTERNO / PISCINA",
    zones: [
      {
        zone: "Esterno",
        luci: [
          { name: "Faretti e strip", index: 18, channel: 2 },
          { name: "Terrazzo lato piscina", index: 9, channel: 4 },
          { name: "Terrazzo lato strada", index: 9, channel: 5 },
          { name: "Segnapasso Terrazzo", index: 9, channel: 6 },
          { name: "Barbecue", index: 18, channel: 4 },
        ],
        tende: [
          { name: "Scale SX", index: 9, channel: 0 },
          { name: "Scale DX", index: 9, channel: 1 },
          { name: "Disimpegno", index: 9, channel: 2 },
        ],
      },
    ],
  },
];
