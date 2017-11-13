using System.Collections.Generic;

namespace TripBook.API.Models
{
    public class PlaceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double Rating { get; set; }
        public IEnumerable<CommentDto> Comments { get; set; }
    }
}
