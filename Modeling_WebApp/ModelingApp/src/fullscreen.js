document.addEventListener("fullscreenchange", function() {
  if (document.title !== null && document.title.toLowerCase() === String("CNA Modeling: Modeling Application").toLowerCase()) {
    if (document.fullscreenElement) {
      console.log("open fullscreen");
      $("#open-fullscreen-button").hide();
      $("#close-fullscreen-button").show();
    } else {
      console.log("close fullscreen");
      $("#close-fullscreen-button").hide();
      $("#open-fullscreen-button").show();
    }
  }
});

// Mostly taken from https://www.w3schools.com/howto/howto_js_fullscreen.asp

/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function openFullscreen(elementId, openFullscreenButton, closeFullscreenButton) {
  
  /* Get the element you want displayed in fullscreen mode: */
  var elem = document.getElementById(elementId);

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }

  if (closeFullscreenButton && openFullscreenButton) {
    $(openFullscreenButton).hide();
    $(closeFullscreenButton).show();
  }
}

/* Close fullscreen */
function closeFullscreen(closeFullscreenButton, openFullscreenButton) {

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }

  if (closeFullscreenButton && openFullscreenButton) {
    $(closeFullscreenButton).hide();
    $(openFullscreenButton).show();
  }
}

