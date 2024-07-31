class Player {
    constructor (x, y, radius, color) {
        this._x = x
        this._y = y
        this._radius = radius
        this._color = color

    }
    draw() {
        c.beginPath()
        c.arc(this._x, this._y, this._radius, 0, Math.PI * 2, false) // false là vẽ hình tròn ngược chiều kim đồng hồ
        c.fillStyle = this._color
        c.fill()
        
    }
}