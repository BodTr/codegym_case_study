class Bullet {
    constructor(x, y, radius, color, ratio, initV) {
        this._x = x
        this._y = y
        this._radius = radius
        this._color = color
        this._ratio = ratio
        this._initV = initV
    }

    draw() {
        c.beginPath()
        c.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false)
        c.fillStyle = this._color
        c.fill()
    }

    update() {
        this.draw()
        this._x = this._x + this._ratio.x * this._initV // _ratio là 1 obj gồm 2 thuộc tính x (tỷ lệ vận tốc theo phương x so với vận tốc tổng) và y (tỷ lệ vận tốc theo phương y so với vận tốc tổng)
        this._y = this._y + this._ratio.y * this._initV
    }
     
}