
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Bot, BarChart3, Shield, Rocket, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const TradingGuide = () => {
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
              <span className="text-jaguargold">Trading Guide</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trading Guide: <span className="gradient-text">Mastering Expert Advisors and Risk Management</span>
          </h1>
          <p className="text-gray-300 md:text-lg max-w-3xl mx-auto">
            Welcome to your ultimate guide on maximizing your trading potential using Expert Advisors (EAs) and strong risk management strategies. Whether you're new to trading or looking to automate your system, this guide will help you trade smarter, not harder.
          </p>
        </div>
        
        {/* Main content */}
        <div className="max-w-4xl mx-auto space-y-10">
          {/* What Are Expert Advisors */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <Bot className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">What Are Expert Advisors (EAs)?</h2>
            </div>
            <p className="text-gray-300">
              Expert Advisors are automated trading programs designed to analyze market data and execute trades based on pre-set parameters. These tools run on platforms like MetaTrader 4 (MT4) and MetaTrader 5 (MT5) and can handle everything from signal generation to full trade execution.
            </p>
          </section>
          
          {/* Why Use EAs */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <BarChart3 className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Why Use EAs?</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <div className="bg-jaguargold/20 p-1 rounded-full mr-3">
                  <span className="text-jaguargold">✓</span>
                </div>
                Trade 24/5 without emotions or fatigue
              </li>
              <li className="flex items-center">
                <div className="bg-jaguargold/20 p-1 rounded-full mr-3">
                  <span className="text-jaguargold">✓</span>
                </div>
                Backtest strategies using historical data
              </li>
              <li className="flex items-center">
                <div className="bg-jaguargold/20 p-1 rounded-full mr-3">
                  <span className="text-jaguargold">✓</span>
                </div>
                Execute trades faster than manual trading
              </li>
              <li className="flex items-center">
                <div className="bg-jaguargold/20 p-1 rounded-full mr-3">
                  <span className="text-jaguargold">✓</span>
                </div>
                Remove human error from decision-making
              </li>
            </ul>
          </section>
          
          {/* Getting Started with EAs */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <Rocket className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Getting Started with EAs</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-jaguargold mb-2">Step 1: Choose a Reliable EA</h3>
                <p className="text-gray-300">
                  Select an EA that fits your trading style—scalping, swing trading, trend-following, or reversal-based strategies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-jaguargold mb-2">Step 2: Set Up on MetaTrader</h3>
                <p className="text-gray-300">
                  Install the EA on your MT4/MT5 platform and attach it to the correct chart and timeframe. Adjust the input parameters based on your strategy preferences.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-jaguargold mb-2">Step 3: Demo Test First</h3>
                <p className="text-gray-300">
                  Always run the EA on a demo account before going live. This helps you observe performance and adjust settings without risking capital.
                </p>
              </div>
            </div>
          </section>
          
          {/* Risk Management */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <Shield className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Importance of Risk Management</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Using EAs does not mean you can skip risk management. Automation enhances consistency, but proper controls ensure longevity and profitability.
            </p>
            
            <h3 className="text-xl font-semibold text-jaguargold mb-4">Key Risk Management Practices:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white">1. Lot Sizing:</h4>
                <p className="text-gray-300">Use fixed or dynamic lot sizes based on account balance. Avoid overleveraging.</p>
              </div>
              <div>
                <h4 className="font-bold text-white">2. Stop Loss & Take Profit:</h4>
                <p className="text-gray-300">Always set realistic SL and TP values. Ensure your EA has built-in risk parameters.</p>
              </div>
              <div>
                <h4 className="font-bold text-white">3. Maximum Drawdown Control:</h4>
                <p className="text-gray-300">Limit total exposure by setting a max drawdown %—this will stop trading when losses exceed your comfort zone.</p>
              </div>
              <div>
                <h4 className="font-bold text-white">4. Diversification:</h4>
                <p className="text-gray-300">Avoid relying on one EA or currency pair. Spread risk across multiple strategies or assets.</p>
              </div>
              <div>
                <h4 className="font-bold text-white">5. Risk-Reward Ratio:</h4>
                <p className="text-gray-300">Aim for a minimum 1:2 risk-reward ratio. This means your potential reward should always be double your risk.</p>
              </div>
            </div>
          </section>
          
          {/* Example Setup */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <AlertTriangle className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Example Setup</h2>
            </div>
            <Card className="bg-jaguarblue-600 border-jaguarblue-500">
              <CardContent className="pt-6">
                <ul className="space-y-2 text-gray-300">
                  <li><strong className="text-jaguargold">EA Type:</strong> Bollinger Band Reversal EA</li>
                  <li><strong className="text-jaguargold">Timeframe:</strong> M15</li>
                  <li><strong className="text-jaguargold">Lot Size:</strong> 0.01 per $1,000 balance</li>
                  <li><strong className="text-jaguargold">Stop Loss:</strong> 30 pips</li>
                  <li><strong className="text-jaguargold">Take Profit:</strong> 60 pips</li>
                  <li><strong className="text-jaguargold">Max Open Trades:</strong> 3</li>
                  <li><strong className="text-jaguargold">Max Drawdown Limit:</strong> 10%</li>
                </ul>
              </CardContent>
            </Card>
          </section>
          
          {/* Pro Tips */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <Monitor className="h-8 w-8 text-jaguargold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Pro Tips for EA Users</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-jaguarblue-600 p-4 rounded-lg border border-jaguarblue-500">
                <h3 className="font-bold text-jaguargold mb-2">Update Regularly</h3>
                <p className="text-gray-300">Ensure your EA is updated for market changes or broker policy updates.</p>
              </div>
              <div className="bg-jaguarblue-600 p-4 rounded-lg border border-jaguarblue-500">
                <h3 className="font-bold text-jaguargold mb-2">Monitor News</h3>
                <p className="text-gray-300">Disable EA during major news releases unless it's designed to handle volatility.</p>
              </div>
              <div className="bg-jaguarblue-600 p-4 rounded-lg border border-jaguarblue-500">
                <h3 className="font-bold text-jaguargold mb-2">Use VPS</h3>
                <p className="text-gray-300">For uninterrupted trading, use a Virtual Private Server (VPS) to keep your EA running 24/5.</p>
              </div>
              <div className="bg-jaguarblue-600 p-4 rounded-lg border border-jaguarblue-500">
                <h3 className="font-bold text-jaguargold mb-2">Track Performance</h3>
                <p className="text-gray-300">Use trade journals or dashboards to review EA profitability over time.</p>
              </div>
            </div>
          </section>
          
          {/* Final Thoughts */}
          <section className="bg-jaguarblue-700 rounded-lg p-8 shadow-lg border border-jaguarblue-600">
            <div className="flex items-center mb-6">
              <div className="bg-jaguarblue-800 p-3 rounded-full mr-4">
                <span className="text-3xl text-jaguargold">🎯</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Final Thoughts</h2>
            </div>
            <p className="text-gray-300">
              Expert Advisors can transform your trading—automating the tedious, reducing emotional decision-making, and improving precision. But no matter how powerful the EA, risk management is your real edge. Use both wisely to build a sustainable and profitable trading journey.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TradingGuide;
