import { Engine, Actor, Color, CollisionType } from 'excalibur'

export default class Paddle extends Actor {
  public onInitialize(engine: Engine) {
    // Let's give it some color with one of the predefined
    // color constants
    this.color = Color.Chartreuse

    // Make sure the paddle can partipate in collisions, by default excalibur actors do not collide
    this.collisionType = CollisionType.Fixed

    engine.input.pointers.primary.on('move', this.onMouseMove)
  }

  public onMouseMove = (ev: any) => {
    this.pos.x = ev.worldPos.x
  }
}
