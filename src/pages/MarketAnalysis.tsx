
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Clock, TrendingUp, Info, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

const MarketAnalysis = () => {
  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>Resources</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-jaguargold">Market Analysis</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Market Analysis <span className="gradient-text">for EA Traders</span>
          </h1>
          <p className="text-gray-300 md:text-lg max-w-3xl mx-auto">
            Understanding the Market Behind the Code. Even the best Expert Advisors (EAs) rely on one crucial factor to succeed: the market environment. While EAs can automate decisions, knowing the market context helps you optimize your settings, avoid high-risk zones, and improve long-term performance.
          </p>
        </div>
        
        {/* Main content */}
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Why EA Traders Should Still Analyze the Market */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <Info className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Why EA Traders Should Still Analyze the Market</h2>
            </div>
            <p className="text-gray-300 mb-4">
              <em className="text-jaguargold">"An Expert Advisor is only as good as the market it trades in."</em>
            </p>
            <p className="text-gray-300 mb-4">
              EAs are programmed to follow logic, not intuition. But markets shift—ranging from calm trends to wild volatility. EA traders who understand these conditions can make smarter decisions, such as:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <div className="bg-jaguargold/20 p-1 rounded-full mr-3">
                  <span className="text-jaguargold">✓</span>
                </div>
                When to activate or pause certain EAs
              </li>
              <li className="flex items-center">
                <div className="bg-jaguargold/20 p-1 rounded-full mr-3">
                  <span className="text-jaguargold">✓</span>
                </div>
                Which pairs or assets are trending
              </li>
              <li className="flex items-center">
                <div className="bg-jaguargold/20 p-1 rounded-full mr-3">
                  <span className="text-jaguargold">✓</span>
                </div>
                How to adjust settings like stop loss, lot size, or session filters
              </li>
              <li className="flex items-center">
                <div className="bg-jaguargold/20 p-1 rounded-full mr-3">
                  <span className="text-jaguargold">✓</span>
                </div>
                When to avoid overtrading during unstable conditions
              </li>
            </ul>
          </section>
          
          {/* Key Elements of Market Analysis */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <BarChart3 className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Key Elements of Market Analysis for EA Users</h2>
            </div>
            
            {/* Trend Identification */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-jaguargold mb-4">1. Trend Identification</h3>
              <p className="text-gray-300 mb-4">
                Is the market trending or ranging? Many EAs work better in specific environments:
              </p>
              <ul className="text-gray-300 mb-4 space-y-2 pl-5 list-disc">
                <li>Trend-Following EAs thrive during strong directional moves</li>
                <li>Mean-Reversion EAs perform better in ranging markets</li>
              </ul>
              <p className="text-gray-300 mb-2">Use tools like:</p>
              <ul className="text-gray-300 mb-4 space-y-2 pl-5 list-disc">
                <li>Moving Averages</li>
                <li>ADX (Average Directional Index)</li>
                <li>Trendlines and Price Action Patterns</li>
              </ul>
              <div className="bg-jaguarblue-600 p-4 rounded-md border border-jaguarblue-500">
                <p className="text-jaguargold font-medium">📌 Tip:</p>
                <p className="text-gray-300">Disable trend-based EAs during consolidation periods to avoid false entries.</p>
              </div>
            </div>
            
            {/* Volatility Awareness */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-jaguargold mb-4">2. Volatility Awareness</h3>
              <p className="text-gray-300 mb-4">
                Volatility affects EA performance significantly. High volatility may:
              </p>
              <ul className="text-gray-300 mb-4 space-y-2 pl-5 list-disc">
                <li>Trigger stop-losses prematurely</li>
                <li>Cause slippage or price gaps</li>
                <li>Create false breakouts</li>
              </ul>
              <p className="text-gray-300 mb-2">Measure volatility with:</p>
              <ul className="text-gray-300 mb-4 space-y-2 pl-5 list-disc">
                <li>ATR (Average True Range)</li>
                <li>Bollinger Band width</li>
                <li>Economic calendar for news events</li>
              </ul>
              <div className="bg-jaguarblue-600 p-4 rounded-md border border-jaguarblue-500">
                <p className="text-jaguargold font-medium">📌 Tip:</p>
                <p className="text-gray-300">Reduce lot sizes or switch to safer modes during major economic releases.</p>
              </div>
            </div>
            
            {/* Support and Resistance Zones */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-jaguargold mb-4">3. Support and Resistance Zones</h3>
              <p className="text-gray-300 mb-4">
                Even automated trades can benefit from human-marked key levels. EAs that open trades near strong support/resistance can face unnecessary drawdowns.
              </p>
              <p className="text-gray-300 mb-2">Use:</p>
              <ul className="text-gray-300 mb-4 space-y-2 pl-5 list-disc">
                <li>Horizontal levels from recent highs/lows</li>
                <li>Fibonacci retracements</li>
                <li>Psychological round numbers (e.g., 1.2000)</li>
              </ul>
              <div className="bg-jaguarblue-600 p-4 rounded-md border border-jaguarblue-500">
                <p className="text-jaguargold font-medium">📌 Tip:</p>
                <p className="text-gray-300">Filter EA trades with time-of-day or distance-from-zone logic for better entries.</p>
              </div>
            </div>
            
            {/* Session and Time Filtering */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-jaguargold mb-4">4. Session and Time Filtering</h3>
              <p className="text-gray-300 mb-4">
                Markets behave differently depending on the trading session (Asian, London, New York). EA traders should be aware of:
              </p>
              <ul className="text-gray-300 mb-4 space-y-2 pl-5 list-disc">
                <li>Best times for high liquidity</li>
                <li>Times to avoid (e.g., rollover hour or end of week)</li>
                <li>EA performance per session</li>
              </ul>
              <div className="bg-jaguarblue-600 p-4 rounded-md border border-jaguarblue-500">
                <p className="text-jaguargold font-medium">📌 Tip:</p>
                <p className="text-gray-300">Use built-in session filters or schedule-based logic in your EA to trade only during high-probability windows.</p>
              </div>
            </div>
            
            {/* News and Sentiment Monitoring */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-jaguargold mb-4">5. News and Sentiment Monitoring</h3>
              <p className="text-gray-300 mb-4">
                EAs can't "feel" the market—but you can. Use news and sentiment analysis to:
              </p>
              <ul className="text-gray-300 mb-4 space-y-2 pl-5 list-disc">
                <li>Pause trading during high-impact events (like NFP or interest rate decisions)</li>
                <li>Anticipate potential spikes or reversals</li>
                <li>Shift to manual mode when required</li>
              </ul>
              <p className="text-gray-300 mb-2">Tools to monitor:</p>
              <ul className="text-gray-300 mb-4 space-y-2 pl-5 list-disc">
                <li>ForexFactory or Myfxbook economic calendar</li>
                <li>Market sentiment dashboards</li>
                <li>Broker notifications or news feeds</li>
              </ul>
            </div>
          </section>
          
          {/* Example: Adaptive EA Management */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <Clock className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Example: Adaptive EA Management</h2>
            </div>
            <Card className="bg-jaguarblue-600 border-jaguarblue-500">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-jaguargold font-bold">EA Type:</p>
                  <p className="text-gray-300">Momentum Breakout</p>
                </div>
                <div className="flex gap-8">
                  <div className="flex-1 border-r border-jaguarblue-500 pr-4">
                    <div className="flex items-center">
                      <TrendingDown className="text-red-400 mr-2" />
                      <p className="text-white font-medium">Market Condition:</p>
                    </div>
                    <p className="text-gray-300">Low ADX + Narrow Bollinger Bands = Consolidation</p>
                    <p className="text-gray-300 mt-2"><span className="text-white font-medium">Action:</span> Disable EA or reduce risk</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <TrendingUp className="text-green-400 mr-2" />
                      <p className="text-white font-medium">New Condition:</p>
                    </div>
                    <p className="text-gray-300">ADX rising + breakout above resistance</p>
                    <p className="text-gray-300 mt-2"><span className="text-white font-medium">Action:</span> Re-enable EA with higher confidence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Final Thoughts */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <span className="text-3xl text-jaguargold">🚀</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Final Thoughts</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Using Expert Advisors doesn't mean turning off your brain—it means using it differently. When you combine smart automation with real-time market awareness, you gain an edge over traders who rely blindly on bots.
            </p>
            <p className="text-gray-300 text-xl text-center font-medium mt-6">
              Market analysis is your lens. The EA is your tool. Use both.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketAnalysis;
