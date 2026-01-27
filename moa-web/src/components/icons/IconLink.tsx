import IconBase from "./IconBase";
import { IconProps } from "./types";

export default function IconLink(props: IconProps) {
  return (
    <IconBase {...props} viewBox="0 0 28 28">
      <path 
      d="M15.1667 6.99996L17.5001 4.66663C18.6667 3.49996 21.0001 3.49996 22.1667 4.66663L23.3334 5.83329C24.5001 6.99996 24.5001 9.33329 23.3334 10.5L17.5001 16.3333C16.3334 17.5 14.0001 17.5 12.8334 16.3333M12.8334 21L10.5001 23.3333C9.33341 24.5 7.00008 24.5 5.83341 23.3333L4.66675 22.1666C3.50008 21 3.50008 18.6666 4.66675 17.5L10.5001 11.6666C11.6667 10.5 14.0001 10.5 15.1667 11.6666" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"/>

    </IconBase>
  );
} 
