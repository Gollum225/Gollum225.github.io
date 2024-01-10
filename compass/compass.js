// Hide permission button on not iOS-devices.
function init() {
  showPermissionButton();
  navigator.geolocation.getCurrentPosition(locationHandler);
  if (!isIOS()) {
    window.addEventListener("deviceorientationabsolute", handler, true);
  } else {
    window.addEventListener("deviceorientation", handler, true);
  }
}

// Turns the compass.
function handler(e) {
  const compassNeedle = document.getElementById("compass");
  compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
  compassNeedle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
}

// Sets the coordinates.
function locationHandler(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const latElement = document.getElementById("latitude");
  const longElement = document.getElementById("longitude");

  latElement.innerText = latitude.toFixed(3);
  longElement.innerText = longitude.toFixed(3);
}
