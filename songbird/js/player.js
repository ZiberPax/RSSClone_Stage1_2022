export function playpause (data,button) {
  button.addEventListener('click', function () {
    if (data.paused) {
      button.classList.toggle("pause");
      data.play();
    } else {
      button.classList.toggle("pause");
      data.pause();
    }
  })
}

export function timeUpdate (playerData, data, progressBarActive, progressBar) {
  playerData.ontimeupdate = function () {
    let current = playerData.currentTime; 
    data.firstElementChild.innerHTML = timeFormat(current);
    playerData.onloadedmetadata = function() {
      data.lastElementChild.innerHTML = timeFormat(playerData.duration);
    };
    let duration = playerData.duration;
    console.log(duration);
    // data.lastElementChild.innerHTML = duration;
    let prog = Math.floor((current * 100) / duration);
    progressBarActive.style.setProperty("--progress", prog + "%");
  }

  function setProgress (event) {
    const width = this.clientWidth;
    console.log(width);
    let coordinateX = event.offsetX;
    let duration = playerData.duration;
    playerData.currentTime = (coordinateX / width) * duration;
  }

  function setProgressActive (event) {
    const width = progressBar.clientWidth;
    
    let coordinateX = event.offsetX;
    let duration = playerData.duration;
    console.log(width,coordinateX, duration);
    playerData.currentTime = (coordinateX / width) * duration;
  }

  progressBar.addEventListener('click', setProgress)
  progressBarActive.addEventListener('click', setProgressActive)


  function timeFormat (current) {
    let minutes = Math.floor(current / 60);
    let seconds = Math.floor(current % 60);

    if (seconds < 10) {seconds = "0" + seconds};
    return minutes + ":" + seconds;
  }
}




