export interface GalapagosShapeSelectorDialogConfig {
    // Callback function to update the main app state with the full shape list
    onUpdateShapes: (shapes: any[]) => void;
    // Callback function to update the main app state with the filtered shape list
    onUpdateFilteredShapes: (filteredShapes: any[]) => void;
    // Callback function to update the main app state with the selected shape ID
    onUpdateSelectedItemId: (selectedItemId: number | null) => void;
}