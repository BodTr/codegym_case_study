let canvas = document.getElementById('myCanvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')

// console.log(Math.random() * window.innerWidth, "random")
window.addEventListener('mousemove', (e) => {
    // console.log(e)
})

class Circle {
    constructor(x, y, radius, dx, dy) {
        this._x = x
        this._y = y
        this._radius = radius
        this._dx = dx
        this._dy = dy
    }

    get getX() {
        return this._x
    }
    set setX(x) {
        this._x = x
    }
    get getY() {
        return this._y
    }
    set setY(y) {
        this._y = y
    }
    get getRadius() {
        return this._radius
    }
    set setRadius(radius) {
        this._radius = radius
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI)
        ctx.strokeStyle = 'blue'
        ctx.stroke()
    }

    update() {
        
        if (this._x + this._radius > window.innerWidth || this._x - this._radius < 0) {
            this._dx = -this._dx
        }
        if (this._y + this._radius > window.innerHeight || this._y - this._radius < 0) {
            this._dy = -this._dy
        }
        this._x += this._dx
        this._y += this._dy
        
    }
}

// ctx.beginPath()
// ctx.arc(200, 300, 50, 0, 2 * Math.PI)
// ctx.strokeStyle = 'blue'
// ctx.stroke() 
let circles = []
let radiusInstance = 30

for (let i = 0; i < 100; i++) {
    
    let xInstance = Math.random() * (window.innerWidth - radiusInstance * 2) + radiusInstance // việc dùng kèm thêm số đo radius vào làm ko có hình tròn nào bị dính vào cạnh màn hình
    let yInstance = Math.random() * (window.innerHeight - radiusInstance * 2) + radiusInstance
    let dxInstance = (Math.random() - 0.5) * 10 // vận tốc
    let dyInstance = (Math.random() - 0.5) * 10
    
    let circle = new Circle(xInstance, yInstance, radiusInstance, dxInstance, dyInstance)
    circles.push(circle)
}

console.log(circles, "circles")

function animate() {

    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circles.length; i++) {
        circles[i].draw()
        circles[i].update()
    }

}

animate()