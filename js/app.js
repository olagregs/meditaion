const App = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('video');

  // Sounds
  const sounds = document.querySelectorAll('.sound-selector button');

  // Time Display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-selector button');

  // Get the Length
  const outlineLength = outline.getTotalLength();

  // Duration
  let duration = '';

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Different Sounds
  sounds.forEach(sounds => {
    sounds.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
    })
  })

  // Play Sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // Select Sound
  timeSelect.forEach(option => {
    option.addEventListener('click', function() {
      duration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    });
  });



  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./assets/svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./assets/svg/play.svg";
    }
  };

  // Animation
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapse = duration - currentTime;
    let minutes = Math.floor(elapse / 60);
    let seconds = Math.floor(elapse % 60);

    // Animate the circle
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      video.pause();
      play.src = "./assets/svg/replay.svg";
    }
  };
};

App();