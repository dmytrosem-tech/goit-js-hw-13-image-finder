import axios from 'axios';
export default function fEvents() {
  return axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=GcvUr561HaBI30kU58PhKSa9RWqvwjKx`,
    ).then(r => r.data._embedded.events)
    
}

