export type AlertType = "success" | "error" | "info";
export type LastSearchType = "coords" | "bounds";
export type ButtonStyle = "primary" | "secondary" | "tertiary";
export type Sizes = "normal" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

export enum EnumSizesToNumber {
  "normal" = 24,
  "xl" = 28,
  "2xl" = 30,
  "3xl" = 40, 
  "4xl" = 44, 
  "5xl" = 48, 
}

export interface ChargingStationConnection {
  ID: number;
  ConnectionTypeID: number;
  StatusTypeID: number;
  LevelID: number;
  PowerKW: number;
  CurrentTypeID: number;
  Quantity: number;
}

export interface ChargingStation {
  ID: number;
  IsRecentlyVerified: boolean;
  DateLastVerified: string; //datestring
  UUID: string;
  DataProviderID: 1;
  OperatorID: 1;
  UsageTypeID: 1;
  UsageCost: string;
  AddressInfo: {
    ID: 148804;
    Title: string;
    AddressLine1?: string;
    Town?: string;
    StateOrProvince?: string;
    CountryID: number;
    Latitude: number;
    Longitude: number;
    AccessComments: string;
    Postcode: string;
    Distance: number;
    DistanceUnit: number;
  };
  Connections: ChargingStationConnection[];
  NumberOfPoints: number;
  GeneralComments: string;
  StatusTypeID: number;
  DateLastStatusUpdate: string; //datestring
  DataQualityLevel: number;
  DateCreated: string; //datestring
  SubmissionStatusTypeID: number;
}

export interface OperatorData {
  WebsiteURL?: string;
  Comments?: string;
  PhonePrimaryContact?: string;
  PhoneSecondaryContact?: string;
  IsPrivateIndividual?: boolean;
  AddressInfo?: string;
  BookingURL?: string;
  ContactEmail?: string;
  FaultReportEmail?: string;
  IsRestrictedEdit?: string;
  ID?: number;
  Title?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export enum EnumStationStatus {
  Available = 50,
  PartiallyAvailable = 40,
  Inoperative = 30,
  Unknown = 20,
}

export interface MapBounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

export interface Option {
  label: string;
  value: string;
}

export interface StationsSearchFilters {
  usage: string[];
  kwRange: KwRange;
  connections: string[];
}

export interface KwRange {
  min: number;
  max: number;
}
