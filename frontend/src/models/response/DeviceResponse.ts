export interface deviceData {
  id: number;
  name: string;
}

// Request

// -----------------

// Response

export interface getDevicesResponse {
  items: deviceData[];
}
