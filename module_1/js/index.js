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
    let animationId = requestAnimationFrame(animate)
    // console.log(animationId, "animationId")
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    bullets.forEach((bullet, bulletIndex) => {
        bullet.update()
        if (bullet._x - bullet._radius < 0 || bullet._x - bullet._radius > canvas.width || bullet._y - bullet._radius < 0 || bullet._y - bullet._radius > canvas.height) {
            setTimeout(() => {
                bullets.splice(bulletIndex, 1)
            }, 0)
        }
    }) 
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update()
        // if (enemy._x - enemy._radius < 0 || enemy._x - enemy._radius > canvas.width || enemy._y - enemy._radius < 0 || enemy._y - enemy._radius > canvas.height) {
        //     setTimeout(() => {
        //         enemies.splice(enemyIndex, 1)
        //     }, 0)
        // }
        let distEtoP = Math.hypot(player._x - enemy._x, player._y - enemy._y) // tính độ dài vec tơ có tọa độ là (player._x - enemy._x, player._y - enemy._y)
        if (distEtoP - enemy._radius - player._radius < 1) {
            cancelAnimationFrame(animationId)
        }
        bullets.forEach((bullet, bulletIndex) => { // kiểm tra khoảng cách giữa từng viên đạn với enemy đang xét trong forEach()
            let dist = Math.hypot(bullet._x - enemy._x, bullet._y - enemy._y)
            if (dist - enemy._radius - bullet._radius < 1) {
                setTimeout(() => {
                    enemies.splice(enemyIndex, 1)
                    bullets.splice(bulletIndex, 1)
                }, 0)

            }
        })
    })

    console.log(enemies, "enemies")
    console.log(bullets, "bullets")

}

window.addEventListener('click', (e) => {
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