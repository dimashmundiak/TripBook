using System.Collections.Generic;

namespace TripBook.API.Entities
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double Rating { get; set; }
        public int CityId { get; set; }
        public City City { get; set; }
        public List<Comment> Comments { get; set; }
        public List<UserPlace> UserPlaces { get; set; }
    }
}
