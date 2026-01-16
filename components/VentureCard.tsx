
import React from 'react';
import { Venture, VentureStatus } from '../types';

interface VentureCardProps {
  venture: Venture;
}

const VentureCard: React.FC<VentureCardProps> = ({ venture }) => {
  const isLive = venture.status === VentureStatus.LIVE;
  const isRedirecting = venture.url !== '#' && !isLive;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-slate-100 hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={venture.imageUrl} 
          alt={venture.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <span className="text-4xl">{venture.icon}</span>
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isLive ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
            {venture.status}
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
          {venture.name}
        </h3>
        <p className="text-slate-500 text-sm font-medium mb-4 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.823a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
          </svg>
          {venture.domain}
        </p>
        <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
          {venture.description}
        </p>

        <div className="pt-6 border-t border-slate-50">
          <a 
            href={venture.url}
            target={isLive ? "_blank" : "_self"}
            rel={isLive ? "noopener noreferrer" : ""}
            className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-bold transition-all ${
              (isLive || isRedirecting)
                ? 'bg-orange-600 text-white hover:bg-orange-700' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed hover:bg-slate-200'
            }`}
            onClick={(e) => {
              if (venture.url === '#') e.preventDefault();
            }}
          >
            {isLive ? 'Visit Website' : isRedirecting ? 'Back to Start' : 'Coming Soon'}
            {(isLive || isRedirecting) && (
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default VentureCard;
