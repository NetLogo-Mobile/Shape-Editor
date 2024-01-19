import { Shape } from './ShapeSelectorShape';

export interface GalapagosShapeSelectorDialogConfig {
  // Callback function to update the main app state with the full shape list
  onUpdateShapes: (shapes: Shape[]) => void;
  // Callback function to update the main app state with the filtered shape list
  onUpdateFilteredShapes: (filteredShapes: Shape[]) => void;
  // Callback function to update the main app state with the selected shape ID
  onUpdateSelectedItemId: (selectedItemId: number | null) => void;
  // Callback function to update the main app state with the open/closed state of the dialog
  onUpdateDialogOpen: (newState: boolean) => void;
  // Callback function to update the main app state whether the import button has been selected
  onUpdateImportButtonSelected: (newState: boolean) => void;
  // Callback function to update the main app state whether the library has been opened
  onUpdateLibraryOpen: (newState: boolean) => void;
  // Callback function to update the recently imported shape
  onUpdateRecentlyImportedShapes: (recentlyImportedShapeIds: number[]) => void;
}
