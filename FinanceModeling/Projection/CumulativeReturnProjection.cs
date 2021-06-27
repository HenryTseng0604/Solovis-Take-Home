using FinanceModeling.Model;
using System;

namespace FinanceModeling.Projection
{
    public class CumulativeReturnProjection : IProjection
    {
        public FinancialTerm FinancialTerm { get; set; }
        public void CreateModel(FinancialTerm term) => FinancialTerm = term;
        public Result Project()
        {
            var result = new Result
            {
                Method = GetType().Name,
                // Projected cumulative return = (1 + annualized return)^(( number of days / 365)) - 1
                ProjectedReturn = Math.Pow(1 + FinancialTerm.AnnualizedReturn, (double)FinancialTerm.NumberOfDays / 365) - 1
            };
            result.ProjectedValue = FinancialTerm.CurrentValue * (decimal)(1 + result.ProjectedReturn);
            return result;
        }
    }
}
