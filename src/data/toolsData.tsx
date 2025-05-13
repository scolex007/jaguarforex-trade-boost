
import { ReactNode } from "react";
import { TrendingUp, BarChart3, LineChart, Gauge, Filter, Calculator, ChartCandlestick, FileChartLine, FileChartColumn } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  platform: "MT4" | "MT5" | "Both";
  icon: ReactNode;
  popular: boolean;
  isNew?: boolean;
  version: string;
  filePath: string;
  features: string[];
  installation: string[];
  settings: string[];
  faq: {question: string; answer: string}[];
  changelog: {version: string; date: string; changes: string[]}[];
}

export const getToolsData = () => {
  return [
    {
      id: "jaguartrend-pro-ea",
      name: "JaguarTrend Pro EA",
      description: "Automated trend-following expert advisor with smart entry and exit algorithms.",
      shortDescription: "Ride established trends with smart entry and exit points for consistent profits.",
      category: "Expert Advisors",
      platform: "MT4",
      icon: <TrendingUp className="h-6 w-6" />,
      popular: true,
      isNew: false,
      version: "1.3",
      filePath: "/downloads/JaguarTrendProEA.ex4",
      features: [
        "Smart trend detection using multiple timeframes",
        "Dynamic stop-loss and take-profit calculation",
        "Risk-adjusted position sizing",
        "Anti-spike protection during high volatility",
        "Works on all major currency pairs",
        "Customizable trading sessions"
      ],
      installation: [
        "Download the EA file",
        "Copy to your MT4 data folder at C:\\Program Files\\MetaTrader 4\\MQL4\\Experts\\",
        "Restart MetaTrader 4",
        "Drag the EA onto your desired chart",
        "Configure settings in the dialog window"
      ],
      settings: [
        "Risk percentage: 1-2% recommended",
        "Max spread: 3 pips",
        "Default lot size: Based on account balance",
        "Trading hours: 00:00-23:59 GMT (customizable)"
      ],
      faq: [
        {
          question: "What are the minimum system requirements?",
          answer: "MetaTrader 4 build 600 or higher, running on Windows 7/10/11 or through Wine on macOS/Linux."
        },
        {
          question: "Which broker is recommended?",
          answer: "Any ECN broker with low spreads and fast execution. The EA performs best with spreads under 1.5 pips."
        },
        {
          question: "Can I use a VPS?",
          answer: "Yes, using a VPS is highly recommended for 24/7 operation without interruptions."
        }
      ],
      changelog: [
        {
          version: "1.3",
          date: "2024-02-15",
          changes: [
            "Added support for additional currency pairs",
            "Improved drawdown protection algorithms",
            "Fixed bug in weekend trading detection"
          ]
        },
        {
          version: "1.2",
          date: "2023-11-10",
          changes: [
            "Enhanced trend detection algorithm",
            "Added custom alerts system",
            "Optimized for lower spreads"
          ]
        },
        {
          version: "1.0",
          date: "2023-08-01",
          changes: [
            "Initial release"
          ]
        }
      ]
    },
    {
      id: "scalper-pro-ea",
      name: "Scalper Pro EA",
      description: "High-frequency trading expert advisor designed for quick profits in ranging markets.",
      shortDescription: "Capture quick profits in ranging markets with high-frequency precision trading.",
      category: "Expert Advisors",
      platform: "MT5",
      icon: <ChartCandlestick className="h-6 w-6" />,
      popular: false,
      isNew: true,
      version: "2.1",
      filePath: "/downloads/ScalperProEA.ex5",
      features: [
        "Ultra-fast execution for scalping strategies",
        "Grid-based position management",
        "Advanced market noise filtering",
        "Smart spread detection with auto-pause during high spreads",
        "Works best on M5 and M15 timeframes",
        "Built-in economic calendar filter"
      ],
      installation: [
        "Download the EA file",
        "Copy to your MT5 data folder at C:\\Program Files\\MetaTrader 5\\MQL5\\Experts\\",
        "Restart MetaTrader 5",
        "Drag the EA onto your desired chart",
        "Configure settings in the dialog window"
      ],
      settings: [
        "Risk percentage: 0.5-1% recommended",
        "Max spread: 1.5 pips",
        "Default grid spacing: 5-10 pips",
        "Trading hours: Major session overlaps recommended"
      ],
      faq: [
        {
          question: "Which timeframe works best?",
          answer: "The EA is optimized for M5 and M15 timeframes."
        },
        {
          question: "Which currency pairs are supported?",
          answer: "Major and minor pairs with low spreads, especially EUR/USD, GBP/USD, USD/JPY, and EUR/JPY."
        }
      ],
      changelog: [
        {
          version: "2.1",
          date: "2024-04-10",
          changes: [
            "Added economic news filter",
            "Improved execution speed by 15%",
            "Added custom dashboard"
          ]
        },
        {
          version: "2.0",
          date: "2024-01-05",
          changes: [
            "Complete rewrite with enhanced algorithm",
            "Added grid-based trading approach",
            "Improved backtesting compatibility"
          ]
        }
      ]
    },
    {
      id: "breakout-master-ea",
      name: "Breakout Master EA",
      description: "Automated system that identifies and trades significant price breakouts.",
      shortDescription: "Capitalize on powerful market breakouts with intelligent entry timing.",
      category: "Expert Advisors",
      platform: "MT4",
      icon: <FileChartLine className="h-6 w-6" />,
      popular: true,
      version: "1.5",
      filePath: "/downloads/BreakoutMasterEA.ex4",
      features: [
        "Advanced support/resistance level identification",
        "False breakout filtering system",
        "Multiple confirmation indicators",
        "Volatility-based position sizing",
        "Works on all timeframes from H1 to D1"
      ],
      installation: [
        "Download the EA file",
        "Copy to your MT4 data folder",
        "Restart MetaTrader 4",
        "Attach to chart"
      ],
      settings: [
        "Breakout confirmation period: 3-5 candles recommended",
        "Risk percentage: 1-3% per trade",
        "Minimum volatility threshold: 1.5x average"
      ],
      faq: [
        {
          question: "How many trades per day does it typically take?",
          answer: "On average, 1-3 trades per week on H4/D1 timeframes."
        }
      ],
      changelog: [
        {
          version: "1.5",
          date: "2024-03-01",
          changes: [
            "Added smart false breakout detection",
            "Improved entry timing algorithm",
            "Added multi-timeframe analysis"
          ]
        }
      ]
    },
    {
      id: "multitimeframe-analyzer",
      name: "MultiTimeframe Analyzer",
      description: "Analyze market conditions across multiple timeframes simultaneously.",
      shortDescription: "Get a comprehensive market overview across all timeframes in one view.",
      category: "Indicators",
      platform: "MT5",
      icon: <BarChart3 className="h-6 w-6" />,
      popular: true,
      version: "2.0",
      filePath: "/downloads/MultiTimeframeAnalyzer.ex5",
      features: [
        "Simultaneous analysis of 9 timeframes",
        "Trend strength indicator for each timeframe",
        "Support/resistance visualization",
        "Divergence scanner",
        "Custom alerts system"
      ],
      installation: [
        "Download the indicator file",
        "Copy to your MT5 data folder",
        "Restart platform",
        "Add to chart from Navigator panel"
      ],
      settings: [
        "Timeframes to display: Customizable",
        "Indicator colors: Fully customizable",
        "Alert settings: On/off and sound options"
      ],
      faq: [
        {
          question: "Will this slow down my platform?",
          answer: "The indicator is optimized for performance, but displaying all 9 timeframes simultaneously may require more resources."
        }
      ],
      changelog: [
        {
          version: "2.0",
          date: "2024-02-18",
          changes: [
            "Added divergence scanner",
            "Improved UI for better visibility",
            "Added custom alerts"
          ]
        }
      ]
    },
    {
      id: "advanced-rsi-divergence",
      name: "Advanced RSI Divergence",
      description: "Spot market divergences early with this enhanced RSI indicator.",
      shortDescription: "Identify high-probability reversal points with advanced divergence detection.",
      category: "Indicators",
      platform: "MT4",
      icon: <LineChart className="h-6 w-6" />,
      popular: false,
      version: "3.1",
      filePath: "/downloads/AdvancedRSIDivergence.ex4",
      features: [
        "Auto-detection of regular and hidden divergences",
        "Visual and audio alerts",
        "Customizable RSI settings",
        "Multi-timeframe scanning",
        "Historical divergence display"
      ],
      installation: [
        "Download the indicator",
        "Install to MT4 indicators folder",
        "Restart platform",
        "Add to chart"
      ],
      settings: [
        "RSI period: 14 (default)",
        "Divergence lookback: 100 candles",
        "Alert settings: Customizable"
      ],
      faq: [
        {
          question: "What is the difference between regular and hidden divergence?",
          answer: "Regular divergence signals potential reversals, while hidden divergence signals continuation of the trend."
        }
      ],
      changelog: [
        {
          version: "3.1",
          date: "2024-01-30",
          changes: [
            "Added multi-timeframe scanner",
            "Improved divergence detection algorithm",
            "Fixed minor UI bugs"
          ]
        }
      ]
    },
    {
      id: "risk-calculator",
      name: "Risk Calculator",
      description: "Optimize your position sizing with our comprehensive risk management tool.",
      shortDescription: "Trade with confidence using precise position sizing based on your risk tolerance.",
      category: "Utilities",
      platform: "Both",
      icon: <Calculator className="h-6 w-6" />,
      popular: true,
      version: "1.8",
      filePath: "/downloads/RiskCalculator.mq4",
      features: [
        "Account-based position sizing",
        "Multiple risk percentage options",
        "Stop-loss based lot calculation",
        "Risk-to-reward analysis",
        "Trade journaling integration",
        "Visual risk meter"
      ],
      installation: [
        "Download utility",
        "Install to Scripts folder",
        "Launch from Navigator panel"
      ],
      settings: [
        "Default risk: 1% (customizable)",
        "Account currency: Auto-detected",
        "Max allowed risk: Adjustable"
      ],
      faq: [
        {
          question: "Can I use this for crypto or stocks?",
          answer: "Yes, the calculator works with any market that uses lot sizing in MT4/MT5."
        }
      ],
      changelog: [
        {
          version: "1.8",
          date: "2024-04-20",
          changes: [
            "Added trade journaling export",
            "Improved UI for easier reading",
            "Added support for more currency pairs"
          ]
        }
      ]
    },
    {
      id: "support-resistance-detector",
      name: "Support/Resistance Detector",
      description: "Automatically identify key support and resistance levels across timeframes.",
      shortDescription: "Never miss important price levels with automated support and resistance detection.",
      category: "Indicators",
      platform: "MT5",
      icon: <FileChartColumn className="h-6 w-6" />,
      popular: false,
      version: "2.4",
      filePath: "/downloads/SupportResistanceDetector.ex5",
      features: [
        "Auto-detection of key levels",
        "Historical and dynamic level tracking",
        "Strength rating for each level",
        "Multi-timeframe analysis",
        "Custom alerts when price approaches levels"
      ],
      installation: [
        "Download indicator file",
        "Copy to MT5 indicators folder",
        "Add to chart"
      ],
      settings: [
        "Number of levels to display: 5-10 recommended",
        "Level strength threshold: Adjustable",
        "Historical lookback period: 500 candles default"
      ],
      faq: [
        {
          question: "How often are levels recalculated?",
          answer: "Levels are calculated on each new bar and when major price movements occur."
        }
      ],
      changelog: [
        {
          version: "2.4",
          date: "2023-12-15",
          changes: [
            "Added strength rating system",
            "Improved level detection algorithm",
            "Added custom alerts"
          ]
        }
      ]
    },
    {
      id: "volatility-scanner",
      name: "Volatility Scanner",
      description: "Find the most volatile currency pairs for optimal trading opportunities.",
      shortDescription: "Discover the most active markets with the highest potential for movement.",
      category: "Scripts",
      platform: "Both",
      icon: <Gauge className="h-6 w-6" />,
      popular: false,
      version: "1.2",
      filePath: "/downloads/VolatilityScanner.mq4",
      features: [
        "Real-time volatility analysis",
        "28 currency pairs monitoring",
        "Historical volatility comparison",
        "Custom timeframe selection",
        "Sortable results"
      ],
      installation: [
        "Download script",
        "Install to Scripts folder",
        "Run from Navigator"
      ],
      settings: [
        "Volatility period: 14 days default",
        "Refresh rate: 5 minutes",
        "Pairs to monitor: Customizable"
      ],
      faq: [
        {
          question: "How is volatility calculated?",
          answer: "Using Average True Range (ATR) values normalized across different currency pairs."
        }
      ],
      changelog: [
        {
          version: "1.2",
          date: "2023-10-05",
          changes: [
            "Added more currency pairs",
            "Improved sorting options",
            "Added volatility alerts"
          ]
        }
      ]
    }
  ];
};

// Function to find a specific tool by ID
export const getToolById = (id: string): Tool | undefined => {
  return getToolsData().find(tool => tool.id === id);
};
