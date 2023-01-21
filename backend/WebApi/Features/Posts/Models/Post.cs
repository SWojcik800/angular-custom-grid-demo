namespace WebApi.Features.Posts.Models
{
    public class Post
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public long CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
