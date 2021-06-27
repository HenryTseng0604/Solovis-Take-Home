using Domain;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence
{
    public class SeedData
    {
        public static async Task Create(DataContext context, IConfiguration config)
        {
            if (!context.Investments.Any())
            {
                var investmentFilePath = AppDomain.CurrentDomain.BaseDirectory + config.GetSection("SeedDataFile").GetSection("Investments").Value;
                var investments = LoadInvestmentData(investmentFilePath);
                await context.Investments.AddRangeAsync(investments);
                await context.SaveChangesAsync();
            }

            if (!context.PortfolioGroupings.Any())
            {
                var portfolioGroupFilePath = AppDomain.CurrentDomain.BaseDirectory + config.GetSection("SeedDataFile").GetSection("PortfolioGroupings").Value;
                var portfolioGroupings = LoadPortfolioGroupData(portfolioGroupFilePath);
                await context.PortfolioGroupings.AddRangeAsync(portfolioGroupings);
                await context.SaveChangesAsync();
            }
            
        }

        private static List<Investment> LoadInvestmentData(string filePath, bool hasHeader = true)
        {
            var headerLine = hasHeader;
            var investments = new List<Investment>();
            using (var reader = new StreamReader(filePath))
            {
                var line = reader.ReadLine();
                while (line != null)
                {
                    if (headerLine)
                    {
                        line = reader.ReadLine();
                        headerLine = false;
                    }

                    var token = line.Split(",");
                    investments.Add(new Investment
                    {
                        Id = new Guid(token[0]),
                        Label = token[1],
                        CurrentValue = Convert.ToDecimal(token[2]),
                        PortfolioGroupingId = Convert.ToInt32(token[3])

                    });
                    line = reader.ReadLine();
                }
            }
            return investments;
        }

        private static List<PortfolioGrouping> LoadPortfolioGroupData(string filePath, bool hasHeader = true)
        {
            var headerLine = hasHeader;
            var portfolioGroupings = new List<PortfolioGrouping>();
            using (var reader = new StreamReader(filePath))
            {
                var line = reader.ReadLine();
                while (line != null)
                {
                    if (headerLine)
                    {
                        line = reader.ReadLine();
                        headerLine = false;
                    }

                    var token = line.Split(",");
                    portfolioGroupings.Add(new PortfolioGrouping
                    {
                        Id = Convert.ToInt32(token[0]),
                        ParentId = token[1] == "NULL"? null : Convert.ToInt32(token[1]),
                        Label = token[2]
                    });
                    line = reader.ReadLine();
                }
            }
            return portfolioGroupings;
        }
    }
}
