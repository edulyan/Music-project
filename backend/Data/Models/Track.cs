using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace backend.Data.Models
{
    public class Track
    {
        [Key]
        public int id { get; set; }

        [Column]
        public string name { get; set; }

        [Column]
        public string artist { get; set; }

        [Column(TypeName ="varchar(300)")] 
        public string text { get; set; }

        [NotMapped]
        public IFormFile pictureFile { get; set; }

        [Column]
        public string pictureSrc {get; set;}
        
        [NotMapped]
        public IFormFile audioFile { get; set; }

        [Column]
        public string audioSrc {get; set;}

        public List<Comment> comments { get; set;}
    }
}