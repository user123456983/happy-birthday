const confetti = document.getElementById('confetti');
const ctx = confetti.getContext('2d');
confetti.width = window.innerWidth;
confetti.height = window.innerHeight;

let particles = [];

function createParticle() {
    const x = Math.random() * confetti.width;
    const y = Math.random() * confetti.height;
    const size = Math.random() * 5 + 2;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const speed = Math.random() * 3 + 1;

    return { x, y, size, color, speed };
}

function updateParticles() {
    particles.forEach((particle, index) => {
        particle.y += particle.speed;

        if (particle.y > confetti.height) {
            particles.splice(index, 1);
        }
    });

    while (particles.length < 100) {
        particles.push(createParticle());
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, confetti.width, confetti.height);

    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });
}

function loop() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(loop);
}

for (let i = 0; i < 100; i++) {
    particles.push(createParticle());
}

loop();
