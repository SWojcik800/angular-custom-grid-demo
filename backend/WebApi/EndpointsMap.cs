using WebApi.Posts;

namespace WebApi
{
    public static class EndpointsMap
    {
        public static void MapApplicationEndpoints(this WebApplication webApplication)
        {
            PostEndpointsMap.MapEndpoints(webApplication);
        }
    }
}
