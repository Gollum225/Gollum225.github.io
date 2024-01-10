let initValue;
let currentCompass;

function start() {
  initValue = currentCompass;
}

function handler(e) {
  // Gets the compass value.
  const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);

  currentCompass = compass;

  if (initValue != undefined) {
    this.document.getElementById("rotation").innerHTML =
      "<span>" + difference() + "&deg</span>";
    document.getElementById("rotation").style.fontSize = "5em";
  }
}

// Hide permission button on not iOS-devices.
function init() {
  showPermissionButton();
  if (!isIOS()) {
    window.addEventListener("deviceorientationabsolute", handler, true);
  } else {
    window.addEventListener("deviceorientation", handler, true);
  }
}

// Calculate the requested difference.
function difference() {
  let difference = Math.abs(initValue - currentCompass);
  if (difference > 180) {
    difference = 360 - difference;
  }
  return difference.toFixed(1);
}
