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


export function getTranslations(channel = "tundin-test-project-general") {
  fetch(`https://bridge-api.meedan.com/api/translations?channel_uuid=${channel}`, {
    method : "get",
    headers : {
      "Authorization" : `Token token=${ process.env.BRIDGE_KEY }`
    }
  }).then(res => res.json()).then(res => {
    res.data.map( translation => {
      Translation.create({
        author: "twitter|" + translation.author.id, //TODO: fix this shit pronto
        _id: translation.id,
        embed_url: translation.embed_url,
        published: translation.published
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
