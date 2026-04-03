"use client";

import { useState, useCallback, useRef } from "react";
import { Modal, Button, Input } from "antd";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { IoSearchOutline, IoLocationSharp } from "react-icons/io5";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const DEFAULT_CENTER = { lat: 21.4858, lng: 39.1925 }; // Jeddah

// ─── Geocoder helper ──────────────────────────────────────────────────────────

interface GeoResult {
  city: string;
  fullAddress: string;
}

function parseGeoResult(results: google.maps.GeocoderResult[]): GeoResult {
  const first = results[0];
  const fullAddress = first?.formatted_address ?? "";
  const cityComponent = first?.address_components?.find((c) =>
    c.types.includes("locality")
  );
  const city = cityComponent?.long_name ?? "";
  return { city, fullAddress };
}

// ─── Search box (uses Places Autocomplete) ───────────────────────────────────

interface SearchBoxProps {
  onPlaceSelected: (lat: number, lng: number) => void;
}

const SearchBox = ({ onPlaceSelected }: SearchBoxProps) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Attach autocomplete once the places library + input are ready
  const attachAutocomplete = useCallback(
    (el: HTMLInputElement | null) => {
      if (!el || !placesLib || autocompleteRef.current) return;
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;

      const ac = new placesLib.Autocomplete(el, { fields: ["geometry"] });
      autocompleteRef.current = ac;

      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        const loc = place.geometry?.location;
        if (!loc) return;
        const lat = loc.lat();
        const lng = loc.lng();
        map?.panTo({ lat, lng });
        map?.setZoom(15);
        onPlaceSelected(lat, lng);
      });
    },
    [placesLib, map, onPlaceSelected]
  );

  return (
    <div className="absolute top-3 inset-x-3 z-10">
      <div className="relative">
        <input
          ref={attachAutocomplete}
          type="text"
          placeholder="ابحث عن موقعك..."
          className="w-full h-11 rounded-xl border border-gray-200 bg-white shadow-sm px-4 pe-10 text-sm text-right outline-none focus:border-primary"
        />
        <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 text-lg pointer-events-none" />
      </div>
    </div>
  );
};

// ─── Map picker ───────────────────────────────────────────────────────────────

interface MapPickerProps {
  position: { lat: number; lng: number };
  onDragEnd: (lat: number, lng: number) => void;
}

const MapPicker = ({ position, onDragEnd }: MapPickerProps) => (
  <Map
    defaultCenter={position}
    defaultZoom={14}
    mapId="address-picker"
    gestureHandling="greedy"
    disableDefaultUI
    style={{ width: "100%", height: "100%" }}
  >
    <AdvancedMarker
      position={position}
      draggable
      onDragEnd={(e) => {
        const lat = e.latLng?.lat() ?? position.lat;
        const lng = e.latLng?.lng() ?? position.lng;
        onDragEnd(lat, lng);
      }}
    />
  </Map>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

interface AddAddressModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (city: string, fullAddress: string) => void;
}

const ModalInner = ({ onClose, onConfirm }: Omit<AddAddressModalProps, "open">) => {
  const [markerPos, setMarkerPos] = useState(DEFAULT_CENTER);
  const [geoResult, setGeoResult] = useState<GeoResult>({
    city: "جدة",
    fullAddress:
      "طريق الملك عبد العزيز، برج سازار أفيبو، الطابق العاشر، حي الزهراء، جدة.",
  });

  const geocodingLib = useMapsLibrary("geocoding");

  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!geocodingLib) return;
      const geocoder = new geocodingLib.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results) {
          setGeoResult(parseGeoResult(results));
        }
      });
    },
    [geocodingLib]
  );

  const handleDragEnd = (lat: number, lng: number) => {
    setMarkerPos({ lat, lng });
    reverseGeocode(lat, lng);
  };

  const handleSearchSelect = (lat: number, lng: number) => {
    setMarkerPos({ lat, lng });
    reverseGeocode(lat, lng);
  };

  return (
    <>
      {/* Map area */}
      <div className="relative h-[320px] rounded-2xl overflow-hidden mb-4">
        <SearchBox onPlaceSelected={handleSearchSelect} />
        <MapPicker position={markerPos} onDragEnd={handleDragEnd} />
      </div>

      {/* Selected address preview */}
      <div className="flex items-start gap-2 mb-5 px-1">
        <IoLocationSharp className="text-primary text-xl shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-bold text-gray-800 text-sm">{geoResult.city}</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            {geoResult.fullAddress}
          </p>
        </div>
      </div>

      {/* Confirm button */}
      <Button
        type="primary"
        block
        onClick={() => onConfirm(geoResult.city, geoResult.fullAddress)}
      >
        تأكيد العنوان
      </Button>
    </>
  );
};

export const AddAddressModal = ({
  open,
  onClose,
  onConfirm,
}: AddAddressModalProps) => {
  const handleConfirm = (city: string, fullAddress: string) => {
    onConfirm(city, fullAddress);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className="add-address-modal"
      title={<p className="text-black text-start font-bold">اختيار موقع على الخريطة</p>}
    >
      <APIProvider apiKey={API_KEY}>
        <ModalInner onClose={onClose} onConfirm={handleConfirm} />
      </APIProvider>
    </Modal>
  );
};
