"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CompassIcon } from "lucide-react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Image from "next/image";

import Combobox from "./ui/combobox";
import Button from "./ui/button";
import { useClientRect } from "../lib/utils-hooks";
import useUserData from "../hooks/use-userData";

import style from "./styles/delivery.module.scss";

const Delivery = () => {
  const [isMounted, setIsMounted] = useState(false);
  const {
    addressesHistoty,
    current: { delivery, deliveryTab },
    setDeliveryTab,
    setCurrentDelivery,
  } = useUserData();

  // header animation
  const [courierRect, courierBlockRef] = useClientRect();
  const [pickupRect, pickupBlockRef] = useClientRect();
  // const [lineRect, lineBlockRef] = useClientRect();

  let underscoreStyle = {
    width: courierRect?.width,
    marginLeft: "2rem",
    transform: "translate3d(0, -3px, 0)",
  };

  if (deliveryTab === "pick-up") {
    underscoreStyle = {
      width: pickupRect?.width,
      marginLeft: "0",
      transform: `translate3d(calc(${Number(pickupRect?.left)}px - 2.5rem), -3px, 0)`,
    };
  }

  // maps logic
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
    preventGoogleFontsLoading: true,
    libraries: ["places"],
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const { init } = usePlacesAutocomplete({ initOnMount: false });

  const center = useMemo(() => {
    if (delivery) return { lat: delivery.lat, lng: delivery.lng };
    // TODO one of pickup locations
    return { lat: 50.09705502403408, lng: 18.210203374501827 };
  }, [delivery]);

  useEffect(() => {
    const element = mapContainerRef.current;
    if (map) {
      init();

      const handleEvent = () => {
        newPositionPickedManually();
      };

      element?.addEventListener("touchend", handleEvent);
      element?.addEventListener("mouseup", handleEvent);

      return () => {
        element?.removeEventListener("touchend", handleEvent);
        element?.removeEventListener("mouseup", handleEvent);
      };
    }
  }, [mapContainerRef, map]);

  const newPositionPickedManually = async () => {
    const latLng = { lat: map!.getCenter()!.lat(), lng: map!.getCenter()!.lng() };
    const result = await getGeocode({
      location: latLng,
    });
    setCurrentDelivery({
      ...latLng,
      address: `${result[0].address_components[1].long_name} ${result[0].address_components[0].long_name} , ${result[0].address_components[2].long_name}`,
      type: "delivery",
    });
  };

  // marker animation
  const stylePinIdle = {
    transform: "translateY(0px) scale(1)",
    filter: "drop-shadow(rgba(35, 0, 0, 0.4) 8px 45px 13px)",
  };
  const stylePinMove = {
    transform: "translateY(-10px) scaleY(1.05) scaleX(0.95)",
    filter: "drop-shadow(rgba(35, 0, 0, 0.35) 8px 52px 16px)",
  };
  const [markerAnimation, setMarkerAnimation] = useState(stylePinIdle);

  // hydration workaround
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* start header */}
      <div className={style["delivery-header"]} style={{}}>
        <div
          className={`${style.courier} ${deliveryTab === "delivery" && style.isActive}`}
          onClick={() => setDeliveryTab("delivery")}
        >
          <span ref={courierBlockRef}>Kurier</span>
        </div>
        <div
          className={`${style.pickup} ${deliveryTab === "pick-up" && style.isActive}`}
          onClick={() => setDeliveryTab("pick-up")}
        >
          <span ref={pickupBlockRef}>Odbiór własny</span>
        </div>
        <div
          // ref={lineBlockRef as unknown as (node: HTMLDivElement) => void}
          className={style.line}
        ></div>
        <div className={`${style["underscore"]}`} style={underscoreStyle}></div>
      </div>
      {/* end header */}

      {/* start delivery block */}
      <div
        className={style["delivery-main"]}
        style={deliveryTab === "delivery" ? { display: "grid" } : { display: "none" }}
      >
        <div className={style["delivery-adress"]}>
          <p>Adres dostawy:</p>
        </div>
        <div className={style["delivery-combobox"]}>
          <Combobox
            selected={delivery}
            setSelected={setCurrentDelivery}
            addressesFromLS={addressesHistoty.allDeliveryAddresses}
            map={map}
          />
        </div>
      </div>
      {/* end delivery block */}

      {/* start pickup block */}
      <div
        className={style["pickup-main"]}
        style={deliveryTab === "pick-up" ? { display: "grid" } : { display: "none" }}
      >
        <div className={style["pickup-adress"]}>
          <p>Adres odbioru:</p>
        </div>
        <div className={style["pickup-combobox"]}>
          <Combobox
            selected={addressesHistoty.lastPickUpPlace}
            setSelected={setCurrentDelivery}
            addressesFromLS={[addressesHistoty.lastPickUpPlace]}
          />
        </div>
        <div className={style["pickup-see-on-map"]}>
          <a
            href={`https://maps.app.goo.gl/bWF5VwhBj1Mn2Lwd6`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button>
              <CompassIcon size={20} display="inline" />
              <span>Wyświetl na mapie</span>
            </Button>
          </a>
        </div>
      </div>
      {/* end pickup block */}

      {/* map block */}
      <div className={style["map-container"]} ref={mapContainerRef}>
        {deliveryTab === "pick-up" ? <div className={style.blank}></div> : ""}
        {!isLoaded ? (
          // TODO skeleton
          "Wait..."
        ) : (
          <GoogleMap
            options={{
              streetViewControl: false,
              fullscreenControl: false,
              gestureHandling: "greedy",
              mapTypeControl: false,
              clickableIcons: false,
            }}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            center={center}
            zoom={17}
            mapContainerClassName={style.maps}
            onLoad={(map) => {
              setMap(map);
            }}
            onBoundsChanged={() => {
              setMarkerAnimation(stylePinMove);
            }}
            onIdle={() => {
              setMarkerAnimation(stylePinIdle);
            }}
          >
            <div className={style.marker} style={markerAnimation}>
              <Image src={"/location-pin.svg"} alt="pin" width={70} height={70} />
            </div>
          </GoogleMap>
        )}
      </div>
    </>
  );
};

export default Delivery;
