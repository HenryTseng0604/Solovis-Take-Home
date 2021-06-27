using FinanceModeling.Model;
using FinanceModeling.Projection;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectionController : BaseApiController
    {
        [HttpPost]
        public ActionResult<Result> GetProjection(Payload payload)
        {
            var projection = ProjectionFactory.Get(payload.Method, payload.Term);
            return projection.Project();
        }
    }
}
