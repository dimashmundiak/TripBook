using System;
using System.Collections.Generic;

namespace TripBook.API.Entities
{
    public class User
    {
        public string Id { get; set; }
        public List<Place> Places { get; set; }
    }
}
