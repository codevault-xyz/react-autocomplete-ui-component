import { FC, MouseEvent, useState } from "react";
import Autocomplete, { TAutocompleteOptionFunc } from "./components/Autocomplete";

interface IFormData {
  year: TAutocompleteOptionFunc;
  brand: TAutocompleteOptionFunc;
}

const App: FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    year: null,
    brand: null,
  });

  const onOption = (
    e: MouseEvent<HTMLButtonElement>,
    value: TAutocompleteOptionFunc,
    name: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="home">
      <Autocomplete
        onOption={(e, value) => onOption(e, value, "year")}
        options={[{ value: 1, name: "2024" }]}
        value={formData?.year?.name || ""}
        placeholder="Select a year"
        variant="primary"
      />
      <Autocomplete
        onOption={(e, value) => onOption(e, value, "brand")}
        options={[{ value: 1, name: "BMW" }]}
        value={formData?.brand?.name || ""}
        placeholder="Select a brand"
        variant="secondary"
      />
    </main>
  );
};

export default App;
