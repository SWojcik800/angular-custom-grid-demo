using WebApi.Features.Posts.Models;

namespace WebApi.Posts
{
    public static class PostEndpointsMap
    {
        public static void MapEndpoints(this WebApplication webApplication)
        {
            webApplication.MapGet("/posts", () =>
            {
                var posts = new List<Post>()
                {
                };

                return posts;
            });
        }
    }
}
