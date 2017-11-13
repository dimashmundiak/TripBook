using System.Collections.Generic;

namespace TripBook.API.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double Rating { get; set; }
        public int CountryId { get; set; }
        public Country Country { get; set; }
        public List<Place> Places { get; set; } = new List<Place>();
    }
}
