# 🎸 Guitar Chord Finder & Transposer

A simple, mobile-friendly web app that lets you browse, search, and transpose guitar chords embedded in song lyrics.

This project is built using plain HTML, CSS, and JavaScript, with song data compiled via a Python script. It's designed to be hosted easily using GitHub Pages.

---

## ✨ Features

- 🔍 Search songs by title
- 🎵 Chords are embedded inline with lyrics using square bracket notation or on the top of the lyric
(e.g., `[C]Let it be`)
- ⬆️⬇️ Transpose chords up or down on the fly
- 📱 Mobile-friendly and responsive design
- ⚡ Lightweight and works entirely in the browser — no server needed

---

## 📁 Folder Structure
├── index.html # Main webpage  
├── style.css # Stylesheet  
├── script.js # JS logic for search & transpose  
├── songs/ # Folder containing .txt files of chord+lyric data  
├── songs.json # Compiled song index (generated from /songs)  
├── generate_index.py # Python script to compile songs.json  
├── LICENSE.md # License info  
└── README.md # You're here! 


---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/ngbk1993/guitar_tab.git
cd your-repo-name
```

### 2. Add Your Songs
Place your chord files (.txt) inside the songs/ folder. Each file should have chords in square brackets:

[C]Let it [G]be, let it [Am]be, let it [F]be

### 3. Generate the Search Index
```bash
python generate_index.py
```
This will create (or update) songs.json, which is used for searching.


### 4. Preview Locally
Run a local server:

```bash
python -m http.server
```
Then open your browser and visit:
http://localhost:8000

### 5. Contributing Songs
You’re welcome to contribute new chord/lyric files!

a) How to Submit a Song:
Fork this repository

b) Create a new .txt file in the songs/ folder

c) Use square brackets for chords (e.g., [Am]I see a [F]sky full of [C]stars)

d) Use a clear filename (e.g., coldplay_sky_full_of_stars.txt)

e) Run the Python script to update songs.json (optional, the maintainer can do this too)

f) Commit and push your changes

g) Create a pull request with a short description (e.g., “Added Sky Full of Stars by Coldplay”)

Example .txt file:
``` mathematica
[G]Here comes the [D]sun, doo-doo-doo-[C]doo  
[G]Here comes the [D]sun, and I [C]say  
It's all [G]right
```
Please only submit songs that are:
Original, public domain, or used under fair use (for educational/non-commercial purposes)
Properly formatted (to make transposing easy)
