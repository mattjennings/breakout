import { Engine, Actor, Color, CollisionType } from 'excalibur'

const chooseRandom = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export default class Brick extends Actor {
  public onInitialize(engine: Engine) {
    this.color = chooseRandom([Color.Violet, Color.Orange, Color.Yellow])
    this.collisionType = CollisionType.Active
  }
}
