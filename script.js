let songs = [];
let currentSong = null;
let transposeOffset = 0;

const chordList = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

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
}

function transpose(offset) {
  if (!currentSong) return;
  transposeOffset += offset;

  const transposed = currentSong.content.replace(/\[([A-G][#b]?m?(aj|dim|sus)?\d*)\]/g, (match, chord) => {
    let base = chord.match(/[A-G]#?/)[0];
    let suffix = chord.slice(base.length);
    let index = chordList.indexOf(base);
    if (index === -1) return match;
    let newIndex = (index + transposeOffset + chordList.length) % chordList.length;
    return `[${chordList[newIndex]}${suffix}]`;
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