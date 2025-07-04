const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

// Predefined data
const sliceColors = [
  "#075f5a", "#8dc23e", "#44b6b1", "#f16c42",
  "#075f5a", "#f6b243", "#247bbb", "#f16c42"
];
const imageUrls = [
  "cordobesa.webp", "participar.webp", "taca-taca.webp", "otro-tiro.webp",
  "cordobesa.webp", "disfrutando.webp", "champaqui.webp", "otro-tiro.webp"
];

// Load images
let sliceImages = [], loadedCount = 0;
imageUrls.forEach((url, i) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    if (++loadedCount === imageUrls.length) {
      drawWheel();
    }
  };
  sliceImages[i] = img;
});

// State variables
let angle = 0;
let startAngle = 0;
let spinning = false;
let startTime = null;
const spinDuration = 5000; // in ms
let targetRotation = 0;

// Drawing function
function drawWheel() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const outsideR = cx;
  const innerR = 125;
  const radCenter = (outsideR + innerR) / 2;
  const maxImgSize = (outsideR - innerR) * 0.8;
  const sliceCount = sliceImages.length;
  const arc = 2 * Math.PI / sliceCount;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw slices
  sliceColors.forEach((color, i) => {
    const start = angle + i * arc;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outsideR, start, start + arc);
    ctx.lineTo(cx, cy);
    ctx.fill();

    // Draw image
    const img = sliceImages[i];
    const scale = Math.min(maxImgSize / img.width, maxImgSize / img.height);
    let imgW = img.width * scale;
    let imgH = img.height * scale;
    // Shrink taca-taca slice by 20%
    if (imageUrls[i] === "taca-taca.webp") {
      imgW *= 0.8;
      imgH *= 0.8;
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);
    ctx.drawImage(img, radCenter - imgW / 2, -imgH / 2, imgW, imgH);
    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
}

// Easing function
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Animation loop
function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / spinDuration, 1);
  const eased = easeOutCubic(progress);
  angle = startAngle + eased * targetRotation;
  drawWheel();
  if (progress < 1) {
    requestAnimationFrame(animate);
  } else {
    spinning = false;
  }
}

// Spin trigger
function startSpin() {
  if (spinning) return;
  spinning = true;
  startTime = null;
  startAngle = angle % (2 * Math.PI);

  // Random target rotation avoiding boundaries
  const sliceCount = sliceImages.length;
  const arc = 2 * Math.PI / sliceCount;
  const margin = arc * 0.1;
  const randomSlice = Math.floor(Math.random() * sliceCount);
  const sliceStartAngle = randomSlice * arc + margin;
  const randomOffset = Math.random() * (arc - 2 * margin);
  const finalAngle = sliceStartAngle + randomOffset;
  const rotations = 5;
  targetRotation = rotations * 2 * Math.PI + finalAngle;

  requestAnimationFrame(animate);
}

// Bind click/touch
canvas.addEventListener("click", startSpin);
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startSpin();
}, { passive: false });

// Initial draw
drawWheel();
