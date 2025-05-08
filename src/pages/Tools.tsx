
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, BarChart3, LineChart, Gauge, Filter, Calculator, ChartCandlestick, FileChartLine, FileChartColumn } from "lucide-react";
import { useState } from "react";

const Tools = () => {
  const categories = ["All", "Expert Advisors", "Indicators", "Scripts", "Utilities"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  const tools = [
    {
      name: "JaguarTrend Pro EA",
      description: "Automated trend-following expert advisor with smart entry and exit algorithms.",
      category: "Expert Advisors",
      icon: <TrendingUp className="h-6 w-6" />,
      popular: true,
    },
    {
      name: "Scalper Pro EA",
      description: "High-frequency trading expert advisor designed for quick profits in ranging markets.",
      category: "Expert Advisors",
      icon: <ChartCandlestick className="h-6 w-6" />,
      popular: false,
    },
    {
      name: "Breakout Master EA",
      description: "Automated system that identifies and trades significant price breakouts.",
      category: "Expert Advisors",
      icon: <FileChartLine className="h-6 w-6" />,
      popular: true,
    },
    {
      name: "MultiTimeframe Analyzer",
      description: "Analyze market conditions across multiple timeframes simultaneously.",
      category: "Indicators",
      icon: <BarChart3 className="h-6 w-6" />,
      popular: true,
    },
    {
      name: "Advanced RSI Divergence",
      description: "Spot market divergences early with this enhanced RSI indicator.",
      category: "Indicators",
      icon: <LineChart className="h-6 w-6" />,
      popular: false,
    },
    {
      name: "Risk Calculator",
      description: "Optimize your position sizing with our comprehensive risk management tool.",
      category: "Utilities",
      icon: <Calculator className="h-6 w-6" />,
      popular: true,
    },
    {
      name: "Support/Resistance Detector",
      description: "Automatically identify key support and resistance levels across timeframes.",
      category: "Indicators",
      icon: <FileChartColumn className="h-6 w-6" />,
      popular: false,
    },
    {
      name: "Volatility Scanner",
      description: "Find the most volatile currency pairs for optimal trading opportunities.",
      category: "Scripts",
      icon: <Gauge className="h-6 w-6" />,
      popular: false,
    },
  ];
  
  const filteredTools = activeCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                JaguarForex <span className="gradient-text">Trading Tools</span>
              </h1>
              <p className="text-gray-300 md:text-lg max-w-3xl mx-auto">
                Access our library of professional trading tools to enhance your trading strategy,
                improve your analysis, and boost your profitability.
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={activeCategory === category 
                    ? "bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90" 
                    : "border-jaguarblue-600 hover:bg-jaguarblue-700"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <Card key={index} className="bg-jaguarblue-700 border border-jaguarblue-600 hover:border-jaguargold/50 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-jaguarblue-800 rounded-lg text-jaguargold">
                        {tool.icon}
                      </div>
                      {tool.popular && (
                        <span className="bg-jaguargold/20 text-jaguargold text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-3 text-white">{tool.name}</CardTitle>
                    <CardDescription className="text-gray-300">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>{tool.category}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-jaguarblue-600 hover:bg-jaguarblue-500 text-white flex items-center justify-center gap-2">
                      Download Now <Download className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tools;
