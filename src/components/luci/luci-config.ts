export interface IFloor {
  floor: string;
  zones: IFloorZone[];
}

export interface IFloorZone {
  zone: string;
  index: number;
  components: IZoneComponent[];
  tende?: ITendaComponent[];
}

export interface ITendaComponent {
  name: string;
  index: number;
}
export interface IZoneComponent {
  name: string;
  index: number;
}

export const luciConfig: IFloor[] = [
  {
    floor: "Piano Terra",
    zones: [
      {
        zone: "Camera Padronale",
        index: 0,
        tende: [
          {
            name: "Tenda 1",
            index: 0,
          },
          {
            name: "Tenda 2",
            index: 1,
          },
        ],
        components: [
          {
            name: "Specchio",
            index: 0,
          },
          {
            name: "Faretti",
            index: 1,
          },
        ],
      },
      {
        zone: "Soggiorno",
        index: 0,
        components: [
          {
            name: "Specchio soggiorno",
            index: 0,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
          {
            name: "Faretti soggiorno",
            index: 1,
          },
        ],
      },
      {
        zone: "Bagno",
        index: 0,
        components: [
          {
            name: "Specchio bagno",
            index: 0,
          },
          {
            name: "Faretti bagno",
            index: 1,
          },
        ],
      },
      {
        zone: "Bagno",
        index: 0,
        components: [
          {
            name: "Specchio bagno",
            index: 0,
          },
          {
            name: "Faretti bagno",
            index: 1,
          },
        ],
      },
      {
        zone: "Bagno",
        index: 0,
        components: [
          {
            name: "Specchio bagno",
            index: 0,
          },
          {
            name: "Faretti bagno",
            index: 1,
          },
        ],
      },
      {
        zone: "Bagno",
        index: 0,
        components: [
          {
            name: "Specchio bagno",
            index: 0,
          },
          {
            name: "Faretti bagno",
            index: 1,
          },
        ],
      },
      {
        zone: "Bagno",
        index: 0,
        components: [
          {
            name: "Specchio bagno",
            index: 0,
          },
          {
            name: "Faretti bagno",
            index: 1,
          },
        ],
      },
      {
        zone: "Bagno",
        index: 0,
        components: [
          {
            name: "Specchio bagno",
            index: 0,
          },
          {
            name: "Faretti bagno",
            index: 1,
          },
        ],
      },
      {
        zone: "Bagno",
        index: 0,
        components: [
          {
            name: "Specchio bagno",
            index: 0,
          },
          {
            name: "Faretti bagno",
            index: 1,
          },
        ],
      },
      {
        zone: "Bagno",
        index: 0,
        components: [
          {
            name: "Specchio bagno",
            index: 0,
          },
          {
            name: "Faretti bagno",
            index: 1,
          },
        ],
      },
    ],
  },
  {
    floor: "Piano 1",
    zones: [
      {
        zone: "Camera Padronale piano 1",
        index: 0,
        components: [
          {
            name: "Specchio piano 1",
            index: 0,
          },
          {
            name: "Faretti piano 1",
            index: 1,
          },
        ],
      },
      {
        zone: "Giardino",
        index: 0,
        components: [
          {
            name: "Specchio giardino",
            index: 0,
          },
          {
            name: "Faretti giardino",
            index: 1,
          },
        ],
      },
      {
        zone: "Cucina",
        index: 0,
        components: [
          {
            name: "Specchio cucina",
            index: 0,
          },
          {
            name: "Faretti cucina",
            index: 1,
          },
        ],
      },
    ],
  },
];
