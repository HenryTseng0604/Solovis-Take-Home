using FinanceModeling.Model;

namespace FinanceModeling.Projection
{
    public static class ProjectionFactory
    {
        public static IProjection Get(string method, FinancialTerm term)
        {
            switch(method)
            {
                case "CumulativeReturn":
                    var cummulativeReturn = new CumulativeReturnProjection();
                    cummulativeReturn.CreateModel(term);
                    return cummulativeReturn;
                default:
                    return null;
            }
        }
    }
}
