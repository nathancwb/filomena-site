import os

folders = {
    "Masotti": "/Volumes/DESIGN/Clientes/Masotti",
    "Iseg": "/Volumes/DESIGN/Clientes/Iseg",
    "People Leap": "/Volumes/DESIGN/Clientes/People Leap",
    "VitalMais": "/Volumes/DESIGN/Clientes/VitalMais"
}

keywords = ["mockup", "pasta", "folder", "papelaria", "cartao", "convite", "adesivo", "sinalizac", "totem", "painel", "frota", "uniforme", "apresentac", "visual"]

for name, path in folders.items():
    print(f"\n===== SEARCHING {name} =====")
    if not os.path.exists(path):
        print("Path not found")
        continue
    
    results = []
    for root, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for file in files:
            if file.startswith('.'):
                continue
            file_lower = file.lower()
            if any(kw in file_lower for kw in keywords) and file_lower.endswith((".png", ".jpg", ".jpeg", ".pdf", ".webp", ".svg")):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, path)
                results.append((rel_path, os.path.getsize(full_path)))
    
    results.sort()
    for rel_path, size in results:
        print(f"  - {rel_path} ({size} bytes)")
