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
    }
  }
  