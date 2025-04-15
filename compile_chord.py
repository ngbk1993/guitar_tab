import os
import json

def extract_song_data(base_folder):
    song_data = []

    for root, dirs, files in os.walk(base_folder):
        for file in files:
            if file.endswith(".txt"):
                artist = os.path.basename(root)
                title = os.path.splitext(file)[0].replace("_", " ")
                path = os.path.join(root, file).replace("\\", "/")

                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()

                song_data.append({
                    "title": title,
                    "artist": artist,
                    "path": path,
                    "content": content
                })

    return song_data

if __name__ == "__main__":
    base_folder = "songs"
    output_file = "songs.json"

    data = extract_song_data(base_folder)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Compiled {len(data)} songs into {output_file}")