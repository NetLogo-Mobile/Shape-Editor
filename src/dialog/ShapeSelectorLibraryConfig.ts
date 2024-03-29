import { Shape } from './ShapeSelectorShape';

export interface GalapagosShapeSelectorLibraryConfig {
  // Callback function to update the main app state with the full shape list
  onUpdateShapes: (shapes: Shape[]) => void;
  // Callback function to update the main app state with the filtered shape list
  onUpdateFilteredShapes: (filteredShapes: Shape[]) => void;
  // Callback function to update the main app state with the selected shape IDs
  onUpdateSelectedItemIds: (selectedItemIds: number[]) => void;
  // Callback function to update the main app state with the open/closed state of the dialog
  onUpdateDialogOpen: (newState: boolean) => void;
}
