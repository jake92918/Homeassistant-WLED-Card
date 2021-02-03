const defaultState = {
  fx: 0,
  brightness: 0,
  primColor: '#fffff',
  fastLEDPalette: 0,
  fxSpeed: 0,
  fxIntensity: 0,
}

const effects = [{label:"Solid",value:0,secondaryColor:false,fastLED:false},{label:"Blink",value:1,secondaryColor:true},{label:"Breath",value:2,secondaryColor:false},{label:"Wipe",value:3},{label:"Wipe Random",value:4,primaryColor:false,secondaryColor:false},{label:"Random Colors",value:5,primaryColor:false,secondaryColor:false},{label:"Sweep",value:6},{label:"Dynamic",value:7,primaryColor:false,secondaryColor:false},{label:"Colorloop",value:8,primaryColor:false,secondaryColor:false},{label:"Rainbow",value:9,primaryColor:false,secondaryColor:false},{label:"Scan",value:10},{label:"Dual Scan",value:11},{label:"Fade",value:12},{label:"Theater",value:13},{label:"Theater Rainbow",value:14},{label:"Running",value:15,secondaryColor:false},{label:"Saw",value:16},{label:"Twinkle",value:17},{label:"Dissolve",value:18},{label:"Dissolve Rnd",value:19},{label:"Sparkle",value:20},{label:"Dark Sparkle",value:21},{label:"Sparkle+",value:22},{label:"Strobe",value:23},{label:"Strobe Rainbow",value:24},{label:"Mega Strobe",value:25},{label:"Blink Rainbow",value:26},{label:"Android",value:27},{label:"Chase",value:28},{label:"Chase Random",value:29},{label:"Chase Rainbow",value:30,secondaryColor:false},{label:"Chase Flash",value:31},{label:"Chase Flash Rnd",value:32},{label:"Rainbow Runner",value:33},{label:"Colorful",value:34,secondaryColor:false,primaryColor:false},{label:"Traffic Light",value:35,secondaryColor:false,primaryColor:false},{label:"Sweep Random",value:36,secondaryColor:false,primaryColor:false},{label:"Running 2",value:37},{label:"Red & Blue",value:38,secondaryColor:false,primaryColor:false},{label:"Stream",value:39,secondaryColor:false,primaryColor:false},{label:"Scanner",value:40},{label:"Lighthouse",value:41},{label:"Fireworks",value:42},{label:"Rain",value:43},{label:"Merry Christmas",value:44},{label:"Fire Flicker",value:45},{label:"Gradient",value:46},{label:"Loading",value:47},{label:"Police",value:48},{label:"Police All",value:49},{label:"Two Dots",value:50},{label:"Two Areas",value:51},{label:"Circus",value:52},{label:"Halloween",value:53},{label:"Tri Chase",value:54},{label:"Tri Wipe",value:55},{label:"Tri Fade",value:56},{label:"Lighting",value:57},{label:"ICU",value:58},{label:"Multi Comet",value:59},{label:"Dual Scanner",value:60},{label:"Stream 2",value:61},{label:"Oscillate",value:62},{label:"Pride 2015",value:63},{label:"Juggle",value:64},{label:"Palette",value:65},{label:"Fire 2012",value:66},{label:"Colorwaves",value:67},{label:"BPM",value:68},{label:"Fill Noise",value:69},{label:"Noise 1",value:70},{label:"Noise 2",value:71},{label:"Noise 3",value:72},{label:"Noise 4",value:73},{label:"Colortwinkle",value:74},{label:"Lake",value:75},{label:"Meteor",value:76},{label:"Smooth Meteor",value:77},{label:"Railway",value:78},{label:"Ripple",value:79},{label:"Twinklefox",value:80},{label:"Twinklecat",value:81},{label:"Halloween Eyes",value:82},{label:"Solid Pattern",value:83},{label:"Solid Pattern Tri",value:84},{label:"Spots",value:85},{label:"Spots Fade",value:86},{label:"Glitter",value:87},{label:"Candle",value:88},{label:"Fireworks Starburst",value:89},{label:"Fireworks 1D",value:90},{label:"Bouncing Balls",value:91},{label:"Sinelon",value:92},{label:"Sinelon Dual",value:93},{label:"Sinelon Rainbow",value:94},{label:"Popcorn",value:95},{label:"Drip",value:96},{label:"Plasma",value:97},{label:"Percent",value:98},{label:"Ripple Rainbow",value:99},{label:"Heartbeat",value:100},{label:"Pacifica",value:101},{label:"Candle Multi",value:102},{label:"Solid Glitter",value:103},{label:"Sunrise",value:104},{label:"Phased",value:105},{label:"Twinkle Up",value:106},{label:"Noise Pal",value:107},{label:"Sinewave",value:108},{label:"Phased Noise",value:109},{label:"Flow",value:110}]

const fastLEDPalette =[{label:"Default",value:0},{label:"Random Cycle",value:1},{label:"Primary Color",value:2},{label:"Based on Primary",value:3},{label:"Set Colors",value:4},{label:"Based on Set Colors",value:5},{label:"Party",value:6},{label:"Cloud",value:7},{label:"Lava",value:8},{label:"Ocean",value:9},{label:"Forest",value:10},{label:"Rainbow",value:11},{label:"Rainbow bands",value:12},{label:"Sunset",value:13},{label:"Rivendell",value:14},{label:"Breeze",value:15},{label:"Red & Blue",value:16},{label:"Yellowout",value:17},{label:"Analogous",value:18},{label:"Splash",value:19},{label:"Pastel",value:20},{label:"Sunset 2",value:21},{label:"Beech",value:22},{label:"Vintage",value:23},{label:"Departure",value:24},{label:"Landscape",value:25},{label:"Beach",value:26},{label:"Sherbet",value:27},{label:"Hult",value:28},{label:"Hult64",value:29},{label:"Drywet",value:30},{label:"Jul",value:31},{label:"Grintage",value:32},{label:"Rewhi",value:33},{label:"Tertiary",value:34},{label:"Fire",value:35},{label:"Icefire",value:36},{label:"Cyane",value:37},{label:"Light Pink",value:38},{label:"Autumn",value:39},{label:"Magenta",value:40},{label:"Magred",value:41},{label:"Yelmag",value:42},{label:"Yelblu",value:43},{label:"Orange & Teal",value:44},{label:"Tiamat",value:45},{label:"April Night",value:46},{label:"Orangery",value:47},{label:"C9",value:48},{label:"Sakura",value:49},{label:"Aurora",value:50}]


class ContentCardExample extends HTMLElement {

  set hass(hass) {
    const self = this

    this.instance = hass
    if (!this.content) {

      var script1 = document.createElement('script');
      script1.setAttribute('src','https://cdn.jsdelivr.net/npm/@jaames/iro@5');
      document.head.appendChild(script1);

      var script2 = document.createElement('script');
      script2.setAttribute('src','https://cdn.jsdelivr.net/npm/tingle.js@0.15.3/dist/tingle.min.js');
      document.head.appendChild(script2);

      this.content = document.createElement('div');
      this.showLoadingState()
      fetch(`http://${this.config.ip}/win`, {
          headers: {},
          mode: 'cors',
        }).then(res => {
          return res.text()
        }).then(res => {
          const xmlDoc = (new DOMParser()).parseFromString(res, "text/xml")
          const primColor = {
            r: Number(xmlDoc.getElementsByTagName('cl')[0].innerHTML),
            g: Number(xmlDoc.getElementsByTagName('cl')[1].innerHTML),
            b: Number(xmlDoc.getElementsByTagName('cl')[2].innerHTML)
          }

          const secColor = {
            r: Number(xmlDoc.getElementsByTagName('cs')[0].innerHTML),
            g: Number(xmlDoc.getElementsByTagName('cs')[1].innerHTML),
            b: Number(xmlDoc.getElementsByTagName('cs')[2].innerHTML)
          }

          function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
          }

          self.state = {
            fx: Number(xmlDoc.getElementsByTagName('fx')[0].innerHTML),
            brightness: xmlDoc.getElementsByTagName('ac')[0].innerHTML,
            primColor: rgbToHex(primColor.r, primColor.g, primColor.b),
            secColor: rgbToHex(secColor.r, secColor.g, secColor.b),
            fxSpeed: xmlDoc.getElementsByTagName('sx')[0].innerHTML,
            fxIntensity: xmlDoc.getElementsByTagName('ix')[0].innerHTML,
            fastLEDPalette: Number(xmlDoc.getElementsByTagName('fp')[0].innerHTML)
          }
          self.initContent()
        })
        .catch((err) => {
          self.state = defaultState
          console.warn('Could not fetch data,', err)
          self.initContent()
        })
    }
  }

  showLoadingState() {
    const card = document.createElement('ha-card');
    card.header = this.config.title;
    const loadingWrapper = document.createElement('div')
    loadingWrapper.innerHTML = 'Loading...'
    loadingWrapper.id = 'loadingWrapper'
    this.content.append(loadingWrapper)
    card.append(this.content)
  }

  initCardStyle() {
    const el = document.createElement('style')
    el.innerHTML = `
      button {
        background: none;
        padding: 10px;
        margin: 5px;
        cursor: pointer;
        border: 3px solid #2c3e50;
        color: #2c3e50;
        font-weight: 600;
      }

      svg {
        cursor: pointer;
      }
    `

    return el
  }

  initContent() {
    const self = this
    const result = this.state
    this.initModal(result)
    const card = document.createElement('ha-card');
    card.header = this.config.title;
    //clear loading
    this.content = document.createElement('div');
    this.content.style.padding = '0 16px 16px';
    this.content.className = 'card'
    card.append(this.initCardStyle())
    this.appendChild(card);
    card.append(this.content);
    this.content.append(this.initCardContent())

    const title = this.config.title
  }

  initCardContent() {
    const self = this
    const el = document.createElement('div')

    this.lampIcon = document.createElement('div')
    this.lampIcon.style.display = 'flex';
    this.lampIcon.style.justifyContent = 'center'

    this.updateOnState(self)

    this.lampIcon.onclick = function () {
      const brightnessSlider = self.brightnessSlider.querySelector('input')
      if (self.state.brightness == 0) {
        //on
        self.state.brightness = 127
        brightnessSlider.value = 127
      } else {
        //off
        self.state.brightness = 0
        brightnessSlider.value = 0
      }
      self.updateOnState(self)
      self.mqttPublish("T")
    }

    const detailsButton = document.createElement('button')
    detailsButton.innerHTML = 'Open Details'

    detailsButton.addEventListener('click', function () {
      self.modal.open()
    })

    el.append(this.lampIcon)
    el.append(detailsButton)

    return el
  }

  updateOnState (self){
    const lampOn = `
    <svg id="lamp123" style="height: 10vh" viewBox="0 0 24 24">
      <path  fill="#FFEF00" d="M8,2H16L20,14H4L8,2M11,15H13V20H18V22H6V20H11V15Z" />
    </svg>
    `

    const lampOff = `
    <svg id="lamp123" style="height: 10vh" viewBox="0 0 24 24">
      <path  fill="#2c3e50" d="M8,2H16L20,14H4L8,2M11,15H13V20H18V22H6V20H11V15Z" />
    </svg>
    `
    if (Number(self.state.brightness) > 0) {
      //on
      self.lampIcon.innerHTML = lampOn
    } else {
      //off
      self.lampIcon.innerHTML = lampOff
    }
  }

  initModal() {
    var modal = new tingle.modal({
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: "Close",
      cssClass: ['custom-class-1', 'custom-class-2']
    });

    const content = document.createElement('div')
    const FXSection = this.createFXSection()
    const colorSection = this.createColorSection()
    const brightnessSection = this.initBrightnessSection()

    content.append(brightnessSection)
    content.append(FXSection)
    content.append(colorSection)

    modal.setContent(content);

    this.fxSelect.onchange(null, Number(this.state.fx))

    this.modal = modal
  }

  initBrightnessSection () {
    const self = this

    const section = document.createElement('div')
    const headline = document.createElement('h2')
    headline.innerHTML = 'Color'

    const onChange = function (ev) {
      const value = ev.target.value
      self.mqttPublishAPI(`A=${value}`)
      self.state.brightness = value
      self.updateOnState(self)
    }

    this.brightnessSlider = createSlider(onChange, this.state.brightness, "Master Brightness", 0, 255)

    section.append(this.brightnessSlider)

    return section
  }

  initFXSelect() {
    const self = this
    const onChange = function (ev, effectValue, emitOnChange) {
      let value = effectValue
      if (ev && ev.target.value) {
        value = Number(ev.target.value)
      }
      const effect = effects.find(function (effect) {
        return effect.value === value
      })

      self.state.fx = value

      self.mqttPublishAPI(`FX=${value}`)
      self.changeColorPickerVisibility(effect.primColor, effect.secondaryColor)

      if (effect.fastLED === false) {
        self.fastLedSelectSection.style.display = 'none'
      } else {
        self.fastLedSelectSection.style.display = 'block'
      }

    }

    return this.fxSelect = createSelect(effects, self.state && self.state.fx ? self.state.fx : 0, onChange)
  }

  changeColorPickerVisibility(primVisible, secVisible) {
    if (primVisible === false) {
      this.primColorPicker.style.display = 'none'
    } else {
      this.primColorPicker.style.display = 'block'
    }

    if (secVisible === false) {
      this.secColorPicker.style.display = 'none'
    } else {
      this.secColorPicker.style.display = 'block'
    }
  }

  initFastLEDSelect() {
    const self = this
    const onChange = function (ev, paletteValue) {
      let value = paletteValue
      if (ev && ev.target.value) {
        value = Number(ev.target.value)
      }

      if (value > 5 || value === 1) {
        self.changeColorPickerVisibility(false, false)
      } else {
        self.fxSelect.onchange(null, self.state.fx, false)
      }

      self.state.fastLEDPalette = value

      self.mqttPublishAPI(`FP=${value}`)
    }

    const el = document.createElement('div')
    const headline = document.createElement('h3')
    headline.innerHTML = 'FastLED Palette'
    const fastLedSelect = this.fastLedSelect =
      createSelect(fastLEDPalette, self.state && self.state.fastLEDPalette ? self.state.fastLEDPalette : 0, onChange)
    el.append(headline)
    el.append(fastLedSelect)
    this.fastLedSelectSection = el
    return el
  }

  createColorSection() {
    const section = document.createElement('div')
    const headline = document.createElement('h2')
    headline.innerHTML = 'Color'

    const picker = document.createElement('div')
    picker.style.display = 'flex'
    picker.style.flexWrap = 'wrap'
    const primWrapper = this.primColorPicker = document.createElement('div')
    //primary color
    const primColorPicker = this.createColorPicker("CL=", this.state.primColor)
    const primHeadline = document.createElement('h3')
    primHeadline.innerHTML = 'Primary Color'
    primWrapper.append(primHeadline)
    primWrapper.append(primColorPicker)

    const secWrapper = this.secColorPicker = document.createElement('div')
    //sec color
    const secColorPicker = this.createColorPicker("C2=", this.state.secColor)
    const secHeadline = document.createElement('h3')
    secHeadline.innerHTML = 'Secondary Color'
    secWrapper.append(secHeadline)
    secWrapper.append(secColorPicker)

    const fastLedSelect = this.initFastLEDSelect()

    section.append(headline)
    section.append(fastLedSelect)
    picker.append(primWrapper)
    picker.append(secWrapper)

    section.append(picker)
    return section
  }

  createFXSection() {
    const FXSection = document.createElement('div')

    const FXHeadline = document.createElement('h2')
    FXHeadline.innerHTML = 'Effects'

    const FXSelect = this.initFXSelect()
    const FXSpeedSlider = this.initFXSpeedSlider()
    const FXIntensitySlider = this.initFXIntensitySlider()

    FXSection.append(FXHeadline)
    FXSection.append(FXSelect)
    FXSection.append(FXSpeedSlider)
    FXSection.append(FXIntensitySlider)

    return FXSection
  }

  initFXSpeedSlider() {
    const self = this
    const onChange = function (ev) {
      const value = ev.target.value
      self.mqttPublishAPI(`SX=${value}`)
    }

    return createSlider(onChange, this.state.fxSpeed, "Effect speed", 0, 255)
  }

  initFXIntensitySlider() {
    const self = this
    const onChange = function (ev) {
      const value = ev.target.value
      self.mqttPublishAPI(`IX=${value}`)
    }

    return createSlider(onChange, this.state.fxIntensity, "Effect intensity", 0, 255)
  }

  createColorPicker(api, initColor) {
    const el = document.createElement('div')
    var colorPicker = new iro.ColorPicker(el, {
      height: 200,
      padding: 0,
      color: initColor
    });
    const self = this
    colorPicker.on("color:change", function (event) {
      const rgb = event.rgb
      self.mqttPublishAPI(api + event.hexString)
    })
    return el
  }


  //API Calls

  mqttPublishAPI(payload) {
    this.mqttPublish(payload, this.config.topic + '/api')
  }

  mqttPublish(payload, topic = this.config.topic) {
    this.instance.callService('mqtt', 'publish', {
      topic,
      payload
    })
  }

  setConfig(config) {
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 2;
  }
}


function createSlider(onChange, value = 0, headline, min = 0, max = 255) {
  const wrap = document.createElement('div')
  if (headline) {
    const hEl = document.createElement('h3')
    hEl.innerHTML = headline
    wrap.append(hEl)
  }
  const el = document.createElement('input')
  el.style.display = "block"
  el.type = 'range'
  el.min = min
  el.max = max
  el.value = value
  el.addEventListener('change', onChange)
  wrap.append(el)
  return wrap
}

function createSelect(options, selectedValue, onChange) {
  const el = document.createElement('select')
  options.forEach(function (item) {
    const option = document.createElement('option')
    option.selected = item.value === selectedValue
    option.innerHTML = item.label
    option.value = item.value
    el.append(option)
  })

  el.onchange = onChange
  return el
}

customElements.define('wled-control-card', ContentCardExample);
