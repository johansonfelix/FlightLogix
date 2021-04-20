package com.FlightLogix.Repository;

import com.FlightLogix.Core.Booking.FlightData;
import com.FlightLogix.Core.Booking.Search;
import com.FlightLogix.Core.Flight.*;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.enterprise.context.ApplicationScoped;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Logger;

@ApplicationScoped
public class AmadeusAPICaller {
    private static AmadeusAPICaller amadeusAPICaller = new AmadeusAPICaller();
    private static Logger logger;

    {
        logger = Logger.getLogger(AmadeusAPICaller.class.getName());
    }

    private URL tokenGenerationURL, flightSearchURL;
    private String authToken;
    private Instant tokenTime;
    public enum ResponseCode {
        UNKNOWN_ERROR
    }

    {
        try {

            flightSearchURL = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
            tokenGenerationURL = new URL("https://test.api.amadeus.com/v1/security/oauth2/token");
            authToken = getAccessToken();
            System.out.println("TOKEN->" + authToken);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    private String encode(Map<String, String> params) {
        Iterator it = params.entrySet().iterator();
        String encodedString = "";
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            encodedString += pair.getKey() + "=" + pair.getValue();
            if (it.hasNext()) {
                encodedString += "&";
            }
        }

        return encodedString;
    }

    private AmadeusAPICaller() {

    }

    public String getAccessToken() {
        if(!tokenGood()) {

            Map<String, String> requestParams = new HashMap<>();
            requestParams.put("client_id", "h0W7qgvuYTEaybUw9hqxqnJOoxqTlXr4");
            requestParams.put("client_secret", "CJ5mRqbZ6TrxsjJm");
            requestParams.put("grant_type", "client_credentials");
            String encodingString = encode(requestParams);

            HttpURLConnection conn = null;
            try {
                conn = (HttpURLConnection) tokenGenerationURL.openConnection();
            } catch (IOException e) {
                e.printStackTrace();
            }
            if (conn != null) {
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
                    String json = getResponseBody(conn);
                    JSONObject jsonObject = new JSONObject(json);
                    tokenTime = Instant.now();
                    return jsonObject.getString("access_token");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return ResponseCode.UNKNOWN_ERROR.toString();
        }
        return authToken;
    }


    private boolean tokenGood(){
        if(tokenTime == null)
            return false;
        else {
            Instant now = Instant.now();
            Duration elapsed = Duration.between(tokenTime, now);
            return (elapsed.getSeconds()<=1799);


        }
    }
    private String getResponseBody(HttpURLConnection conn) throws IOException {
        BufferedReader br = null;
        String str = "";
        if (conn.getResponseCode() == 200) {
            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String strCurrentLine;
            while ((strCurrentLine = br.readLine()) != null) {

                str += strCurrentLine;
            }
        } else {
            br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            String strCurrentLine;
            while ((strCurrentLine = br.readLine()) != null) {
                str += strCurrentLine;
            }
        }

        return str;

    }

    private Timestamp stringToTimestamp(String timeString) {
        LocalDateTime timeStamp = LocalDateTime.parse(timeString);
        return Timestamp.valueOf(timeStamp);
    }

    private Itinerary parseItinerary(JSONArray itineraries) {
        Itinerary itinerary = new Itinerary();

        if (itineraries.length() > 0) {
            Segment outbound = parseSegment(((JSONObject) itineraries.get(0)).getJSONArray("segments"));
            itinerary.setOutbound(outbound);
            if (itineraries.length() == 1) {
            } else if (itineraries.length() == 2) {
                Segment inbound = parseSegment(((JSONObject) itineraries.get(1)).getJSONArray("segments"));
                itinerary.setInbound(inbound);
            }
        } else {
            System.out.println("No itinerary for flight. Aborting.");
            System.exit(0);
        }
        return itinerary;
    }

    private Flight.FLIGHT_TYPE parseFlightType(JSONArray itineraries) {
        if (itineraries.length() > 0) {
            if (itineraries.length() == 1) {
                return Flight.FLIGHT_TYPE.ONE_WAY;
            } else if (itineraries.length() == 2) {
                return Flight.FLIGHT_TYPE.ROUND_TRIP;
            }
        } else {
            System.out.println("No itinerary for flight. Aborting.");
            System.exit(0);
        }
        return null;
    }

    private Price parsePrice(JSONObject priceObj) {
        Price price = new Price();
        price.setBase(Double.parseDouble(priceObj.getString("base")));
        price.setCurrency(priceObj.getString("currency"));
        price.setTotal(Double.parseDouble(priceObj.getString("total")));
        return price;
    }

    private Segment parseSegment(JSONArray segmentJson) {
        Segment segment = new Segment();
        ArrayList<Leg> legs = new ArrayList<>();
        for (int i = 0; i < segmentJson.length(); i++) {
            legs.add(parseLeg((JSONObject) segmentJson.get(i)));
        }
        segment.setLegs(legs);
        return segment;
    }

    private Leg parseLeg(JSONObject legJson) {
        Leg leg = new Leg();
        leg.setFrom(parseLocation(legJson.getJSONObject("departure")));
        leg.setTo(parseLocation(legJson.getJSONObject("arrival")));
        leg.setCarrierCode(legJson.getString("carrierCode"));
        return leg;
    }

    private Location parseLocation(JSONObject locationJson) {
        Location location = new Location();
        location.setTime(stringToTimestamp(locationJson.getString("at")));
        if (locationJson.has("terminal")) {
            location.setTerminal(locationJson.getString("terminal"));
        } else {
            location.setTerminal("NONE");
        }
        location.setIatacode(locationJson.getString("iataCode"));
        return location;
    }

    private ArrayList<Flight> parseFlights(JSONArray flights) {

        ArrayList<Flight> flightObjects = new ArrayList<>();
        for (int i = 0; i < flights.length(); i++) {
            Flight flightObject = new Flight();
            JSONObject flight = (JSONObject) flights.get(i);
            String flightID = null;
            JSONArray itineraries = (flight.getJSONArray("itineraries"));
            Itinerary itinerary = parseItinerary(itineraries);
            flightObject.setItinerary(itinerary);
            Flight.FLIGHT_TYPE flightType = parseFlightType(itineraries);
            flightObject.setFlightType(flightType);
            Price price = parsePrice(flight.getJSONObject("price"));
            flightObject.setPrice(price);
            flightObjects.add(flightObject);
        }
        return flightObjects;
    }

    public HashMap<String, String> parseCarriers(JSONObject dictionaries) {
        HashMap<String, String> carrierCodes = new HashMap<>();
        JSONObject carriers = dictionaries.getJSONObject("carriers");
        Iterator<String> keys = carriers.keys();
        while (keys.hasNext()) {
            String key = keys.next();
            String value = carriers.getString(key);
            carrierCodes.put(key, value);
        }
        return carrierCodes;
    }

    public FlightData getParsedData(Search search) {
        ArrayList<String> json = new ArrayList<>();
        String data = search(search);
        JSONObject entireJson = new JSONObject(data);
        FlightData flightData = new FlightData();
        flightData.setFlights(parseFlights(entireJson.getJSONArray("data")));
        flightData.setCarrierNames(parseCarriers(entireJson.getJSONObject("dictionaries")));
        return flightData;
    }

    public String search(Search search) {
        Map<String, String> requestParams = new HashMap<>();
        requestParams.put("originLocationCode", search.getOriginLocationCode());
        requestParams.put("destinationLocationCode", search.getDestinationLocationCode());
        requestParams.put("departureDate", search.getDepartureDate());
        if (search.getReturnDate()!=null)
            requestParams.put("returnDate", search.getReturnDate());
        requestParams.put("adults", Integer.toString(search.getNumAdults()));
        requestParams.put("max", Integer.toString(search.getMaxResults()));
        String encodedString = encode(requestParams);

        //Add Custom  Exception
        HttpURLConnection conn = null;
        try {
            conn = (HttpURLConnection) (new URL(flightSearchURL.toString() + "?" + encodedString)).openConnection();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (conn != null) {
            conn.setDoOutput(true);
            try {
                conn.setRequestMethod("GET");
            } catch (ProtocolException e) {
                e.printStackTrace();
            }

            try {
                conn.setRequestProperty("Authorization", "Bearer " + getAccessToken());
                return (getResponseBody(conn));
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return null;
    }

    public static AmadeusAPICaller getInstance() {
        return amadeusAPICaller;
    }

}
