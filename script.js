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
      handleHashLoad();  // Check the URL on load and display the correct song and transpose
    });
}

function displaySongList(filteredSongs) {
  const listDiv = document.getElementById('songList');
  listDiv.innerHTML = '';
  filteredSongs.forEach(song => {
    const div = document.createElement('div');
    div.textContent = `${song.title} - ${song.artist}`;
    div.onclick = () => {
        displaySong(song);
        listDiv.style.display = "none";  // 👈 Hide the list here
    };
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

  // Update URL hash with transpose state
  updateHash();
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

  // Update the hash in the URL after transposing
  updateHash();
}

function updateHash() {
  if (!currentSong) return;
  const encodedPath = encodeURIComponent(currentSong.path);  // Assuming the song has a 'path' attribute
  const hash = `${encodedPath}?transpose=${transposeOffset}`;
  window.location.hash = hash;
}

function handleHashLoad() {
  const [rawPath, query] = decodeURIComponent(window.location.hash.slice(1)).split('?');
  if (!rawPath) return;

  const song = songs.find(s => s.path === rawPath);
  if (!song) return;

  displaySong(song);

  const params = new URLSearchParams(query);
  const transposeValue = parseInt(params.get('transpose'));
  if (!isNaN(transposeValue) && transposeValue !== 0) {
    // Apply transpose this many times
    const steps = transposeValue;
    for (let i = 0; i < Math.abs(steps); i++) {
      transpose(steps > 0 ? 1 : -1);
    }
  }
}

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const listDiv = document.getElementById('songList');

  if (query.trim() === "") {
    listDiv.style.display = "none";  // Hide if input is empty
  } else {
    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
    displaySongList(filtered);
    listDiv.style.display = "block";  // Show the list while searching
  }
});

document.getElementById('searchInput').addEventListener('focus', function () {
  const query = this.value.toLowerCase();
  const listDiv = document.getElementById('songList');

  if (query.trim() === "") {
    listDiv.style.display = "none";
  } else {
    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
    displaySongList(filtered);
    listDiv.style.display = "block";
  }
});

loadSongs();