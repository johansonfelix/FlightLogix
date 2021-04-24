import jwt_decode from "jwt-decode";

//Returns a JSON in object format. 

export function tokenDecoder(token){

  var decoded = jwt_decode(token)
  
  console.log(decoded)
  
  /* prints:
  * { foo: "bar",
  *   exp: 1393286893,
  *   iat: 1393268893  }
  */
  
  // decode header by passing in options (useful for when you need `kid` to verify a JWT):
  var decodedHeader = jwt_decode(token, { header: true })
  console.log(decodedHeader)
  
  /* prints:
  * { typ: "JWT",
  *   alg: "HS256" }
  */
  return decoded
}

export async function sendRequest(type, url,token, json){
  console.log("Sending " + type + " request to " + url + " with message: " + json + " Using auth token: " + token)
  var header = {
    Accept: "application/json"

  }
  if(token !== null){
    header["Authorization"] = "Bearer " + token
  }
  if(type === "POST" || type === "PUT"){
    header["Content-Type"] = "application/json"
  }
  var request = {
    method: type,
    headers: header,
    body: json
  }
  console.log("Sending request: ")
  console.log(JSON.stringify(request))
  try{
    var promise = await fetch(url, request)
    console.log(promise);
    return promise
    
    // var responseJsonPromise = await response.json()
    // var responseJson = await responseJsonPromise;
    // console.log("Received reply: " + JSON.stringify(responseJson))
    // return responseJson //json object (non-string)
  }
  catch(error){
    console.log(error.message)
    return null
  }
}
  
