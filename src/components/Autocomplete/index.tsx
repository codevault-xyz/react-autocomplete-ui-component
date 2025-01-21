import {
  FC,
  ComponentPropsWithoutRef,
  MouseEvent,
  ChangeEvent,
  useState,
  useEffect,
  RefObject,
} from "react";
import { ArrowFillIcon, CloseIcon } from "../../icons";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBoolean } from "../../hooks/useBoolean";
import { useUpwards } from "../../hooks/useUpwards";
// import utils
import cn from "../../utils/cn";

const MODE = { primary: "primary", secondary: "secondary" };

export interface IAutocompleteOption {
  name: string;
  value: any;
}
export type TAutocompleteOptionFunc = IAutocompleteOption | null;

type TVariant = "primary" | "secondary";

interface Props extends ComponentPropsWithoutRef<"div"> {
  options: IAutocompleteOption[];
  onOption: (
    e: MouseEvent<HTMLButtonElement>,
    value: TAutocompleteOptionFunc
  ) => void;
  getOptions?: () => void;
  value: string;
  placeholder?: string;
  loading?: boolean;
  variant?: TVariant;
}

const Autocomplete: FC<Props> = ({
  options = [],
  onOption,
  getOptions,
  value,
  placeholder,
  loading = false,
  variant = "primary",
  className,
  ...rest
}) => {
  const { state: open, onFalse, onTrue, onToggle } = useBoolean();
  const { upwards, parentRef, childRef, onUpwards } = useUpwards();
  const ref = useOutsideClick(onFalse);

  const [optionsData, setOptionsData] = useState<IAutocompleteOption[]>([]);
  const [search, setSearch] = useState<string>(value);
  const [completed, setCompleted] = useState<boolean>(false);

  const condition = (value: string) =>
    value === ""
      ? options
      : [
          ...options.filter(
            (x) => x?.name?.toLowerCase().indexOf(value.toLowerCase()) > -1
          ),
        ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const trimmedValue = value.trim();
    setSearch(value);
    setOptionsData(condition(trimmedValue));
    if (!open) onTrue();
  };

  const onClear = (e: MouseEvent<HTMLButtonElement>) => {
    setSearch("");
    onFalse();
    onOption(e, null);
  };

  useEffect(() => setSearch(value), [value]);
  useEffect(() => setOptionsData(condition(search)), [options]);
  useEffect(() => {
    if (!getOptions || !open || completed) return;
    getOptions();
    setCompleted(true);
  }, [open]);
  useEffect(() => {
    if (open) onUpwards();
  }, [open, optionsData]);

  return (
    <div
      ref={ref}
      {...rest}
      className={cn("autocomplete", MODE[variant], className)}
    >
      <div onClick={onToggle}>
        <input
          ref={parentRef as RefObject<HTMLInputElement>}
          type="text"
          value={search}
          placeholder={placeholder || ""}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={onClear}
          style={{ display: search ? "inline-block" : "none" }}
        >
          <CloseIcon />
        </button>
        <button
          type="button"
          style={{ display: !search ? "inline-block" : "none" }}
        >
          <div>
            <ArrowFillIcon
              style={{ transform: `rotate(${open ? 180 : 0}deg)` }}
            />
          </div>
        </button>
      </div>
      <article
        ref={childRef}
        className={cn(upwards ? "upwards" : "downwards", open && "active")}
      >
        {loading ? (
          <article>
            <span></span>
            <span></span>
            <span></span>
          </article>
        ) : (
          <ul>
            {!!optionsData?.length ? (
              optionsData?.map((item, index) => (
                <li key={`item-${index}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      onFalse();
                      onOption(e, item);
                    }}
                  >
                    {item?.name}
                  </button>
                </li>
              ))
            ) : (
              <li>
                <button type="button">No options available</button>
              </li>
            )}
          </ul>
        )}
      </article>
    </div>
  );
};

export default Autocomplete;
