using System.Collections.Generic;

namespace TripBook.API.Models
{
    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public IEnumerable<PlaceDto> Places { get; set; }
    }
}
