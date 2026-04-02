import { Input, Slider } from "antd";
import { useState } from "react";

type PriceRangeFilterProps = {
  fromLabel: string;
  toLabel: string;
};

export const PriceRangeFilter = ({
  fromLabel,
  toLabel,
}: PriceRangeFilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  return (
    <div className="px-2">
      <Slider
        range
        min={0}
        max={1000000}
        value={priceRange}
        onChange={(value) => setPriceRange(value as [number, number])}
        styles={{
          track: {
            backgroundColor: "#BF2629",
            height: 5.5,
          },
          handle: {
            height: 18,
            width: 18,
            transform: "translateY(-50%)",
            top: "50%",
          },
          rail: {
            height: 5.5,
          },
          tracks: {
            background: "yellow",
          },
        }}
      />
      <div className="flex gap-2 mt-5 text-base">
        <div className="flex-1">
          <p className="text-base text-gray-400 mb-1">{fromLabel}</p>
          <div className="inputS1 with-border">
            <Input
              value={priceRange[0]}
              size="middle"
            />
          </div>
        </div>
        <div className="flex justify-center items-center pt-6 font-bold">-</div>
        <div className="flex-1">
          <p className="text-gray-400 mb-1">{toLabel}</p>
          <div className="inputS1 with-border">
            <Input
              value={priceRange[1]}
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};