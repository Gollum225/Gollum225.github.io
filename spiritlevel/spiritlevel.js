// Six last data points to smooth out the device motion.
let data = [0, 0, 0, 0, 0, 0];

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// Main logic. Takes the current acceleration values and rotates the screen accordingly/makes the background green.
window.ondevicemotion = function (event) {
  this.document.getElementById("sensor").style.fontSize = "6em";

  var ax = event.accelerationIncludingGravity.x;
  var ay = event.accelerationIncludingGravity.y;
  var az = event.accelerationIncludingGravity.z;

  var degree = convertToDegree(ax, ay, az);

  // The smoothed out data
  var shownData = displaydata(degree);

  // Display the data.
  document.querySelector("#sensor").innerHTML =
    "<span>" + shownData + "&deg</span>";

  // Rotate the screen.
  document.getElementById("mainarea").style.transform =
    "translate(-50%, -50%) rotate(" + degree + "deg)";

  //make background color change depending on the angle
  if (degree <= 5 && degree >= -5) {
    this.document.getElementById("top").style.backgroundColor =
      "rgba(221, 196, 221, " + Math.abs(calculateAverage(data) / 5) + ")";
    this.document.getElementById("bottom").style.backgroundColor =
      "rgba(184, 243, 255, " + Math.abs(calculateAverage(data) / 5) + ")";
  } else if (degree >= 175 || degree <= -175) {
    this.document.getElementById("top").style.backgroundColor =
      "rgba(221, 196, 221, " +
      Math.abs(Math.abs(calculateAverage(data)) - 180) / 5 +
      ")";
    this.document.getElementById("bottom").style.backgroundColor =
      "rgba(184, 243, 255, " +
      Math.abs(Math.abs(calculateAverage(data)) - 180) / 5 +
      ")";
  } else if (
    (degree >= 85 && degree <= 95) ||
    (degree <= -85 && degree >= -95)
  ) {
    this.document.getElementById("top").style.backgroundColor =
      "rgba(184, 243, 255, " +
      Math.abs(Math.abs(calculateAverage(data)) - 90) / 5 +
      ")";
    this.document.getElementById("bottom").style.backgroundColor =
      "rgba(184, 243, 255, " +
      Math.abs(Math.abs(calculateAverage(data)) - 90) / 5 +
      ")";
  } else {
    this.document.getElementById("top").style.backgroundColor =
      "rgba(221, 196, 221, 1)";
    this.document.getElementById("bottom").style.backgroundColor =
      "rgba(184, 243, 255, 1)";
  }

  if (shownData % 90 == 0) {
    this.document.getElementById("bar").style.height = "1vh";
  } else {
    this.document.getElementById("bar").style.height = "0";
  }
};

// Takes the acceleration values and calculates the degree of the rotation of the x and y axis.
function convertToDegree(xAcceleration, yAcceleration, zAcceleration) {
  degree = Math.atan(xAcceleration / yAcceleration) * (180 / Math.PI);

  // the additional if statements to null are neccessary to avoid flickering of the screen at 0°, 90°, 180° and 270°
  if (xAcceleration > 0) {
    if (yAcceleration > 0) {
      return degree;
    }
    if (yAcceleration < 0) {
      return (degree = degree + 180);
    }
    if (yAcceleration == 0) {
      return 90;
    }
  }

  if (xAcceleration < 0) {
    if (yAcceleration < 0) {
      return (degree = degree - 180);
    }
    if (yAcceleration > 0) {
      return degree;
    }
    if (yAcceleration == 0) {
      return -90;
    }
  }

  if (xAcceleration == 0) {
    if (yAcceleration < 0) {
      return 180;
    } else {
      return 0;
    }
  }

  // the programm should never come to this point
  throw new RangeError("The acceleration values are not valid");
}

// To smooth out the device motion take the last six data points and build the average
function displaydata(degree) {
  data.shift();
  data.push(Math.abs(degree));

  return Math.round(calculateAverage(data));
}

function calculateAverage(array) {
  if (array.length === 0) {
    return 0;
  }

  const sum = array.reduce((acc, value) => acc + value, 0);
  return sum / array.length;
}

// Hide permission button on not iOS-devices.
function init() {
  showPermissionButton();
}
