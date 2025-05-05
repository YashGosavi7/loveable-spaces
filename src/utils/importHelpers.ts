
import { UI_PATH } from "@/lib/paths";

/**
 * Helper function to get the correct path to UI components
 * This prevents issues with relative paths like "../../../components/ui"
 * 
 * @param componentName The name of the UI component (without extension)
 * @returns The correct import path for the component
 */
export const getUiComponentPath = (componentName: string): string => {
  return `${UI_PATH}/${componentName}`;
};

/**
 * This function helps with importing UI components consistently
 * It's meant to be used in JSX like:
 * import { importUiComponent } from "@/utils/importHelpers";
 * const Button = importUiComponent("button");
 * 
 * @param componentName The name of the UI component (without extension)
 * @returns A dynamic import for the component
 */
export const importUiComponent = async (componentName: string) => {
  try {
    return import(`${UI_PATH}/${componentName}`);
  } catch (error) {
    console.error(`Failed to import UI component: ${componentName}`, error);
    throw error;
  }
};
