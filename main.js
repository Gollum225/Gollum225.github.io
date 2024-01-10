// Need to differentiate to iOS, because it needs permission for the sensors.
function isIOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document) ||
    navigator.platform.toUpperCase().indexOf("MAC") >= 0
  );
}

// Aksk for permission for the sensors.
function askForPermission() {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        document.getElementById("permissionButton").style.display = "none";
      }
    })
    .catch(console.error);
}

// Shows the permission button only if the device does need permission or if the permission is not already granted.
function showPermissionButton() {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    document.getElementById("permissionButton").style.display = "block";
  }
}
