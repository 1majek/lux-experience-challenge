interface WishlistIconProps {
  onClick?: () => void;
  height?: number;
  width?: number;
  fill?: string;
  strokeWidth?: string;
  strokeColor?: string;
  opacity?: string;
  ref?: React.RefObject<SVGSVGElement | null>;
  className?: string;
}
const WishlistIcon = ({ onClick, height = 24, width = 24, fill = "none", strokeWidth = "2", strokeColor = "currentColor", opacity, ref, className }: WishlistIconProps) => {
  return (<div className={className} onClick={onClick}>
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={height}
      height={width}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="wishlist-icon"
      opacity={opacity}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  </div>
  )
}

export default WishlistIcon;
