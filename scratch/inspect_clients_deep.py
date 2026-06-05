import os

dirs_to_inspect = {
    "Iseg": "/Volumes/DESIGN/Clientes/Iseg",
    "VitalMais": "/Volumes/DESIGN/Clientes/VitalMais",
    "People Leap": "/Volumes/DESIGN/Clientes/People Leap",
    "Masotti": "/Volumes/DESIGN/Clientes/Masotti"
}

extensions = (".png", ".jpg", ".jpeg", ".pdf", ".webp", ".svg")

for name, path in dirs_to_inspect.items():
    print(f"\n=========================================")
    print(f"CLIENT: {name} ({path})")
    print(f"=========================================")
    if not os.path.exists(path):
        print("Directory NOT FOUND")
        continue
    
    all_files = []
    for root, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for file in files:
            if file.lower().endswith(extensions) and not file.startswith('.'):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, path)
                size = os.path.getsize(full_path)
                all_files.append((rel_path, size))
    
    print(f"Total files found: {len(all_files)}")
    # Print files containing key terms or just list first 100
    for rel_path, size in sorted(all_files):
        # We can filter or print all
        print(f"  - {rel_path} ({size} bytes)")
