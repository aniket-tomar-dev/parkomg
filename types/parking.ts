export type VehicleType = 'CAR' | 'BIKE';

export interface ParkingTicket {
    id: string;
    vehicleNumber: string;
    vehicleType: VehicleType;
    phoneNumber?: string;
    entryTime: string; // ISO String
    endTime: string; // ISO String (calculated)
    status: 'ACTIVE' | 'COMPLETED' | 'OVERDUE';
    amount?: number;
}
