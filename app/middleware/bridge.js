import fetch from "isomorphic-fetch"
import Translation from "../models/translation"


export function getChannels() {
  fetch(`https://bridge-api.meedan.com:443/api/projects/${process.env.BRIDGE_PROJECT}/channels`, {
    method : "get",
    headers : {
      "Authorization" : `Token token=${ process.env.BRIDGE_KEY }`
    }
  }).then(res => res.json()).then(res => console.log(res))
}


export function fetchTranslations(channel = "tundin-test-project-general") {
  fetch(`https://bridge-api.meedan.com/api/translations?channel_uuid=${channel}`, {
    method : "get",
    headers : {
      "Authorization" : `Token token=${ process.env.BRIDGE_KEY }`
    }
  }).then(res => res.json()).then(res => {
    res.data.map( translation => {
      Translation.create({
        author: "twitter|" + translation.author.id, //TODO: fix (check auth0? big hassel) this shit pronto
        _id: translation.id,
        source: translation.post_uuid,
        text: translation.text,
        lang: {
          to: translation.lang,
          from: translation.source.lang
        },
        published: {
          translation: translation.published * 1000, //Date comes in as seconds -- needs to be ms
          source: translation.source.published * 1000
        }
      }, function(err, translation) {
        if (err){
          return err

        }
        console.log(translation);
      })
    })

  })
}


// TODO: error handle
