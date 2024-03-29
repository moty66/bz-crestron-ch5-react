import { BulbOutlined } from "@ant-design/icons";
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
}

export const luciConfig: IFloor[] = [
  {
    floor: "Piano Terra",
    zones: [
      {
        zone: "Camera Padronale",
        activeIcon: <BulbOutlined />,
        offIcon: undefined,
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
        luci: [
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
