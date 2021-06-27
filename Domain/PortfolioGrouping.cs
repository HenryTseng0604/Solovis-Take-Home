using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Domain
{
    public class PortfolioGrouping
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Label { get; set; }
        [NotMapped]
        public decimal TotalValue => Investments.Sum(x => x.CurrentValue) + ChildGroups.Sum(x => x.TotalValue);
        [NotMapped]
        public List<Investment> Investments { get; set; } = new();
        [NotMapped]
        public List<PortfolioGrouping> ChildGroups { get; set; } = new();
    }
}
