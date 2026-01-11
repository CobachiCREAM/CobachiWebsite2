export default function CustomerLogos() {
  const customers = [
    { name: 'Costco' },
    { name: 'Fiserv' },
    { name: 'Amazon' },
    { name: 'AJC' },
    { name: 'Salesforce' },
    { name: 'Russell Construction' },
    { name: 'RICE' },
    { name: 'Google' },
    { name: 'Delta' },
    { name: 'Coca-Cola' },
    { name: 'Microsoft' },
    { name: 'UPS' }
  ];

  const doubledCustomers = [...customers, ...customers];

  return (
    <div className="relative bg-gradient-to-br from-[#FAC107] via-yellow-400 to-[#FAC107] py-12 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-[10%] w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-[15%] w-2 h-2 bg-black rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-[25%] w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-[30%] w-2 h-2 bg-black rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-[20%] w-3 h-3 bg-white rounded-full animate-ping"></div>
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-2 bg-black/10 px-4 py-1.5 rounded-full border border-black/20">
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
            <p className="text-black text-xs font-bold uppercase tracking-wider">
              Trusted By The Best
            </p>
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Industry Leaders
            <span className="block text-gray-900 mt-1">Choose Cobachi</span>
          </h3>
        </div>

        <div className="relative py-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAC107] via-[#FAC107] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAC107] via-[#FAC107] to-transparent z-10"></div>

          <div className="flex overflow-hidden">
            <div className="flex animate-scroll gap-4">
              {doubledCustomers.map((customer, index) => (
                <div
                  key={`${customer.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="relative bg-gradient-to-br from-black/90 to-black/80 backdrop-blur-sm border-2 border-black/40 rounded-xl px-6 py-3 hover:border-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    <span className="text-white font-bold text-base whitespace-nowrap tracking-wide">
                      {customer.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-800 text-xs">
            Over <span className="text-black font-bold">50+ successful events</span> and counting
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
