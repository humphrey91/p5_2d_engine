function toggleFullscreen() {
    let elem = document.querySelector("canvas");
  
    if (!document.fullscreenElement) {
      elem.requestFullscreen().then({}).catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
}

