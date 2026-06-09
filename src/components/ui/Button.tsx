interface ButtonProps { 
    tittle: string; 
    type?: "button" | "submit";
    variant?: "primary" | "outline"; 
    className?: string; 
    isLoading?: boolean;
    onClick?: () => void; 
} 
 
export const Button: React.FC<ButtonProps> = ({ 
    tittle, 
    type = "button",
    variant = "primary", 
    className, 
    isLoading = false

}) => { 
 const baseStyle = 
   "px-7 py-2 rounded font-medium transition-all duration-200"; 
 const variantStyle = 
   variant === "primary" 
     ? "bg-amber-100 text-amber-800 font-medium text-sm px-4 py-2 rounded-lg border border-amber-300 shadow-sm hover:bg-amber-200 hover:shadow transition-all"
     : "bg-transparent text-amber-800 font-medium text-sm px-4 py-2 rounded-lg border border-amber-300 shadow-sm hover:bg-amber-100 transition-all"; 
 return ( 
   <button 
    type={type} 
    disabled={isLoading} 
    className={`${baseStyle} ${variantStyle} ${className}`}> 
     {isLoading ? "Loading..." : tittle} 
   </button> 
 ); 
}; 
 
export default Button; 