<template>
  <div :class="show ? 'modal is-active' : 'modal'">
    <div class="modal-background" @click="close" />
    <div class="modal-content">
      <div class="box has-text-centered">
        <form>
          <template v-if="mode === 'add'">
            <!-- 追加 -->
            <div class="field">
              <input
                class="input"
                type="text"
                placeholder="観葉植物の名前を入力してください"
                :disabled="loading"
                :value="inputName"
                @input="updateInputName"
              >
            </div>
            <div v-if="error" class="field">
              <p class="has-text-danger">
                {{ error }}
              </p>
            </div>
            <div class="field">
              <button :class="'button is-primary' + (loading ? ' is-loading' : '')" @click.prevent="addPlant">
                登録
              </button>
              <button class="button" :disabled="loading" @click.prevent="close">
                キャンセル
              </button>
            </div>
          </template>

          <template v-if="mode === 'edit'">
            <!-- 更新 -->
            <div class="field">
              <input
                class="input"
                type="text"
                :disabled="loading"
                :value="inputName"
                @input="updateInputName"
              >
            </div>
            <div v-if="error" class="field">
              <p class="has-text-danger">
                {{ error }}
              </p>
            </div>
            <div class="field">
              <button :class="'button is-primary' + (loading ? ' is-loading' : '')" @click.prevent="editPlant">
                更新
              </button>
              <button class="button" :disabled="loading" @click.prevent="close">
                キャンセル
              </button>
            </div>
          </template>

          <template v-if="mode === 'delete'">
            <!-- 削除 -->
            <p class="has-text-danger">
              この操作は元に戻せません。本当にこの植物を削除しますか？
            </p>
            <div class="field">
              <input
                class="input"
                type="text"
                readonly
                :disabled="loading"
                :value="inputName"
              >
            </div>
            <div v-if="error" class="field">
              <p class="has-text-danger">
                {{ error }}
              </p>
            </div>
            <div class="field">
              <button :class="'button is-danger' + (loading ? ' is-loading' : '')" @click.prevent="deletePlant">
                削除
              </button>
              <button class="button" :disabled="loading" @click.prevent="close">
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
  data: () => ({
    inputName: null,
    loading: false,
    error: null
  }),
  computed: {
    ...mapGetters(['status'])
  },
  watch: {
    status(value) {
      if (value.action === 'getPlants') {
        // Do nothing
      } else if (value.state === 'retrieving') {
        this.loading = true
      } else if (value.state === 'respond-with-success') {
        this.close(null, true)
        this.loading = false
      } else {
        this.error = value.error
        this.loading = false
      }
    }
  },
  mounted() {
    if (this.mode === 'add') {
      this.inputName = null
    } else {
      this.inputName = this.name
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
      this.inputName = event.target.value
    },
    close(event, autoClose) {
      this.error = null
      this.$emit('close', autoClose)
    }
  }
}
</script>
