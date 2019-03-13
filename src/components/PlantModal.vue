<template>
  <div :class="show ? 'modal is-active' : 'modal'">
    <div class="modal-background" @click="close" />
    <div class="modal-content">
      <div class="box has-text-centered">
        <form>
          <template v-if="mode === 'add'">
            <!-- 追加 -->
            <div class="field">
              <input class="input" type="text" placeholder="観葉植物の名前を入力してください" :value="name" @input="updateInputName">
            </div>
            <div class="field">
              <button class="button is-primary" @click.prevent="addPlant">
                登録
              </button>
              <button class="button" @click.prevent="close">
                キャンセル
              </button>
            </div>
          </template>

          <template v-if="mode === 'edit'">
            <!-- 更新 -->
            <div class="field">
              <input class="input" type="text" :value="name" @input="updateInputName">
            </div>
            <div class="field">
              <button class="button is-primary" @click.prevent="editPlant">
                更新
              </button>
              <button class="button" @click.prevent="close">
                キャンセル
              </button>
            </div>
          </template>

          <template v-if="mode === 'delete'">
            <!-- 削除 -->
            <div class="field">
              <input class="input" type="text" readonly :value="name">
            </div>
            <div class="field">
              <button class="button is-danger" @click.prevent="deletePlant">
                削除
              </button>
              <button class="button" @click.prevent="close">
                キャンセル
              </button>
            </div>
          </template>
        </form>
      </div>
    </div>
    <button class="modal-close is-large" @click="close" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    plantId: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters(['status'])
  },
  watch: {
    plant(value) {
      if (value) {
        this.inputName = value.name
      } else {
        this.inputName = null
      }
    },
    status(value) {
      if (
        value.action !== 'getPlants' &&
        value.status === 'respond-with-success'
      ) {
        this.close(null, true)
      }
    }
  },
  methods: {
    addPlant() {
      this.$store.dispatch('addPlant', {
        name: this.inputName
      })
    },
    editPlant() {
      this.$store.dispatch('editPlant', {
        id: this.plantId,
        name: this.inputName
      })
    },
    deletePlant() {
      this.$store.dispatch('deletePlant', {
        id: this.plantId
      })
    },
    updateInputName(event) {
      this.$emit('change-name', event.target.value)
    },
    close(event, autoClose) {
      this.$emit('close', autoClose)
    }
  }
}
</script>
