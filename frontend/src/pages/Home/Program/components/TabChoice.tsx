import { Tab, Tabs } from "@heroui/tabs";
import { Dumbbell, NotebookTabs } from "lucide-react";

type TabKey = "workouts" | "details";

type TabChoiceProps = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

export default function TabChoice({ activeTab, setActiveTab }: TabChoiceProps) {
  return (
    <Tabs
      aria-label="Options"
      color="default"
      variant="solid"
      selectedKey={activeTab}
      onSelectionChange={(key) => setActiveTab(key as TabKey)}
    >
      <Tab
        key="workouts"
        title={
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-4 h-4" />
            <span className="text-xs">Edition des séances</span>
          </div>
        }
      />
      <Tab
        key="details"
        title={
          <div className="flex items-center space-x-2">
            <NotebookTabs className="w-4 h-4" />
            <span className="text-xs">Détails du programme</span>
          </div>
        }
      />
    </Tabs>
  );
}
