using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Portfolio
    {
        private readonly List<Investment> _investments;
        private readonly List<PortfolioGrouping> _portfolioGroupings;

        public List<PortfolioGrouping> PortfolioGroups { get; set; } = new();
        
        public Portfolio(List<PortfolioGrouping> portfolioGroupings, List<Investment> investments)
        {
            _portfolioGroupings = portfolioGroupings;
            _investments = investments;
            BuildPortfolio();
        }

        private void BuildPortfolio()
        {
            foreach(var group in _portfolioGroupings)
            {
                //Add if it is a root group.
                if (group.ParentId == null)
                {
                    PortfolioGroups.Add(new PortfolioGrouping { 
                        Id = group.Id,
                        ParentId = group.ParentId,
                        Label = group.Label,
                        Investments = _investments.Where(x => x.PortfolioGroupingId == group.Id).ToList()
                    });
                    continue;
                }

                var found = false;
                foreach (var rootGroup in PortfolioGroups)
                {
                    found |= FindAndAdd(rootGroup, group);
                    if (found) break;
                }

                if (!found)
                {
                    var unknownGroup = PortfolioGroups.Where(x => x.Label == "[Unknown]").First();
                    unknownGroup.ChildGroups.Add(new PortfolioGrouping
                    {
                        Id = group.Id,
                        ParentId = group.ParentId,
                        Label = group.Label,
                        Investments = _investments.Where(x => x.PortfolioGroupingId == group.Id).ToList()
                    });
                }
            }
        }

        private bool FindAndAdd(PortfolioGrouping rootGroup, PortfolioGrouping nodeGroup)
        {
            //If parent group is found, add to the child group list.
            if(rootGroup.Id == nodeGroup.ParentId)
            {
                rootGroup.ChildGroups.Add(new PortfolioGrouping
                {
                    Id = nodeGroup.Id,
                    ParentId = nodeGroup.ParentId,
                    Label = nodeGroup.Label,
                    Investments = _investments.Where(x => x.PortfolioGroupingId == nodeGroup.Id).ToList()
                });
                return true;
            }

            //Continue to look through the child groups to find a match
            foreach(var childGroup in rootGroup.ChildGroups)
            {
                if (FindAndAdd(childGroup, nodeGroup))
                    return true;
            }
            return false;
        }

    }
}
