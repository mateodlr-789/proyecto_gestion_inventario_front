import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  placeholder?: string;
}

export default function InputSearch({ value: initialValue, onChange, debounce, placeholder }: Props) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
    }, [debounce, onChange, value])

  return (
    <div className="bg-gray-100 w-full">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(ev) => setValue(ev.target.value)}
        className="p-2 bg-gray-100 border-none ring-0 selection:ring-0 focus:outline-none text-black"
      />
    </div>
  );
}
