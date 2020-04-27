import Serialport, { PortInfo } from "serialport";
import deviceInfo from "./data/z3100.json";
import { Transform } from "stream";

type Events = "data" | "readable" | "open" | "error";
type Callback = (data: Buffer) => any;     

interface options {
    baudRate?: number,
    parser?: Transform
}

class Scanner {
    baudRate: number;
    device?: PortInfo | null;
    port?: Serialport;
    parser: Transform

    constructor({ baudRate, parser }: options = {}) {
        this.baudRate = baudRate || deviceInfo.baudRate;
        this.parser = parser || new Serialport.parsers.Readline({ delimiter: "\r\n" });;
    }
    
    async connect() {
        // Find all connected USB devices
        const devices = await Serialport.list();
        const { vendorId, productId } = deviceInfo;

        // Find the usb matcing the z3100 vendor and product id
        const scannerDevice = devices.find((device: PortInfo) => 
            device.vendorId === vendorId && device.productId === productId
        );
        
        if (!scannerDevice) {
            throw new Error(`unable to find device ${deviceInfo.vendorId}:${deviceInfo.productId}`)
        }
        
        this.device = scannerDevice;
        this.port = new Serialport(this.device.path, { autoOpen: true, baudRate: this.baudRate });

        // Attach a parser to serialport
        this.port.pipe(this.parser);
    }

    on(event: Events, callback: Callback) {
        if (!this.port) {
            throw new Error("device has not connected yet")
        }

        this.port.on(event, callback);
    }
}

export = Scanner;