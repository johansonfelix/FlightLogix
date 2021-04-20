//Returns a JSON in object format. 
module.exports = {
    getOutboundLegs: function(flight){
        return flight.itinerary.outbound.legs
    },
    getFirstOutboundLeg: function(flight){
        let legs = this.getOutboundLegs(flight)
        return legs[0]
    },
    getLastOutboundLeg: function(flight){
        let legs = this.getOutboundLegs(flight)
        return legs[legs.length-1]
    },
    getInboundLegs: function(flight){
        return flight.itinerary.inbound.legs
    },
    getFirstInboundLeg: function(flight){
        let legs = this.getInboundLegs(flight)
        return legs[0]
    },
    getLastInboundLeg: function(flight){
        let legs = this.getInboundLegs(flight)
        return legs[legs.length-1]
    },
    parseDate: function(timestamp){
        return timestamp.split("T")[0]
    },
    parseTime: function(timestamp){
        var garbage = timestamp.split("T")[1]
        return garbage.split("Z")[0]
    }
  }
  