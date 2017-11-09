using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripBook.API.Models
{
    public class PlaceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
    }
}
