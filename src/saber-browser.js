import Vue from 'vue'
import nprogress from 'nprogress'
import { siteConfig, themeConfig } from 'saber/config'
import 'nprogress/nprogress.css'
import '#theme/styles/main.less'
// import 'prismjs'
if (process.browser) {
  const iconfont = require('./assets/iconfont/iconfont.js')
  // use Typefaces — making it easier to self-host webfonts.
  const fredericka = require('typeface-fredericka-the-great')
  const indieFlower = require('typeface-indie-flower')
  if (process.env.NODE_ENV === 'production') {
    require('./utils/offline')
  }
}

Vue.mixin({
  computed: {
    $themeConfig() {
      return themeConfig
    },
    $siteConfig() {
      return siteConfig
    }
  }
})

export default ({ router, rootOptions }) => {
  if (process.browser) {
    const loaded = Object.create(null)

    nprogress.configure({ showSpinner: false })

    router.beforeEach((to, from, next) => {
      if (!loaded[to.path]) {
        nprogress.start()
      }
      next()
    })

    router.afterEach(to => {
      loaded[to.path] = true
      nprogress.done()
    })
  }

  rootOptions.head = {
    htmlAttrs: {
      lang: 'zh-CN'
    },
    link: [
      {
        rel: 'alternate',
        title: `${siteConfig.title} - Feed`,
        type: 'application/json',
        href: `${siteConfig.url.replace(/\/$/, '')}/feed.json`
      }
    ]
  }
}
