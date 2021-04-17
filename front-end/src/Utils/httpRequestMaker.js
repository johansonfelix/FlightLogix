//Returns a JSON in object format. 
module.exports = {
  sendRequest: async function(type, url,token, json){
    console.log("Sending " + type + " request to " + url + " with message: " + json + " Using auth token: " + token)
    var header = {
      'Accept': 'application/json',
    }
    if(token !== null){
      header['Authorization: Bearer'] = token
    }
    if(type === "POST" || type === "PUT"){
      header["Content-Type"] = "application/json"
    }
    try{
      var response = await fetch(url, {
        method: type,
        headers: new Headers(header),
        body: json
      })
      var responseJsonPromise = await response.json()
      var responseJson = Promise.resolve(responseJsonPromise)
      console.log("Received reply: " + JSON.stringify(responseJson))
      return responseJson
    }
    catch(error){
      console.log(error.message)
      return null
    }
  }
}
