import React from 'react';

const OrderTracker = ({ status, supportText, currentStep }) => {
  // Thay thế ký tự bằng SVG Icons thực tế
  const stepsData = [
    {
      id: 1,
      name: 'Order',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      )
    },
    {
      id: 2,
      name: 'Cooking',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h16M4 8a2 2 0 012-2h12a2 2 0 012 2M4 8v2a8 8 0 0016 0V8"/>
          <path d="M2 15h20M12 4v4"/>
        </svg>
      )
    },
    {
      id: 3,
      name: 'Shipping',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="17" r="3" />
          <circle cx="17" cy="17" r="3" />
          <path d="M5 17H3v-6l3-3h7v12" />
          <path d="M13 11h4l3 3v3h-3" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Complete',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    }
  ];

  return (
    <div className="order-card tracker-card">
      <h2 className="tracker-status">{status}</h2>
      <p className="tracker-support">{supportText}</p>
      
      <div className="tracker-progress-container">
        <div className="tracker-steps">
          
          {/* Đưa đường line vào TỚI ĐÂY để nó chạy theo chiều rộng của container chứa icon */}
          <div className="tracker-line-bg"></div>
          <div 
            className="tracker-line-active" 
            style={{ width: `${((currentStep - 1) / (stepsData.length - 1)) * 100}%` }}
          ></div>
          
          {stepsData.map((step, index) => {
            const isActive = index < currentStep;
            return (
              <div key={step.id} className={`tracker-step-item ${isActive ? 'active' : ''}`}>
                <div className="tracker-icon-wrapper">
                  {step.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;