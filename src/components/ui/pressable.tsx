import { Pressable, PressableProps, View } from 'react-native';

export const pressableVariants = {
  default:
    'flex h-14 w-full items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 active:opacity-80',
};

export const pressableSizes = {
  sm: 'h-8',
  md: 'h-12',
  base: 'h-14',
  lg: 'h-16',
  xl: 'h-20',
};

interface ButtonProps extends PressableProps, React.RefAttributes<View> {
  variant: keyof typeof pressableVariants;
  size: keyof typeof pressableSizes;
}

const Button = ({
  variant = 'default',
  size = 'base',
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      className={`${pressableSizes[size]} ${pressableVariants[variant]}`}
      {...props}
    />
  );
};

export default Button;
