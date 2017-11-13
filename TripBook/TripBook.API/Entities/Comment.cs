using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;

namespace TripBook.API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime Date { get; set; }
        public int PlaceId { get; set; }
        public Place Place { get; set; }
    }
}
