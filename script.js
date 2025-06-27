const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");

const slices = [
  "¡Gracias por participar!",
  "TACA TACA",
  "CORDOBESA",
  "TENÉS OTRO TIRO",
  "CHAÑARPAQUÍ",
  "¡SEGUÍ DISFRUTANDO!",
  "CORDOBESA",
  "TENÉS OTRO TIRO"
];

const colors = [
  "#A6CE39", "#5CB4AE", "#264B49", "#F26724",
  "#1B75BB", "#FBB040", "#264B49", "#F26724"
];

let angle = 0;
let startAngle = 0;
let isSpinning = false;
let startTime = null;
let spinDuration = 5000; // en milisegundos

function drawWheel() {
  const outsideRadius = 250;
  const textRadius = 200;
  const insideRadius = 100;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const arc = Math.PI / (slices.length / 2);

  for (let i = 0; i < slices.length; i++) {
    const angleStart = angle + i * arc;
    ctx.fillStyle = colors[i];

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, outsideRadius, angleStart, angleStart + arc, false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angleStart + arc / 2);
    ctx.textAlign = "right";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(slices[i], textRadius, 10);
    ctx.restore();
  }

  // Círculo central
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.fillStyle = "#0066cc";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("BANCOR", canvas.width / 2, canvas.height / 2 + 7);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateWheel(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / spinDuration, 1);
  const easedProgress = easeOutCubic(progress);

  const totalRotation = 10 * Math.PI; // ~5 vueltas completas
  angle = startAngle + easedProgress * totalRotation;

  drawWheel();

  if (progress < 1) {
    requestAnimationFrame(animateWheel);
  } else {
    isSpinning = false;
  }
}

spinButton.addEventListener("click", () => {
  if (isSpinning) return;
  isSpinning = true;
  startTime = null;
  startAngle = angle % (2 * Math.PI);
  requestAnimationFrame(animateWheel);
});

drawWheel();