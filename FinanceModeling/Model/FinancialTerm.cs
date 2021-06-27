namespace FinanceModeling.Model
{
    public class FinancialTerm
    {
        public decimal CurrentValue { get; set; } 
        public double AnnualizedReturn { get; set; }
        public int NumberOfDays { get; set; }
    }
}
