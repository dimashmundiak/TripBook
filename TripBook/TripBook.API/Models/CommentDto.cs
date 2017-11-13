using System;

namespace TripBook.API.Models
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime Date { get; set; }
        public double Rating { get; set; }
    }
}
