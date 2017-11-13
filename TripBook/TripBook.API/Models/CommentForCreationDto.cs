namespace TripBook.API.Models
{
    public class CommentForCreationDto
    {
        public string Content { get; set; }
        public int PlaceId { get; set; }
        public string Author { get; set; }
        public double Rating { get; set; }
    }
}
