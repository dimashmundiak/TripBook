namespace TripBook.API.Entities
{
    public class UserPlace
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public int PlaceId { get; set; }
        public Place Place { get; set; }
    }
}
