import os

CLIENTS_DIR = "/Volumes/DESIGN/Clientes"
TRAFEGO_DIR = "/Volumes/TRAFEGO/MATERIAIS SITE"

target_clients = [
    "Dubelato",
    "Iseg",
    "Latina",
    "Masotti",
    "Neonova",
    "People Leap",
    "Tudo Natal",
    "VitalMais",
    "Grampola"
]

extensions = (".png", ".jpg", ".jpeg", ".pdf", ".webp", ".svg")

print("--- CLIENTES ASSETS IN DESIGN ---")
for client in target_clients:
    client_path = os.path.join(CLIENTS_DIR, client)
    if os.path.exists(client_path):
        print(f"\n[Client: {client}] - {client_path}")
        file_count = 0
        for root, dirs, files in os.walk(client_path):
            # Ignore hidden dirs
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            for file in files:
                if file.lower().endswith(extensions) and not file.startswith('.'):
                    rel_path = os.path.relpath(os.path.join(root, file), client_path)
                    print(f"  - {rel_path}")
                    file_count += 1
                    if file_count > 50:
                        print("  ... (truncated after 50 files)")
                        break
            if file_count > 50:
                break
    else:
        print(f"\n[Client: {client}] - NOT FOUND at {client_path}")

print("\n--- TRAFEGO PORTFOLIO FOLDER ---")
if os.path.exists(TRAFEGO_DIR):
    for root, dirs, files in os.walk(TRAFEGO_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for file in files:
            if file.lower().endswith(extensions) and not file.startswith('.'):
                rel_path = os.path.relpath(os.path.join(root, file), TRAFEGO_DIR)
                print(f"  - {rel_path}")
else:
    print("TRAFEGO_DIR not found")
