import App from './components/app.component.svelte'

const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
})

export default app
