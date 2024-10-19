import { Button, ButtonProps } from "./ui/button";

interface AppButtonProps extends ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export default function AppButton({
  text,
  className,
  onClick,
}: AppButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`${
        className && className
      } min-w-[120px] w-full min-h-14 py-[18px] px-5 rounded-xl bg-[#7880E9] hover:bg-[#7880E9] font-plus-jakarta text-base font-bold`}
    >
      {text}
    </Button>
  );
}
