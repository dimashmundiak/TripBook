namespace TripBook.API.Entities
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public City City { get; set; }
    }
}
