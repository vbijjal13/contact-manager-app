import React from "react";

type SVGProps = React.SVGProps<SVGSVGElement> & { className?: string };

export const EyeIcon: React.FC<SVGProps> = ({ className = "h-5 w-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EyeOffIcon: React.FC<SVGProps> = ({ className = "h-5 w-5", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.19-3.06 3.65-5.43 6.5-6.5" />
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 1l22 22" />
  </svg>
);

export default { EyeIcon, EyeOffIcon };
