<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
const app = new PIXI.Application()
document.body.appendChild(app.view)

app.loader.add('bunny', './../assets/logo.png').load((loader, resources) => {
  const bunny = new PIXI.Sprite(resources.bunny.texture)

  bunny.x = app.renderer.width / 2
  bunny.y = app.renderer.height / 2

  bunny.anchor.x = 0.5
  bunny.anchor.y = 0.5

  app.stage.addChild(bunny)

  app.ticker.add(() => {
    bunny.rotation += 0.01
  })
})

export default {
  name: 'Home'
}
</script>
