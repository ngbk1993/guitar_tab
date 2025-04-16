import os
import json

SONGS_DIR = 'songs'  # root folder containing all song folders
OUTPUT_JSON = 'songs.json'

def extract_title(content, fallback_name):
    """Try to parse the title from the first line, fallback to filename."""
    lines = content.strip().splitlines()
    title = fallback_name

    if lines and lines[0].lower().startswith("title:"):
        title = lines[0][6:].strip()
    elif lines:
        title = lines[0].strip()

    return title

def build_index():
    songs = []

    for root, dirs, files in os.walk(SONGS_DIR):
        for filename in files:
            if filename.endswith('.txt'):
                filepath = os.path.join(root, filename)
                rel_path = os.path.relpath(filepath, SONGS_DIR)
                song_path = os.path.splitext(rel_path)[0].replace('\\', '/')

                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                fallback_name = os.path.splitext(filename)[0]
                title = extract_title(content, fallback_name)

                # Get artist from last subfolder name
                rel_folder = os.path.dirname(rel_path)
                artist = os.path.basename(rel_folder) if rel_folder else "Unknown"

                song = {
                    "title": title,
                    "artist": artist,
                    "path": song_path,
                    "content": content
                }
                songs.append(song)

    with open(OUTPUT_JSON, 'w', encoding='utf-8') as out_file:
        json.dump(songs, out_file, indent=2, ensure_ascii=False)

    print(f"✅ {len(songs)} songs indexed in {OUTPUT_JSON}")

if __name__ == '__main__':
    build_index()