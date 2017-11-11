namespace TripBook.API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int PlaceId { get; set; }
        public Place Place { get; set; }
    }
}
