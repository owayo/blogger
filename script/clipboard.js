const clipboard = new ClipboardJS('.copy-button')
Vue.use(Buefy, {
  defaultIconPack: 'fas',
});
Vue.config.productionTip = false;
const clipboardVue = new Vue(
  methods: {
    toast(opt) {
      this.$buefy.toast.open(opt)
    }
  }
);
clipboard.on('success', e => {
  clipboardVue.toast({
    message: 'コピーしました',
    type: 'is-success'
  })
  e.clearSelection()
})