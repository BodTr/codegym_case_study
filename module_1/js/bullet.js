class Bullet {
    constructor(x, y, radius, color, velocity) {
        this._x = x
        this._y = y
        this._radius = radius
        this._color = color
        this._velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false)
        c.fillStyle = this._color
        c.fill()
    }

    update() {
        this.draw()
        this._x = this._x + this._velocity.x // _velocity là 1 obj gồm 2 thuộc tính x (tỷ lệ vận tốc theo phương x so với vận tốc tổng) và y (tỷ lệ vận tốc theo phương y so với vận tốc tổng)
        this._y = this._y + this._velocity.y
    }
     
}