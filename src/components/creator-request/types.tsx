import { ReactNode, CSSProperties } from 'react';

export type PopoverFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openChild?: ReactNode;
  successChild?: ReactNode;
  showSuccess: boolean;
  width?: string;
  height?: string;
  showCloseButton?: boolean;
  title: string;
};

export type ElectricBorderProps = {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
};

export type PopoverFormCutOutTopIconProps = {
  width?: number;
  height?: number;
};

export type PopoverFormButtonProps = {
  loading: boolean;
  text: string;
  onClick?: () => void;
};

export type PopoverFormSuccessProps = {
  title?: string;
  description?: string;
};