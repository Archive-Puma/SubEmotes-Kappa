const INTERVAL = 10

const EMOTES = {
  'jarco2DAB': '923095',
  'mayiMappa': '129760',
  'mortmoGOD': '1067692',
  'peibCC': '152479',
  'peibC': '496311',
  'suraeiHAPPY': '835346',
  'thekar2AH': '1073736'
}


function insertText (txt) {
  let span = document.createElement('span')
  span.setAttribute('data-a-target', 'chat-message-text')
  span.textContent = txt

  return span
}

function insertEmote (alt) {
  let span = document.createElement('span')
  span.setAttribute('data-a-target', 'emote-name')

  let img = document.createElement('img')
  img.setAttribute('class', 'chat-image chat-line__message--emote tw-inline-block')
  img.setAttribute('src', `https://static-cdn.jtvnw.net/emoticons/v1/${EMOTES[alt]}/1.0`)
  img.setAttribute('srcset', `https://static-cdn.jtvnw.net/emoticons/v1/${EMOTES[alt]}/1.0 1x,https://static-cdn.jtvnw.net/emoticons/v1/${EMOTES[alt]}/2.0 2x,https://static-cdn.jtvnw.net/emoticons/v1/${EMOTES[alt]}/3.0 4x`)
  img.setAttribute('alt', alt)

  span.appendChild(img)

  return span
}

function createNewContent (txt, alt) {
  const splitted = txt.replace(new RegExp(alt, 'g'), '|ñ|').split('|ñ|')
  let msg = []
  for (let i = 0; i < splitted.length; i++) {
    msg.push(insertText(splitted[i]))
    if (i !== splitted.length - 1) {
      msg.push(insertEmote(alt))
    }
  }

  return msg
}

// insert y after x
// x.parentNode.insertBefore(y, x.nextSibling)

function main () {
  const CHAT = document.querySelectorAll('span[data-a-target="chat-message-text"]')

  for (let msg of CHAT) {
    for (let emote in EMOTES) {
      if (msg.textContent.includes(emote)) {
        if (msg.parentElement !== null) {
          let newContent = createNewContent(msg.textContent, emote)
          for (let i = newContent.length - 1; i > 0; i--) {
            msg.insertAdjacentElement('afterend', newContent[i])
          }
          msg.parentElement.replaceChild(newContent[0], msg)
        }
      }
    }
  }
}

console.log('Addon loaded!')

setInterval(main, INTERVAL)
