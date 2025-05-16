const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.6;

let balloons = [];
let score = 0;
let targetScore = 10;

class Balloon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 30;
        this.speed = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 75%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("❤", this.x - 8, this.y + 8);
    }

    update() {
        this.y -= this.speed;
    }
}

function addBalloon() {
    balloons.push(new Balloon());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balloons.forEach((balloon, index) => {
        balloon.update();
        balloon.draw();

        if (balloon.y + balloon.radius < 0) {
            balloons.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

canvas.addEventListener("click", function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    balloons.forEach((balloon, index) => {
        const dist = Math.hypot(mouseX - balloon.x, mouseY - balloon.y);
        if (dist < balloon.radius) {
            balloons.splice(index, 1);
            score++;
            document.getElementById("score").textContent = "Puntuación: " + score;
            if (score >= targetScore) {
                document.getElementById("poem").classList.remove("hidden");
            }
        }
    });
});

setInterval(addBalloon, 800);
animate();
