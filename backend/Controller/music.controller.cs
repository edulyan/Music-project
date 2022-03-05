using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using backend.Data.Models;

namespace backend.Music.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TrackController : ControllerBase {

        private readonly MusicDbContext _context;
        private readonly IWebHostEnvironment env;

        public TrackController(MusicDbContext context, IWebHostEnvironment env) {
            _context = context;
            this.env = env;
        }

        // GET: api/Track
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Track>>> getAllTrack()
        {
            return await _context.Tracks.Include(c => c.comments).ToArrayAsync();
        }

        // Get: api/Track/3
        [HttpGet("{id}")]
        public async Task<ActionResult<Track>> getOneTrack(int id)
        {
            var track = await _context.Tracks.FindAsync(id);
            if (track == null)
            {
                return NotFound();
            }

            return track;
        }

        [Route("/comments/track/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> getAllCommentByTrack(int id)
        {
            return await _context.Comments.Where(x => x.trackId == id).ToListAsync();
        }

        // GET: api/Track/search/Веселящий газ
        [Route("/search")]
        [HttpGet]
        public ActionResult<IEnumerable<Track>> search([FromQuery]string name)
        {
            return _context.Tracks.Where(x => x.name.Contains(name)).ToList();
        }

        // POST: api/Track
        [HttpPost]
        [Produces("application/json")]
        // [Consumes("application/json")]
        // [Consumes("application/x-www-form-urlencoded")]
        public async Task<ActionResult<Track>> create([FromForm] Track track, IFormFile PictureFile, IFormFile AudioFile)
        {

            if(AudioFile != null) {
                var AudioName = GetUniqueFileName(AudioFile.FileName);

                var uploads = Path.Combine(env.WebRootPath, "audio");

                var filePath = Path.Combine(uploads, AudioName);

                AudioFile.CopyTo(new FileStream(filePath, FileMode.Create));

                track.audioSrc = "audio" + '/' + AudioName;
            }

            if(PictureFile != null) {
                var PictureName = GetUniqueFileName(PictureFile.FileName);

                var uploads = Path.Combine(env.WebRootPath, "picture");

                var filePath = Path.Combine(uploads, PictureName);

                PictureFile.CopyTo(new FileStream(filePath, FileMode.Create));

                track.pictureSrc = "picture" + '/' + PictureName;
            }

             _context.Tracks.Add(track);
            await _context.SaveChangesAsync();

            return CreatedAtAction("getOneTrack", new { id = track.id }, track);
           
        }

        // POST: addComment/3/Track
        [Route("/addComment/{id}/Track")]
        [HttpPost]
        public async Task<ActionResult<Track>> addComment (int id, [FromForm] Comment comment)
        {
            var findTrack = await _context.Tracks.FindAsync(id);

            if(findTrack == null) { 
                return NotFound(); 
            }

            findTrack.comments = new List<Comment>();
            findTrack.comments.Add(comment);

            _context.SaveChanges();

            return findTrack;
            
        }


        // DELETE: api/Track/3
        [HttpDelete("{id}")]
        public async Task<ActionResult<Track>> deleteOneTrack(int id)
        {
            var track = await _context.Tracks.FindAsync(id);
            if (track == null)
            {
                return NotFound();
            }

            _context.Tracks.Remove(track);
            await _context.SaveChangesAsync();

            return Ok();
        }
         
        public string GetUniqueFileName(string fileName)
        {
            return  Path.GetFileNameWithoutExtension(fileName)
                  + "_" 
                  + Guid.NewGuid().ToString().Substring(0, 4) 
                  + Path.GetExtension(fileName);
        }
    }
}
















            // var audioExt = Path.GetExtension(audios.FileName);
            // var pictureExt = Path.GetExtension(pictures.FileName);

            // if(audioExt == ".mp3") {
            //     var aUploading = Path.Combine(env.WebRootPath, "audio", audios.FileName);

            //     var aStream = new FileStream(aUploading, FileMode.Create);

            //     await audios.CopyToAsync(aStream);
            //     aStream.Close();

            //     // string fileNameAudio = audios.FileName;
            //     track.audio = aUploading;
            //     await _context.Tracks.AddAsync(track);
            //     await _context.SaveChangesAsync();
            // }

            // if(pictureExt == ".png" || pictureExt == ".jng") {
            //     var pUploading = Path.Combine(env.WebRootPath, "picture", pictures.FileName);

            //     var pStream = new FileStream(pUploading, FileMode.Create);

            //     await pictures.CopyToAsync(pStream);
            //     pStream.Close();

            //     // string fileNamePicture = pictures.FileName;
            //     track.picture = pUploading;
            //     await _context.Tracks.AddAsync(track);
            //     await _context.SaveChangesAsync();
            // }