export type AlertType = 'success' | 'error' | 'info';

export interface ChargingStationConnection {
  ID: number,
  ConnectionTypeID: number,
  StatusTypeID: number,
  LevelID: number,
  PowerKW: number,
  CurrentTypeID: number,
  Quantity: number
};

export interface ChargingStation {
  ID: number;
  IsRecentlyVerified: boolean,
  DateLastVerified: string, //datestring
  UUID: string,
  DataProviderID: 1,
  OperatorID: 1,
  UsageTypeID: 1,
  UsageCost: string,
  AddressInfo: {
    ID: 148804,
    Title: string;
    AddressLine1?: string;
    Town?: string;
    StateOrProvince?: string;
    CountryID: number,
    Latitude: number;
    Longitude: number;
    AccessComments: string,
    Postcode: string;
    Distance: number,
    DistanceUnit: number
  };
  Connections: ChargingStationConnection[];
  NumberOfPoints: number,
  GeneralComments: string,
  StatusTypeID: number;
  DateLastStatusUpdate: string, //datestring
  DataQualityLevel: number,
  DateCreated: string,//datestring
  SubmissionStatusTypeID: number
}

export interface OperatorData {
  WebsiteURL?: string,
  Comments?: string,
  PhonePrimaryContact?: string,
  PhoneSecondaryContact?: string,
  IsPrivateIndividual?: boolean,
  AddressInfo?: string,
  BookingURL?: string,
  ContactEmail?: string,
  FaultReportEmail?: string,
  IsRestrictedEdit?: string,
  ID?: number,
  Title?: string
}

export interface Coordinates {
  lat: number;
  lng: number;
};

export enum EnumStationStatus {
  Available = 50,
  PartiallyAvailable = 40,
  Inoperative = 30,
  Unknown = 20
}

export interface MapBounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
};

const chargerStationsData = [
  {
    "IsRecentlyVerified": false,
    "DateLastVerified": "2022-09-25T13:52:00Z",
    "ID": 148452,
    "UUID": "2A152699-321C-45BA-A3D2-CE1AEED786E2",
    "DataProviderID": 1,
    "OperatorID": 1,
    "UsageTypeID": 1,
    "UsageCost": "",
    "AddressInfo": {
      "ID": 148804,
      "Title": "Ayuntamiento Mislata",
      "AddressLine1": "Calle Jose Pomer",
      "Town": "Mislata",
      "StateOrProvince": "Valencia",
      "CountryID": 210,
      "Latitude": 39.47537241955672,
      "Longitude": -0.4181876833115439,
      "AccessComments": "In the center of the town, some times the street is closed by de school, but is only for 20 minuts",
      "Distance": 0.03465154521404317,
      "DistanceUnit": 1
    },
    "Connections": [
      {
        "ID": 206091,
        "ConnectionTypeID": 33,
        "StatusTypeID": 50,
        "LevelID": 3,
        "PowerKW": 50,
        "CurrentTypeID": 30,
        "Quantity": 1
      },
      {
        "ID": 206092,
        "ConnectionTypeID": 2,
        "StatusTypeID": 50,
        "LevelID": 3,
        "PowerKW": 50,
        "CurrentTypeID": 30,
        "Quantity": 1
      },
      {
        "ID": 206093,
        "ConnectionTypeID": 25,
        "StatusTypeID": 50,
        "LevelID": 2,
        "Amps": 32,
        "Voltage": 400,
        "PowerKW": 22,
        "CurrentTypeID": 20,
        "Quantity": 1
      }
    ],
    "NumberOfPoints": 2,
    "GeneralComments": "Any RFID is valid, contact to moviltik for errors. app Moviltik",
    "StatusTypeID": 50,
    "DateLastStatusUpdate": "2022-09-25T13:52:00Z",
    "DataQualityLevel": 1,
    "DateCreated": "2020-02-02T17:14:00Z",
    "SubmissionStatusTypeID": 200
  }
]