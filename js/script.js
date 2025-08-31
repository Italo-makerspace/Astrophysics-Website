//  Spacetime  
const canvasSpacetime = document.getElementById("spacetime");
if (canvasSpacetime) {
  const ctxSpacetime = canvasSpacetime.getContext("2d");
  const gridSize = 30;
  let mass = { x: 300, y: 300, r: 20 }; // central mass that distorts the grid

  // Draw the grid with distortion caused by mass
  function drawGrid() {
    ctxSpacetime.strokeStyle = "rgba(0, 255, 200, 0.8)";
    ctxSpacetime.lineWidth = 1;

    for (let x = 0; x <= canvasSpacetime.width; x += gridSize) {
      ctxSpacetime.beginPath();
      for (let y = 0; y <= canvasSpacetime.height; y += gridSize) {
        let dx = x - mass.x;
        let dy = y - mass.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let offset = 50 * Math.exp(-dist / 100); // distortion decreases with distance
        ctxSpacetime.lineTo(x, y + offset);
      }
      ctxSpacetime.stroke();
    }

    for (let y = 0; y <= canvasSpacetime.height; y += gridSize) {
      ctxSpacetime.beginPath();
      for (let x = 0; x <= canvasSpacetime.width; x += gridSize) {
        let dx = x - mass.x;
        let dy = y - mass.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let offset = 50 * Math.exp(-dist / 100);
        ctxSpacetime.lineTo(x, y + offset);
      }
      ctxSpacetime.stroke();
    }
  }

  // Draw the central mass
  function drawMass() {
    ctxSpacetime.beginPath();
    ctxSpacetime.arc(mass.x, mass.y, mass.r, 0, Math.PI * 2);
    ctxSpacetime.fillStyle = "white";
    ctxSpacetime.fill();
  }

  // Render the entire scene
  function renderSpacetime() {
    ctxSpacetime.clearRect(0, 0, canvasSpacetime.width, canvasSpacetime.height);
    drawGrid();
    drawMass();
  }

  // Update mass position based on mouse movement
  canvasSpacetime.addEventListener("mousemove", (e) => {
    const rect = canvasSpacetime.getBoundingClientRect();
    mass.x = e.clientX - rect.left;
    mass.y = e.clientY - rect.top;
    renderSpacetime();
  });

  renderSpacetime();
}

//  Magnetic Waves
const canvasWaves = document.getElementById("waves");
if (canvasWaves) {
  const ctxWaves = canvasWaves.getContext("2d");
  let t = 0; // time variable for animation

  function drawWaves() {
    ctxWaves.clearRect(0, 0, canvasWaves.width, canvasWaves.height);

    // Draw 3 waves with RGB colors
    for (let i = 0; i < 3; i++) {
      ctxWaves.beginPath();
      ctxWaves.strokeStyle = i === 0 ? "red" : i === 1 ? "green" : "blue";
      ctxWaves.lineWidth = 2;

      for (let x = 0; x < canvasWaves.width; x++) {
        let y = 150 + 40 * Math.sin((x * 0.02) + t + i * 2);
        ctxWaves.lineTo(x, y);
      }
      ctxWaves.stroke();
    }

    t += 0.05;
    requestAnimationFrame(drawWaves); // continuous animation
  }

  drawWaves();
}

//  Orbit 
const canvasOrbit = document.getElementById("orbit");
if (canvasOrbit) {
  const ctxOrbit = canvasOrbit.getContext("2d");
  let angle = 0;

  function drawOrbit() {
    ctxOrbit.clearRect(0, 0, canvasOrbit.width, canvasOrbit.height);

    // Draw the sun at the center
    ctxOrbit.beginPath();
    ctxOrbit.arc(300, 200, 20, 0, Math.PI * 2);
    ctxOrbit.fillStyle = "yellow";
    ctxOrbit.fill();

    // Draw orbital path
    ctxOrbit.beginPath();
    ctxOrbit.arc(300, 200, 120, 0, Math.PI * 2);
    ctxOrbit.strokeStyle = "rgba(255,255,255,0.3)";
    ctxOrbit.stroke();

    // Calculate planet position on orbit
    let x = 300 + 120 * Math.cos(angle);
    let y = 200 + 120 * Math.sin(angle);
    ctxOrbit.beginPath();
    ctxOrbit.arc(x, y, 10, 0, Math.PI * 2);
    ctxOrbit.fillStyle = "cyan";
    ctxOrbit.fill();

    angle += 0.02; // orbit speed
    requestAnimationFrame(drawOrbit);
  }

  drawOrbit();
}

//  Black Hole 
const canvasGravity = document.getElementById("blackhole");
if (canvasGravity) {
  const ctxGravity = canvasGravity.getContext("2d");
  const widthG = canvasGravity.width;
  const heightG = canvasGravity.height;

  const blackholeG = { x: widthG/2, y: heightG/2, radius: 50, strength: 6 }; 
  let beamsG = [];
  for (let i=0; i<20; i++) beamsG.push({x:0, y:50+i*20, path:[]}); // light beams

  function animateGravity() {
    ctxGravity.clearRect(0,0,widthG,heightG);

    // Draw black hole
    ctxGravity.fillStyle = "black";
    ctxGravity.beginPath();
    ctxGravity.arc(blackholeG.x, blackholeG.y, blackholeG.radius,0,Math.PI*2);
    ctxGravity.fill();

    // Draw light beams bending towards black hole
    ctxGravity.strokeStyle = "yellow";
    ctxGravity.lineWidth = 1.5;
    beamsG.forEach(beam => {
      beam.path.push({x: beam.x, y: beam.y});
      let dx = blackholeG.x - beam.x;
      let dy = blackholeG.y - beam.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      let bendY = (dy/dist) * blackholeG.strength;

      beam.x += 2;
      beam.y += bendY*0.02;

      ctxGravity.beginPath();
      ctxGravity.moveTo(beam.path[0].x, beam.path[0].y);
      for (let i=1; i<beam.path.length; i++){
        ctxGravity.lineTo(beam.path[i].x, beam.path[i].y);
      }
      ctxGravity.stroke();

      // Reset beam when out of canvas
      if(beam.x>widthG || beam.path.length>500){
        beam.x = 0;
        beam.y = 50 + Math.random()*200;
        beam.path = [];
      }
    });

    requestAnimationFrame(animateGravity);
  }

  animateGravity();
}

// Universe Expansion 
const canvasExp = document.getElementById("expansion");
if (canvasExp) {
  const ctxExp = canvasExp.getContext("2d");
  const widthE = canvasExp.width;
  const heightE = canvasExp.height;
  const center = {x: widthE/2, y: heightE/2};

  // Generate galaxies
  let galaxies = [];
  for(let i=0; i<200; i++){
    let angle = Math.random() * 2 * Math.PI;
    let radius = Math.random() * 10;  
    galaxies.push({r: radius, angle: angle, size: 2, speed: 0.01 + Math.random()*0.02});
  }

  function animateExpansion(){
    ctxExp.clearRect(0,0,widthE,heightE);
    ctxExp.fillStyle = "white";

    galaxies.forEach(g => {
      let x = center.x + g.r * Math.cos(g.angle);
      let y = center.y + g.r * Math.sin(g.angle);
      ctxExp.beginPath();
      ctxExp.arc(x, y, g.size, 0, Math.PI*2);
      ctxExp.fill();

      g.r *= (1 + g.speed); // radial expansion
    });

    // Draw central reference
    ctxExp.strokeStyle = "red";
    ctxExp.lineWidth = 2;
    ctxExp.beginPath();
    ctxExp.arc(center.x, center.y, 50, 0, Math.PI**2);
    ctxExp.stroke();

    requestAnimationFrame(animateExpansion);
  }
  animateExpansion();
}

// Light Time Dilation 
const canvasTime = document.getElementById("lightbending");
if (canvasTime) {
  const ctxTime = canvasTime.getContext("2d");
  const widthT = canvasTime.width;
  const heightT = canvasTime.height;

  const blackholeT = { x: widthT/2, y: heightT/2, radius: 50 };
  let beamsT = [];
  for (let i=0; i<15; i++) beamsT.push({x:0, y:50+i*30, path:[]});

  function animateTime() {
    ctxTime.clearRect(0,0,widthT,heightT);

    ctxTime.fillStyle = "black";
    ctxTime.beginPath();
    ctxTime.arc(blackholeT.x, blackholeT.y, blackholeT.radius,0,Math.PI*2);
    ctxTime.fill();

    beamsT.forEach(beam => {
      beam.path.push({x: beam.x, y: beam.y});
      let dx = blackholeT.x - beam.x;
      let dy = blackholeT.y - beam.y;
      let dist = Math.sqrt(dx*dx + dy*dy);

      let speed = 2 * (1 - 0.5 * Math.exp(-dist/100));
      let stretch = Math.min(30, 200/dist);

      beam.x += speed;

      ctxTime.strokeStyle = `rgba(255,255,0,${Math.min(1, 200/dist)})`;
      ctxTime.lineWidth = 2;
      ctxTime.beginPath();
      ctxTime.moveTo(beam.x, beam.y);
      ctxTime.lineTo(beam.x - stretch, beam.y);
      ctxTime.stroke();

      if(beam.x > widthT){
        beam.x = 0;
        beam.y = 50 + Math.random()*400;
        beam.path = [];
      }
    });

    requestAnimationFrame(animateTime);
  }

  animateTime();
}
