using System;

namespace Domain
{
    public class Investment
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public decimal CurrentValue { get; set; }
        public int PortfolioGroupingId { get; set; }
    }
}
