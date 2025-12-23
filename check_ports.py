import socket
import subprocess
import os

def check_port(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def get_process_on_port(port):
    try:
        # Using lsof to find PID and command
        output = subprocess.check_output(['lsof', '-i', f':{port}', '-t'], stderr=subprocess.STDOUT)
        pids = output.decode().strip().split('\n')
        
        processes = []
        for pid in pids:
            if not pid: continue
            cmd_output = subprocess.check_output(['ps', '-p', pid, '-o', 'comm='], stderr=subprocess.STDOUT)
            cmd = cmd_output.decode().strip()
            processes.append(f"{cmd} (PID: {pid})")
        
        return ", ".join(processes)
    except subprocess.CalledProcessError:
        return "Unknown"

def main():
    common_ports = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 5000, 5001, 7000, 8000, 8080]
    print(f"{'PORT':<10} {'STATUS':<15} {'PROCESS'}")
    print("-" * 50)
    
    conflicts_found = False
    for port in common_ports:
        if check_port(port):
            process_info = get_process_on_port(port)
            print(f"{port:<10} {'OCCUPIED':<15} {process_info}")
            conflicts_found = True
        else:
            # Uncomment if you want to see free ports
            # print(f"{port:<10} {'FREE':<15}")
            pass
            
    if not conflicts_found:
        print("No conflicts detected on common development ports.")

if __name__ == "__main__":
    main()
