using System.Collections.Generic;

namespace TripBook.API.Entities
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double Rating { get; set; }
        public List<City> Cities { get; set; } = new List<City>();
    }
}
