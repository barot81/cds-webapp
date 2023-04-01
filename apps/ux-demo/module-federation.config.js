module.exports = {
  name: 'ux-demo',
  exposes: {
    './UxDemoModule':'apps/ux-demo/src/app/remote-entry/ux-demo.module.ts',
    './UIModule':'apps/ux-demo/src/app/ui/ui.module.ts'
  },
};
