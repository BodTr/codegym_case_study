const xInstance = canvas.width / 2
const yInstance = canvas.height / 2

const player = new Player(xInstance, yInstance, 30, 'blue')

let bullets = []
let enemies = []

function spawnEnemies() { 
    setInterval(() => { // cách 1s hàm này gọi 1 lần
        let radius = Math.random() * (30 - 8) + 8 // giá trị của radius chạy từ 8 -> 30
        let x
        let y

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        
        const color = 'green'
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    bullets.forEach((bullet) => {
        bullet.update()
    }) 
    enemies.forEach((enemy) => {
        enemy.update()
        // bullets.forEach((bullet) => {
        //     Math.hypot()
        // })
    })

}

window.addEventListener('mousemove', (e) => {
    // console.log(e)
    const angle = Math.atan2(e.clientY -  canvas.height / 2, e.clientX - canvas.width / 2)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    bullets.push(new Bullet(canvas.width / 2, canvas.height / 2, 5, 'red', velocity))
})

animate()
spawnEnemies()