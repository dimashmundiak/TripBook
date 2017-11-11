using System.Collections.Generic;
using TripBook.API.Entities;

namespace TripBook.API.Models
{
    public class CountryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double Rating { get; set; }
        public IEnumerable<CityDto> Cities { get; set; }
    }
}
