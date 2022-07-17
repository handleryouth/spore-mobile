export interface CustomCardProps {
  image: string;
  id: string;
  title: string;
  totalTracks: number;
  toggleSelected?: () => void;
  toggleDeselected?: () => void;
  selectCondition?: boolean;
  enabledDetails?: boolean;
  allowSelect?: boolean;
  cardLink?: () => void;
}
