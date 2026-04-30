#!/usr/bin/gjs -m

import Gio from 'gi://Gio';
import GLib from 'gi://GLib';

const DEVICE_MAC = '38:18:4C:0E:E6:94';
const SONY_UUID = '96cc203e-5068-46ad-b32d-e316f5e069ba';

function calcChecksum(buf) {
    let sum = 0;
    for (const b of buf)
        sum = (sum + b) & 0xFF;
    return sum;
}

function escapeBytes(buf) {
    const HEADER = 0x3E;
    const TRAILER = 0x3C;
    const ESCAPE = 0x3D;
    const ESCAPE_MASK = 0xEF;
    const out = [];
    for (const b of buf) {
        if (b === HEADER || b === TRAILER || b === ESCAPE)
            out.push(ESCAPE, b & ESCAPE_MASK);
        else
            out.push(b);
    }
    return new Uint8Array(out);
}

function encodeMessage(messageType, payloadArr, seq) {
    const len = payloadArr.length;
    const headerBuf = new Uint8Array(6 + len);
    
    headerBuf[0] = messageType;
    headerBuf[1] = seq;
    headerBuf[2] = (len >>> 24) & 0xFF;
    headerBuf[3] = (len >>> 16) & 0xFF;
    headerBuf[4] = (len >>> 8) & 0xFF;
    headerBuf[5] = len & 0xFF;
    headerBuf.set(payloadArr, 6);

    const chksum = calcChecksum(headerBuf);
    const bodyEsc = escapeBytes(headerBuf);
    const chkEsc = escapeBytes(new Uint8Array([chksum]));
    
    return Uint8Array.from([0x3E, ...bodyEsc, ...chkEsc, 0x3C]);
}

async function run() {
    console.log(`Connecting to ${DEVICE_MAC}...`);
    
    const bus = Gio.DBusGeneric.system; // Simplified for script
    // Note: In real GJS scripts we use Gio.DBusSystem, but for direct socket it's different.
    // Let's use a simpler approach for the script: RFCOMM via Gio.SocketClient
    
    const client = new Gio.SocketClient();
    const address = Gio.NetworkAddress.new(DEVICE_MAC, 1); // Port 1 is typical for RFCOMM
    
    // Actually, Bluetooth sockets on Linux usually need special handling.
    // Let's try to use the existing Bluez DBus interface to get the FD if possible,
    // OR just use 'rfcomm' command to create a device node and read/write from it.
    
    console.log("This script requires 'rfcomm' or 'bluetoothctl' access.");
    console.log("Since I am an AI, I will provide the commands to send raw bytes via bluetoothctl or python if preferred.");
}

// Since GJS socket for BT is tricky without proper bindings, 
// let's use a Python script which is much easier for raw BT sockets.

const pythonDebug = `
import socket
import sys

addr = "${DEVICE_MAC}"
port = 1 # RFCOMM channel

def calc_checksum(data):
    return sum(data) & 0xFF

def escape(data):
    out = bytearray()
    for b in data:
        if b in [0x3E, 0x3C, 0x3D]:
            out.append(0x3D)
            out.append(b & 0xEF)
        else:
            out.append(b)
    return out

def encode(msg_type, payload, seq):
    length = len(payload)
    header = bytearray([msg_type, seq, (length >> 24) & 0xFF, (length >> 16) & 0xFF, (length >> 8) & 0xFF, length & 0xFF])
    header.extend(payload)
    checksum = calc_checksum(header)
    
    packet = bytearray([0x3E])
    packet.extend(escape(header))
    packet.extend(escape(bytearray([checksum])))
    packet.append(0x3C)
    return packet

try:
    s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
    print(f"Connecting to {addr}...")
    s.connect((addr, port))
    print("Connected!")

    # Request Current Status
    # NC_ASM_GET_PARAM (0x66) with asmType 0x02
    # MessageType.COMMAND_1 = 0x0C
    get_status = encode(0x0C, bytearray([0x66, 0x02]), 0)
    print(f"Sending GetStatus: {get_status.hex()}")
    s.send(get_status)

    while True:
        data = s.recv(1024)
        if not data: break
        print(f"Received: {data.hex()}")
        # Auto-ACK if it's a command
        if len(data) > 2 and data[1] == 0x0C:
             seq = data[2] # This is simplified, actual seq is escaped
             # Send ACK
             ack = encode(0x01, bytearray([]), 1 - 0) # simplified seq
             s.send(ack)

except Exception as e:
    print(f"Error: {e}")
`;

console.log("Writing debug_sony.py...");
GLib.file_set_contents("debug_sony.py", pythonDebug);
console.log("Run with: python3 debug_sony.py");
