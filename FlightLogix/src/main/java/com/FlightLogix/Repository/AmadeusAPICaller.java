package com.FlightLogix.Repository;

import com.FlightLogix.Core.Flight.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class AmadeusAPICaller {
    private static AmadeusAPICaller amadeusAPICaller = new AmadeusAPICaller();

    private  URL tokenGenerationURL, flightSearchURL;
    private String authToken;
    public enum ResponseCode{
        UNKNOWN_ERROR
    }

    {
        try {

            flightSearchURL = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
            tokenGenerationURL = new URL("https://test.api.amadeus.com/v1/security/oauth2/token");
            authToken = getAccessToken();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }
    private String encode(Map<String,String> params){
        Iterator it = params.entrySet().iterator();
        String encodedString = "?";
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry)it.next();
            encodedString += pair.getKey() + "=" + pair.getValue();
            if(it.hasNext()){
                encodedString += "&";
            }
        }
        return encodedString;
    }
    private AmadeusAPICaller(){

    }
    public String getAccessToken(){
        Map<String, String> requestParams = new HashMap<>();
        requestParams.put("client_id", "h0W7qgvuYTEaybUw9hqxqnJOoxqTlXr4");
        requestParams.put("client_secret", "CJ5mRqbZ6TrxsjJm");
        requestParams.put("grant_type", "client_credentials");
        String encodingString = encode(requestParams);
        HttpURLConnection conn= null;
        try {
            conn = (HttpURLConnection) tokenGenerationURL.openConnection();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(conn != null) {
            conn.setDoOutput(true);
            try {
                conn.setRequestMethod("POST");
            } catch (ProtocolException e) {
                e.printStackTrace();
            }
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("charset", "utf-8");
            conn.setRequestProperty("Content-Length", Integer.toString(encodingString.length()));
            conn.setUseCaches(false);
            try (DataOutputStream wr = new DataOutputStream(conn.getOutputStream())) {
                wr.write(encodingString.getBytes(StandardCharsets.UTF_8));
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                return conn.getResponseMessage();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ResponseCode.UNKNOWN_ERROR.toString();
    }
    private JSONArray getJSONArray(JSONObject jsonObject){
        Iterator x = jsonObject.keys();
        JSONArray jsonArray = new JSONArray();
        while (x.hasNext()){
            String key = (String) x.next();
            jsonArray.put(jsonObject.get(key));
        }
        return jsonArray;
    }
    private Timestamp stringToTimestamp(String timeString){
        /* TO DO */
        return Timestamp.valueOf(timeString);

    }
    private Itinerary parseItinerary(JSONArray itineraries){
        Itinerary itinerary = new Itinerary();
        if(itineraries.length() > 0){
            Segment outbound = parseSegment(getJSONArray(itineraries.getJSONObject(0)));
            itinerary.setOutbound(outbound);
            if(itineraries.length() == 1){
            }
            else if(itineraries.length() == 2){
                Segment inbound = parseSegment(getJSONArray(itineraries.getJSONObject(1)));
                itinerary.setInbound(inbound);
            }
        }
        else{
            System.out.println("No itinerary for flight. Aborting.");
            System.exit(0);
        }
        return null;
    }
    private Flight.FLIGHT_TYPE parseFlightType(JSONArray itineraries){
        if(itineraries.length() > 0){
            if(itineraries.length() == 1){
                return Flight.FLIGHT_TYPE.ONE_WAY;
            }
            else if(itineraries.length() == 2){
                return Flight.FLIGHT_TYPE.ROUND_TRIP;
            }
        }
        else{
            System.out.println("No itinerary for flight. Aborting.");
            System.exit(0);
        }
        return null;
    }
    private Price parsePrice(JSONObject priceObj){
        Price price = new Price();
        price.setBase(Double.parseDouble(priceObj.getString("base")));
        price.setCurrency(priceObj.getString("currency"));
        price.setTotal(Double.parseDouble(priceObj.getString("total")));
        return price;
    }
    private Segment parseSegment(JSONArray segmentJson){
        Segment segment = new Segment();
        ArrayList<Leg> legs = new ArrayList<>();
        for(int i = 0; i < segmentJson.length(); i++){
            legs.add(parseLeg((JSONObject) segmentJson.get(i)));
        }
        return segment;
    }
    private Leg parseLeg(JSONObject legJson){
        Leg leg = new Leg();
        leg.setFrom(parseLocation(legJson.getJSONObject("departure")));
        leg.setTo(parseLocation(legJson.getJSONObject("arrival")));
        leg.setCarrierCode(legJson.getString("carrierCode"));
        return leg;
    }
    private Location parseLocation(JSONObject locationJson){
        Location location = new Location();
        location.setTime(stringToTimestamp(locationJson.getString("at")));
        location.setTerminal(locationJson.getString("terminal"));
        location.setIatacode(locationJson.getString("iataCode"));
        return location;
    }
    private ArrayList<Flight> parseFlights(String jsonFlightListString) {
        ArrayList<Flight> flightObjects = new ArrayList<>();
        JSONArray flights = getJSONArray(new JSONObject(jsonFlightListString).getJSONObject("data"));
        for (int i = 0; i < flights.length(); i++) {
            Flight flightObject = new Flight();
            JSONObject flight = (JSONObject) flights.get(i);
            String flightID = null;
            JSONArray itineraries = getJSONArray(flight.getJSONObject("itineraries"));
            Itinerary itinerary = parseItinerary(itineraries);
            flightObject.setItinerary(itinerary);
            Flight.FLIGHT_TYPE flightType = parseFlightType(itineraries);
            flightObject.setFlightType(flightType);
            Price price = parsePrice(flight);
            flightObject.setPrice(price);
            flightObjects.add(flightObject);
        }
        return flightObjects;
    }
    public ArrayList<Flight> getFlightList(String originLocationCode, String destinationLocationCode, String departureDate, String returnDate,int numAdults, int maxResults){
        Map<String, String> requestParams = new HashMap<>();
        requestParams.put("originLocationCode", originLocationCode);
        requestParams.put("destinationLocationCode", destinationLocationCode);
        requestParams.put("departureDate", departureDate);
        requestParams.put("returnDate", returnDate);
        requestParams.put("adults", Integer.toString(numAdults));
        requestParams.put("max", Integer.toString(maxResults));
        String encodedString = encode(requestParams);

        HttpURLConnection conn= null;
        try {
            conn = (HttpURLConnection) (new URL(flightSearchURL.toString() + encodedString)).openConnection();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if(conn != null) {
            conn.setDoOutput(true);
            try {
                conn.setRequestMethod("GET");
            } catch (ProtocolException e) {
                e.printStackTrace();
            }

            try {
                return parseFlights(conn.getResponseMessage());
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return null;

    }

    public static AmadeusAPICaller getInstance(){
        return amadeusAPICaller;
    }

}
