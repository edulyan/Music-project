using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Data.Models
{
    public class Comment
    {
        [Key]
        public int id { get; set; }

        [Column]
        [FromForm]
        public string username { get; set; }

        [Column(TypeName ="varchar(300)")]
        [FromForm]
        public string text { get; set; }

        [ForeignKey("Track")]
        public int? trackId { get; set; }

        [JsonIgnore]
        public Track tracks { get; set; }
        
    }
}