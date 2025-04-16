let songs = [];
let currentSong = null;
let transposeOffset = 0;
const transposeDisplay = document.getElementById('transposeDisplay');

const chordList = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Function to transpose individual chords
function transposeChord(chord, offset) {
  const match = chord.match(/^([A-G][#b]?)(.*)/);
  if (!match) return chord;

  const [_, base, suffix] = match;
  const index = chordList.indexOf(base);
  if (index === -1) return chord;

  const newIndex = (index + offset + chordList.length) % chordList.length;
  return chordList[newIndex] + suffix;
}

function loadSongs() {
  fetch('songs.json')
    .then(res => res.json())
    .then(data => {
      songs = data;
      displaySongList(songs);
    });
}

function displaySongList(filteredSongs) {
  const listDiv = document.getElementById('songList');
  listDiv.innerHTML = '';
  filteredSongs.forEach(song => {
    const div = document.createElement('div');
    div.textContent = `${song.title} - ${song.artist}`;
    div.onclick = () => displaySong(song);
    listDiv.appendChild(div);
  });
}

function displaySong(song) {
  currentSong = song;
  transposeOffset = 0;

  document.getElementById('songTitle').textContent = song.title;
  document.getElementById('songArtist').textContent = song.artist;
  document.getElementById('songContent').textContent = song.content;

  document.getElementById('songDisplay').classList.remove('hidden');
  transposeDisplay.textContent = "Original Key";
}

function transpose(offset) {
  if (!currentSong) return;
  transposeOffset += offset;

  transposeDisplay.textContent =
    transposeOffset > 0
      ? `Transposed +${transposeOffset} steps`
      : transposeOffset < 0
      ? `Transposed ${transposeOffset} steps`
      : `Original Key`;

  const transposed = currentSong.content.replace(/\[([^\]]+)\]/g, (match, chord) => {
    if (chord.includes('/')) {
      const [main, bass] = chord.split('/');
      return `[${transposeChord(main, transposeOffset)}/${transposeChord(bass, transposeOffset)}]`;
    } else {
      return `[${transposeChord(chord, transposeOffset)}]`;
    }
  });

  document.getElementById('songContent').textContent = transposed;
}

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(query) ||
    song.artist.toLowerCase().includes(query)
  );
  displaySongList(filtered);
});

loadSongs();