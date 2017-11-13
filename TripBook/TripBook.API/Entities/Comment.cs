using System;

namespace TripBook.API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime Date { get; set; }
        public double Rating { get; set; }
        public int PlaceId { get; set; }
        public Place Place { get; set; }
    }
}
