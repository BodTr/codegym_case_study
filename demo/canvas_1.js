let canvas = document.getElementById('myCanvas')
console.log(canvas, "canvas")

canvas.width = window.innerWidth // chiều rộng màn hình
canvas.height = window.innerHeight

let ctx = canvas.getContext('2d');

// ctx.fillRect(x, y, width, height)
ctx.fillStyle = 'rgba(155, 50, 200, 0.2)' // đổi màu của các hình chữ nhật
ctx.fillRect(100, 200, 300, 200)

ctx.fillRect(50, 50, 100, 50)
ctx.fillRect(400, 600, 300, 100)

// Line
ctx.beginPath()
// vẽ 1 đường gấp khúc (lưu ý nếu chỉ có 2 điểm thì là đường thẳng) bắt đầu từ điểm có tọa dộ (50, 300) đến điểm (700, 200) rồi đến (800, 600) 
ctx.moveTo(50, 300) 
ctx.lineTo(700, 200)
ctx.lineTo(800, 600)
ctx.strokeStyle = 'blue' // màu của đường gấp khúc
ctx.stroke() // thực hiện vẽ bằng cách nối các điểm trên lại

// arc / circle

// ctx.arc(x, y, radius, 0, 2 *Math.PI) // vẽ đường tròn
ctx.beginPath()
ctx.arc(30, 30, 20, 0, 2 * Math.PI)
ctx.stroke()

// Vẽ nhiều đường tròn
for (let i = 0; i < 50; i++) {
    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255, 20, 0, 0.2)'
    ctx.arc(x, y, 20, 0, 2 * Math.PI)
    ctx.fill()
}