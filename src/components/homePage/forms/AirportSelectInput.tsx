"use client";
import { Form, Select } from "antd";
import { BsAirplaneFill } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { DEBOUNCE_INTERVAL } from "../../../../config";
import useGetAirports from "@/app/[locale]/_hooks/useGetAirports";
import { Airport } from "@/app/[locale]/_types/Airport";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  iconRotation?: string;
  form?: any;
  initialAirport?: Airport;
  onAirportSelect?: (airport: Airport | undefined) => void;
  readonly?: boolean;
};

export const AirportSelectInput = ({
  name,
  label,
  placeholder,
  iconRotation = "rotate(45deg)",
  form,
  initialAirport,
  onAirportSelect,
  readonly = false,
}: Props) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Airport | undefined>(initialAirport);

  useEffect(() => {
    if (initialAirport) setSelected(initialAirport);
  }, [initialAirport]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  function handleSearch(e: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(e);
    }, DEBOUNCE_INTERVAL);
  }

  const { isLoading, data } = useGetAirports(search);

  return (
    <div className="inputS1">
      <Form.Item
        label={label}
        name={name}>
        <Select
          placeholder={placeholder}
          prefix={
            <BsAirplaneFill
              className="text-lg text-[#819DAF]"
              style={{ transform: iconRotation }}
            />
          }
          showSearch={!readonly}
          open={readonly ? false : undefined}
          onSearch={readonly ? undefined : handleSearch}
          filterOption={false}
          onSelect={(val) => {
            const airport = data?.find((a) => a.iata_code === val);
            setSelected(airport);
            setSearch("");
            onAirportSelect?.(airport);
          }}
          options={data || []}
          loading={isLoading}
          defaultActiveFirstOption={false}
          notFoundContent={
            !search ? (
              false
            ) : isLoading ? (
              <div className="h-[100px] flex justify-center items-center">
                <AiOutlineLoading3Quarters
                  size={20}
                  className="animate-spin text-primary"
                />
              </div>
            ) : undefined
          }
          allowClear
          className={selected ? "!hidden" : ""}
          dropdownStyle={{
            width: "auto",
            minWidth: "300px",
            padding: "0px",
          }}
          fieldNames={{
            value: "iata_code",
          }}
          optionRender={(option) => {
            return (
              <div
                className="flex gap-2 py-2"
                title={[
                  option.data.name,
                  option.data.iata_code,
                  option.data.city,
                  option.data.country,
                ].join("|")}>
                <BsAirplaneFill className="text-lg shrink-0 text-[#819DAF]" />
                <div className="flex-1 text-gray-700 w-[140px] whitespace-nowrap text-ellipsis overflow-hidden shrink-0">
                  <p className="text-sm">
                    <span className="me-1">{option.data.country}</span>,
                    <span className="ms-1">{option.data.city}</span>
                  </p>
                  <p className="text-xs mt-1 text-gray-400 w-full overflow-hidden whitespace-nowrap text-ellipsis">
                    {option.data.name}
                  </p>
                </div>
                <div className="h-[28px] w-[55px] p-[10px] flex justify-center items-center text-white rounded text-xs bg-primary shrink-0 min-w-auto">
                  {option.data.iata_code}
                </div>
              </div>
            );
          }}
        />
        {selected && (
          <div className="relative">
            <p className="text-base font-semibold text-black">
              {selected.iata_code}
            </p>
            <p className="text-sm text-gray-600 text-ellipsis overflow-hidden w-full whitespace-nowrap">
              {[selected.country, selected.city, selected.name].join(" - ")}
            </p>
            {!readonly && (
              <IoMdClose
                size={16}
                onClick={() => {
                  setSelected(undefined);
                  form.setFieldValue(name, undefined);
                  onAirportSelect?.(undefined);
                }}
                className="p-[2px] cursor-pointer bg-gray-500 rounded-full text-white absolute top-0 end-0 opacity-60 hover:opacity-100 transition-all duration-75"
              />
            )}
          </div>
        )}
      </Form.Item>
    </div>
  );
};
