using FinanceModeling.Model;

namespace FinanceModeling.Projection
{
    public interface IProjection
    {
       FinancialTerm FinancialTerm { get; set; }

        void CreateModel(FinancialTerm Term);
        Result Project();
    }
}
