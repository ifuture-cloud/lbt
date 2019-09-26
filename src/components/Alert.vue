<template>
  <div  class="modal modal-bg show" v-show="showAlert">
    <div  class="modal-wrapper" style="">
      <div class="modal-container modal-small">
        <div class="modal-header">
          <button  type="button"
                   class="md-button md-simple md-close md-just-icon md-round modal-default-button md-theme-default">
            <div class="md-ripple">
              <div class="md-button-content"><i  class="md-icon md-icon-font md-theme-default">clear</i>
              </div>
            </div>
          </button>
        </div>
        <div class="modal-body text-center"><h5 >{{message}}</h5></div>
        <div class="modal-footer">
          <div  class="justify-content-center d-flex">
            <button  type="button" class="md-button md-simple md-round md-theme-default">
              <div class="md-ripple">
                <div class="md-button-content">Never Mind</div>
              </div>
            </button>
            <button  type="button" class="md-button md-success md-simple md-theme-default">
              <div class="md-ripple">
                <div class="md-button-content">Yes</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'INFO'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.show = false
    }
  },
  computed: {
    showAlert () {
      return this.show
    }
  }
}
</script>
