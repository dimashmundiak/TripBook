using System.Collections.Generic;

namespace TripBook.API.Models
{
    public class UserDto
    {
        public string Id { get; set; }
        public List<PlaceWithoutCommentsDto> Places { get; set; }
    }
}
