import socket
import sys
import time

addr = "38:18:4C:0E:E6:94"
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

def run():
    try:
        s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
        print(f"Connecting to {addr}...")
        s.connect((addr, port))
        print("Connected!")

        # 0x0C is COMMAND_1, 0x66 is NC_ASM_GET_PARAM, 0x02 is common asmType
        get_status = encode(0x0C, bytearray([0x66, 0x02]), 0)
        print(f"Sending GetStatus (0x66, 0x02): {get_status.hex()}")
        s.send(get_status)

        # Let's also try 0x66, 0x01 just in case
        time.sleep(0.5)
        get_status2 = encode(0x0C, bytearray([0x66, 0x01]), 1)
        print(f"Sending GetStatus (0x66, 0x01): {get_status2.hex()}")
        s.send(get_status2)

        start_time = time.time()
        while time.time() - start_time < 5:
            s.settimeout(1.0)
            try:
                data = s.recv(1024)
                if not data: break
                print(f"Received: {data.hex()}")
            except socket.timeout:
                continue

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run()
