import { Engine, Actor, Color, CollisionType } from 'excalibur'
import Brick from './brick'
import Breakout from '../breakout'

export default class Ball extends Actor {
  public onInitialize(engine: Engine) {
    // Set the color
    this.color = Color.Red

    // Set the velocity in pixels per second
    this.vel.setTo(300, 300)

    // Set the collision Type to passive
    this.collisionType = CollisionType.Passive
    // Other possible collision types:
    // "ex.CollisionType.PreventCollision - this means do not participate in any collision notification at all"
    // "ex.CollisionType.Active - this means participate and let excalibur resolve the positions/velocities of actors after collision"
    // "ex.CollisionType.Fixed - this means participate, but this object is unmovable"

    // On collision bounce the ball
    this.on('precollision', this.onPreCollision)
    this.on('postupdate', this.onPostUpdate)
    this.on('exitviewport', this.onExitViewPort)
  }

  public onPostUpdate() {
    const { drawWidth } = this.scene.engine
    const ballCenter = this.getWidth() / 2
    // If the ball collides with the left side
    // of the screen reverse the x velocity
    if (this.pos.x < ballCenter) {
      this.vel.x *= -1
      this.x = ballCenter
    }

    // If the ball collides with the right side
    // of the screen reverse the x velocity
    if (this.pos.x + ballCenter > drawWidth) {
      this.vel.x *= -1
      this.x = drawWidth - ballCenter
    }

    // If the ball collides with the top
    // of the screen reverse the y velocity
    if (this.pos.y < this.getHeight() / 2) {
      this.vel.y *= -1
    }
  }

  public onPreCollision = (ev: any) => {
    if (ev.other instanceof Brick) {
      // kill removes an actor from the current scene
      // therefore it will no longer be drawn or updated
      ev.other.kill()
    }

    // reverse course after any collision
    // intersections are the direction body A has to move to not be clipping body B
    // `ev.intersection` is a vector `normalize()` will make the length of it 1
    // `negate()` flips the direction of the vector
    const intersection = ev.intersection.normalize()

    // The largest component of intersection is our axis to flip
    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
      this.vel.x *= -1
    } else {
      this.vel.y *= -1
    }
  }

  public onExitViewPort = () => {
    window.location.reload()
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // Custom draw code
    ctx.fillStyle = this.color.toString()
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
}
