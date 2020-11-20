<template>
  <div>
    <div class="container">
      <InputForm @item-added="itemAdded($event)" :counter="counter"></InputForm>
      <div class="list-container" v-show="listValues.length">
        <div v-for="item in listValues" v-bind:key="item.id"
          class="m-bottom-24 token animate__animated animate__fadeInDown"
          draggable="true"
          @dragstart="dragStart($event, item)"
          :id="'dragTarget' + item.id">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="drop-container" v-show="listValues.length">
      <div class="name-column column">
        <div class="column-name">{{$t('HelloWorld.name-column-label')}}</div>
        <div class="name-drop-class drop-class"
          @drop="drop($event)" @dragover="allowDrop($event)"
          @dragenter="enterDrag($event)" @dragleave="leaveDrag($event)"
          :id="'dropTarget_' + NAME">
        </div>
      </div>
      <div class="animal-column column">
        <div class="column-name">{{$t('HelloWorld.animal-column-label')}}</div>
        <div class="animal-drop-class drop-class"
          @drop="drop($event)" @dragover="allowDrop($event)"
          @dragenter="enterDrag($event)" @dragleave="leaveDrag($event)"
          :id="'dropTarget_' + ANIMAL">
        </div>
      </div>
      <div class="place-column column">
        <div class="column-name">{{$t('HelloWorld.place-column-label')}}</div>
        <div class="place-drop-class drop-class"
          @drop="drop($event)" @dragover="allowDrop($event)"
          @dragenter="enterDrag($event)" @dragleave="leaveDrag($event)"
          :id="'dropTarget_' + PLACE">
        </div>
      </div>
      <div class="thing-column column">
        <div class="column-name">{{$t('HelloWorld.thing-column-label')}}</div>
        <div class="thing-drop-class drop-class"
          @drop="drop($event)" @dragover="allowDrop($event)"
          @dragenter="enterDrag($event)" @dragleave="leaveDrag($event)"
          :id="'dropTarget_' + THING">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputForm from './InputForm.vue'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    InputForm
  },
  data () {
    return {
      listValues: [],
      NAME: 0,
      ANIMAL: 1,
      PLACE: 2,
      THING: 3,
      counter: 0
    }
  },
  mounted () {
    this.$preloaders.open({
      loader: 'myAwesomeLoader'
    })
    this.fetchData()
      .then((response) => {
        this.listValues = Object.values(response.data)
        this.counter = this.listValues.length
        this.$preloaders.close()
      })
      .catch((error) => {
        console.log(error)
        this.$preloaders.close()
      })
    console.log(this.msg)
  },
  methods: {
    itemAdded (itemKey) {
      this.$preloaders.open({
        loader: 'myAwesomeLoader'
      })
      this.fetchData()
        .then((response) => {
          this.listValues.push(response.data[itemKey])
          this.counter = this.listValues.length
          this.$preloaders.close()
        })
        .catch((error) => {
          console.log(error)
          this.$preloaders.close()
        })
    },
    dragStart (event, item) {
      event.dataTransfer.setData('elementId', event.target.id)
      event.dataTransfer.setData('itemType', item.type)
    },
    allowDrop (event) {
      if (event.target.id.match(/dropTarget/g)) {
        event.preventDefault()
      }
    },
    drop (event) {
      event.preventDefault()
      const dropZoneTypeId = event.target.id.split('_')[1]
      const itemType = event.dataTransfer.getData('itemType')
      this.resetStyles(event)
      if (dropZoneTypeId === itemType) {
        const targetHeight = event.target.offsetHeight + 80
        const data = event.dataTransfer.getData('elementId')
        const ele = document.getElementById(data)
        ele.classList.add('margin-fix')
        event.target.appendChild(ele)
        event.target.style.minHeight = targetHeight + 'px'
      }
    },
    enterDrag (event) {
      if (event.target.id.split('_')[0] === this.$t('HelloWorld.drop-target-label')) {
        event.preventDefault()
        event.target.classList.add('highlight-element')
      }
    },
    leaveDrag (event) {
      if (event.target.id.split('_')[0] === this.$t('HelloWorld.drop-target-label')) {
        event.preventDefault()
        this.resetStyles(event)
      }
    },
    resetStyles (event) {
      const isClassPresent = event.target.classList
        .contains('highlight-element')
      if (isClassPresent) {
        event.target.classList.remove('highlight-element')
      }
    },
    fetchData () {
      return axios
        .get('https://vuejs-drag-drop.firebaseio.com/items.json')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container, .drop-container {
    display: flex;
    flex-wrap: wrap;
  }
  .list-container, .drop-container {
    padding: 24px;
    margin: 24px;
    border: 1px solid gray;
    background: url('./../assets/container_bg.png');
    box-shadow: 1px 2px 19px #379040;
  }
  .list-container {
    flex: 1;
    height: 365px;
    overflow-y: scroll;
  }
  .column {
    flex: 1;
  }
  .drop-class {
    min-height: 52px;
    border: 1px solid;
    width: inherit;
    margin-right: 12px;
    margin-left: 12px;
  }
  .column-name {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
  }
  .m-bottom-24 {
    margin-bottom: 24px
  }
  .token {
    min-height: 32px;
    padding: 12px;
    border: 1px solid gray;
    cursor: move;
    font-size: 1.5em;
    color: wheat;
    border-radius: 24px;
    background: url(/img/background_img.e1fab410.jpg);
    box-shadow: 3px 6px 4px #888888;
  }
  .margin-fix {
    margin-top: 12px;
    margin-left: 8px;
    margin-right: 8px;
  }
  .highlight-element {
    border: 3px dotted red;
    transform: scale(1.1);
  }
</style>
