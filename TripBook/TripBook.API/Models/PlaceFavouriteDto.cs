﻿namespace TripBook.API.Models
{
    public class PlaceFavouriteDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
    }
}
