
import { useState, useEffect } from "react";

// Dummy data for social proof notifications
const notifications = [
  { name: "Anna G.", amount: 14, timeAgo: "2 minutes ago" },
  { name: "John T.", amount: 27, timeAgo: "5 minutes ago" },
  { name: "Sara M.", amount: 8, timeAgo: "10 minutes ago" },
  { name: "Mike R.", amount: 32, timeAgo: "15 minutes ago" },
  { name: "Lena K.", amount: 22, timeAgo: "20 minutes ago" },
  { name: "David P.", amount: 16, timeAgo: "25 minutes ago" },
];

const CashbackSocialProof = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [counter, setCounter] = useState(2137612); // Initial value
  
  // Rotate through notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % notifications.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Increment counter randomly
  useEffect(() => {
    const interval = setInterval(() => {
      // Random increment between 5 and 20
      const increment = Math.floor(Math.random() * 15) + 5;
      setCounter(prev => prev + increment);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format the counter with commas
  const formattedCounter = counter.toLocaleString();
  
  return (
    <section className="py-12 bg-jaguarblue-800/80 border-y border-jaguarblue-600">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Total paid counter */}
          <div className="text-center md:text-left">
            <p className="text-gray-300 mb-2">Total rebates paid since 2022</p>
            <div className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">${formattedCounter}</span>
            </div>
          </div>
          
          {/* Live feed */}
          <div className="bg-jaguarblue-700/50 p-4 rounded-lg border border-jaguarblue-600 overflow-hidden h-16 flex items-center">
            <div className="w-full">
              {notifications.map((notification, index) => (
                <div 
                  key={index} 
                  className={`flex items-center transition-all duration-500 ${
                    index === currentNotification ? 'opacity-100 translate-y-0' : 'opacity-0 absolute'
                  }`}
                  style={{
                    transform: index === currentNotification ? 'translateY(0)' : 'translateY(-20px)'
                  }}
                >
                  <div className="text-2xl mr-3">💰</div>
                  <div>
                    <p className="font-medium">
                      {notification.name} just earned <span className="text-jaguargold">${notification.amount}</span> cashback
                    </p>
                    <p className="text-xs text-gray-400">{notification.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashbackSocialProof;
