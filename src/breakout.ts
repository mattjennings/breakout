import { Engine, GameEvent } from 'excalibur'
import Paddle from './actors/paddle'
import Ball from './actors/ball'
import Brick from './actors/brick'

export default class Breakout extends Engine {
  public onInitialize() {
    const ball = new Ball(700, 300, 20, 20)
    const paddle = new Paddle(150, this.drawHeight - 40, 200, 20)

    this.add(paddle)
    this.add(ball)
    this.buildBricks()
  }

  public buildBricks() {
    // Padding between bricks
    const padding = 20 // px
    const xoffset = 65 // x-offset
    const yoffset = 20 // y-offset
    const columns = 5
    const rows = 3

    // Individual brick width with padding factored in
    const brickWidth = this.drawWidth / columns - padding - padding / columns // px
    const brickHeight = 30 // px
    const bricks = []
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < columns; i++) {
        bricks.push(
          new Brick(
            xoffset + i * (brickWidth + padding) + padding,
            yoffset + j * (brickHeight + padding) + padding,
            brickWidth,
            brickHeight
          )
        )
      }
    }

    bricks.forEach(brick => {
      this.add(brick)
    })
  }
}
