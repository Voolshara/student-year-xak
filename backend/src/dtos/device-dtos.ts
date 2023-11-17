interface Device {
  id: number;
  name: string;
}

// Request

export interface addDevice {
  deviceName: string;
}

// -----------------

// Response

export interface getDevices {
  items: Device[];
}
