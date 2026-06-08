import os
from PIL import Image

image_dir = "public/assets/images"
src_dirs = ["src", "public"]
extensions_to_update = [".astro", ".js", ".ts", ".md", ".css", ".json", ".html"]

png_files = []
for root, dirs, files in os.walk(image_dir):
    for file in files:
        if file.lower().endswith('.png'):
            png_files.append(os.path.join(root, file))

replacements = {}

print(f"Found {len(png_files)} PNG files to process.")

for png_path in png_files:
    base, ext = os.path.splitext(png_path)
    webp_path = base + ".webp"
    
    print(f"Processing: {png_path}")
    try:
        with Image.open(png_path) as img:
            # Maintain transparency and convert to WebP
            img.save(webp_path, "WEBP", quality=85)
        print(f"  Created WebP: {webp_path}")
    except Exception as e:
        print(f"  Error converting {png_path}: {e}")
        continue
        
    png_size = os.path.getsize(png_path)
    webp_size = os.path.getsize(webp_path)
    print(f"  PNG size: {png_size/1024:.2f} KB, WebP size: {webp_size/1024:.2f} KB")
    
    png_filename = os.path.basename(png_path)
    webp_filename = os.path.basename(webp_path)
    replacements[png_filename] = webp_filename
    
    # If PNG is heavy (> 150KB), delete it.
    # Otherwise, keep it as backup.
    if png_size > 150 * 1024:
        print(f"  PNG is heavy ({png_size/1024:.2f} KB > 150 KB). Deleting original PNG.")
        os.remove(png_path)
    else:
        print(f"  PNG is light ({png_size/1024:.2f} KB <= 150 KB). Keeping PNG as backup.")

# Update code references
print("\nUpdating codebase references from PNG to WebP...")
for src_dir in src_dirs:
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            _, ext = os.path.splitext(file)
            if ext.lower() in extensions_to_update:
                file_path = os.path.join(root, file)
                if "optimize_images.py" in file_path:
                    continue
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    original_content = content
                    for png_name, webp_name in replacements.items():
                        if png_name in content:
                            content = content.replace(png_name, webp_name)
                    
                    if content != original_content:
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(content)
                        print(f"Updated references in: {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

print("\nOptimization and code reference updates complete!")
