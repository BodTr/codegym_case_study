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
        // tạo các enemy ngẫu nhiên xung quanh màn hình
        if (Math.random() < 0.5) { // có 50% vào if statement, 50% vào else statement, nếu vào if statement thì enemy sẽ xuất hiện trên Oy, vào else statement thì enemy sẽ xuất hiện trên Õ
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius // nếu kq trả về của Math.random() < 0.5 thì Xenemy = - radius, nếu > 0.5 thì Xenemy = canvas.width còn Yenemy = (0, canvas.height)
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius // nếu kq trả về của Math.random() < 0.5 thì Yenemy = - radius, nếu > 0.5 thì Yenemy = canvas.height còn Xenemy = (0, canvas.width)
        }
        
        const color = 'green'
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const ratio = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        const initV = 1
        enemies.push(new Enemy(x, y, radius, color, ratio, initV))
    }, 1000)
}

function animate() {
    let animationId = requestAnimationFrame(animate)
    // console.log(animationId, "animationId")
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    // xóa các bullet khi chúng chuyển động ra ngoài màn hình
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

    // console.log(enemies, "enemies")
    // console.log(bullets, "bullets")

}

window.addEventListener('click', (e) => {
    // console.log(e)
    const angle = Math.atan2(e.clientY -  canvas.height / 2, e.clientX - canvas.width / 2) // hàm atan2() trả về kết quả là góc tạo ra giữa 2 cạnh góc vuông của 1 tam giác vuông
    const ratio = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    bullets.push(new Bullet(canvas.width / 2, canvas.height / 2, 5, 'red', ratio, 3))
})

animate()
spawnEnemies()