export interface IFloor {
  floor: string;
  zones: IFloorZone[];
}

export interface IFloorZone {
  zone: string;
  index: number;
  luci: IZoneComponent[];
  tende?: ITendaComponent[];
  activeIcon?: JSX.Element;
  offIcon?: JSX.Element;
}

export interface ITendaComponent {
  name: string;
  index: number;
}
export interface IZoneComponent {
  name: string;
  index: number;
  channel: number;
}

export const luciConfig: IFloor[] = [
  {
    floor: "Primo piano",
    zones: [
      {
        zone: "Guardaroba",
        index: 0,
        luci: [
          {
            name: "Faretti",
            index: 0,
            channel: 0,
          },
          {
            name: "Strip",
            index: 0,
            channel: 1,
          },
        ],
      },
    ],
  },
];
