const Direction = Object.freeze({
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right",
});

const Turn = Object.freeze({
    Left: "Left",
    Right: "Right",
});

const direction = Direction.Left;

class Draw {
    sequence;
    ctx;
    canvas;
    step = 20;

    direction = Direction.Right;
    position = { x: 300, y: 300 };

    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;

        this.ctx.lineWidth = 2;
    }

    tick(number, ignoreZeros = true) {

        if (number === 0 && ignoreZeros) {
            return;
        } else if (number % 2 === 0) {
            // even -> right turn
            this.drawLine(Turn.Right);
        } else {
            // odd -> left turn
            this.drawLine(Turn.Left);
        }
    }
    
    reset() {
        this.position = { x: 300, y: 300 };
        this.direction = Direction.Right;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawLine(turn) {
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);

        this.direction = this.getNewDirection(turn);

        switch (this.direction) {
            case Direction.Up:
                this.position.y -= this.step;
                break;
        
            case Direction.Right:
                this.position.x += this.step;
                break;
            
            case Direction.Down:
                this.position.y += this.step;
                break;

            case Direction.Left:
                this.position.x -= this.step;
                break;
        }

        ctx.lineTo(this.position.x, this.position.y);
        ctx.stroke();
    }

    getNewDirection(turn) {
        let direction = this.direction;

        switch (turn) {
            case Turn.Left:
                switch (direction) {
                    case Direction.Up:
                        direction = Direction.Left;
                        break;
                    
                    case Direction.Left:
                        direction = Direction.Down;
                        break;

                    case Direction.Down:
                        direction = Direction.Right;
                        break;
                    
                    case Direction.Right:
                        direction = Direction.Up;
                        break;
                }
                break;
        
            case Turn.Right:
                switch (direction) {
                    case Direction.Up:
                        direction = Direction.Right;
                        break;
                    
                    case Direction.Left:
                        direction = Direction.Up;
                        break;

                    case Direction.Down:
                        direction = Direction.Left;
                        break;
                    
                    case Direction.Right:
                        direction = Direction.Down;
                        break;
                }
        }

        return direction;
    }
}
