<template>
  <div class="form-container">
    <div class="m-bottom-24 heading">Create Name, Animal, Place, Thing</div>
    <form @submit.prevent="FormSubmitted()">
      <div v-if="errors.length" class="m-bottom-24">
        <b>{{$t('InputForm.error-message')}}</b>
        <div>
          <div v-for="error in errors" v-bind:key="error" class="error">
            {{ error }}
          </div>
        </div>
      </div>
      <div v-for="radio in radioButtonList" v-bind:key="radio.radioType"
        class="radio-class m-bottom-24">
        <input type="radio" v-model="item.type" :value="radio.radioType" class="radio-input"/>
        <span class="radio-label">{{radio.label}}</span>
      </div>
      <div class="m-bottom-24">
        <label style="font-size: 1.2em; margin-right: 24px;">
          {{$t('InputForm.input-label')}}
        </label>
        <input type="text" v-model="item.name" class="name-input"
          placeholder="Enter name,place,animal or thing"/>
      </div>
      <button type="button" @click="saveBtnClicked()"
        class="save-button">
        {{$t('InputForm.save-button-label')}}
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'InputForm',
  props: {
    counter: Number
  },
  data () {
    return {
      NAME: 0,
      ANIMAL: 1,
      PLACE: 2,
      THING: 3,
      errors: [],
      radioButtonList: [
        {
          label: this.$t('InputForm.radio-button-name-label'),
          radioType: 0
        },
        {
          label: this.$t('InputForm.radio-button-animal-label'),
          radioType: 1
        },
        {
          label: this.$t('InputForm.radio-button-place-label'),
          radioType: 2
        },
        {
          label: this.$t('InputForm.radio-button-thing-label'),
          radioType: 3
        }
      ],
      item: {
        id: 0,
        name: '',
        type: 0
      }
    }
  },
  watch: {
    type (value) {
      console.log(value)
    }
  },
  methods: {
    FormSubmitted () {
      this.saveBtnClicked()
    },
    saveBtnClicked () {
      this.errors = []
      if (this.item.name === '') {
        this.errors.push(this.$t('InputForm.name-required-error-message'))
        return
      }
      this.item.id = this.counter
      this.$preloaders.open({
        loader: 'myAwesomeLoader'
      })
      axios
        .post('https://vuejs-drag-drop.firebaseio.com/items.json', this.item)
        .then((response) => {
          this.$emit('item-added', response.data.name)
          this.$preloaders.close()
        })
        .catch((error) => {
          console.log(error)
          this.$preloaders.close()
        })
      this.item.name = ''
    }
  }
}
</script>

<style scoped>
  .error {
    color: red
  }
  .form-container {
    padding: 24px;
    margin: 24px;
    border: 1px solid gray;
    flex: 2;
    background: url('./../assets/container_bg.png');
    box-shadow: 1px 2px 19px #379040;
  }
  .m-bottom-24 {
    margin-bottom: 12px
  }
  .radio-input {
    height: 16px;
    width: 16px;
    margin-right: 24px;
  }
  .heading {
    font-size: 1.5em;
  }
  .radio-label {
    font-size: 18px;
  }
  .save-button {
    padding: 16px;
    width: 150px;
    height: 48px;
    background-color: aqua;
    border-radius: 15px;
    border: 1px solid royalblue;
    box-shadow: 3px 6px 4px #888888;
    cursor: pointer;
    outline: none;
  }
  .save-button:hover {
    background-color: #457e7e;
    color: white;
  }
  .name-input {
    width: 60%;
    height: 50px;
    border-radius: 30px;
    border: 1px solid gray;
    outline: none;
    text-align: center;
  }
</style>
