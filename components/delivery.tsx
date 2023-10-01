"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CompassIcon } from "lucide-react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { getGeocode } from "use-places-autocomplete";
import Image from "next/image";

// import IconButton from "./ui/icon-button";
import Combobox from "./ui/combobox";
import Button from "./ui/button";
import useCart from "../hooks/use-cart";
import { useClientRect } from "../lib/utils-hooks";
import { to2Decimal } from "../lib/utils";
import useUserData from "../hooks/use-userData";

import { Address } from "../types";
import style from "./styles/delivery.module.scss";

const places: Address[] = [
  {
    // id: 1,
    lat: 50.09705502403408,
    lng: 18.210203374501827,
    type: "pick-up",
    address: "Księdza Józefa Londzina 54, 47-400 Racibórz, Польша",
    // fullAdress: "adress 1, city, Poland",
    // shortAdress: "adress 1",
    // img: "img url",
    workingHours: "13:00-21:00",
  },
];

const Delivery = () => {
  console.log("delivery component mounted");

  const [isMounted, setIsMounted] = useState(false);
  const {
    addressesHistoty,
    current: { delivery, deliveryTab },
    setDeliveryTab,
    setCurrentDelivery,
  } = useUserData();

  // cart
  const cart = useCart();

  // header animation
  const [courierRect, courierBlockRef] = useClientRect();
  const [pickupRect, pickupBlockRef] = useClientRect();
  const [lineRect, lineBlockRef] = useClientRect();

  let underscoreStyle = {
    width: courierRect?.width,
    marginLeft: "2rem",
    transform: "translate3d(0, -3px, 0)",
  };

  if (deliveryTab === "pick-up") {
    underscoreStyle = {
      width: pickupRect?.width,
      marginLeft: "0",
      transform: `translate3d(${Number(lineRect?.width) / 2}px, -3px, 0)`,
    };
  }

  // combobox delivery

  // const [selectedDelivery, setSelectedDelivery] = useState<Address | null>(
  //   addressesHistoty.lastDeliveryAddress
  // );

  // combobox take away options
  const [selectedPickup, setSelectedPickup] = useState<Address | null>(places[0]); // user preferences data

  // maps logic
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
    preventGoogleFontsLoading: true,
    libraries: ["places"],
  });

  const center = useMemo(() => {
    if (delivery) return { lat: delivery.lat, lng: delivery.lng };
    // TODO one of pickup locations
    return { lat: 50.09705502403408, lng: 18.210203374501827 };
  }, [delivery]);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = mapContainerRef.current;

    const handleEvent = () => {
      newPositionPickedManually();
    };

    element?.addEventListener("touchend", handleEvent);
    element?.addEventListener("mouseup", handleEvent);

    return () => {
      element?.removeEventListener("touchend", handleEvent);
      element?.removeEventListener("mouseup", handleEvent);
    };
  }, [mapContainerRef, map]);

  const newPositionPickedManually = async () => {
    const latLng = { lat: map!.getCenter()!.lat(), lng: map!.getCenter()!.lng() };
    const result = await getGeocode({
      location: latLng,
    });
    console.log("🚀 ~ file: delivery.tsx:106 ~ newPositionPickedManually ~ result:", result);
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
      {/* header */}
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
          ref={lineBlockRef as unknown as (node: HTMLDivElement) => void}
          className={style.line}
        ></div>
        <div className={`${style["underscore"]}`} style={underscoreStyle}></div>
      </div>
      {/* delivery block */}
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
          />
        </div>
        <div className={style["delivery-price"]}>
          <p>Koszt dostawy</p>
        </div>
        <div className={style["price"]}>
          <p>15 zł</p>
        </div>
        <div className={style["remain-money"]}>
          <p>Do darmowej dostawy jeszcze </p>
        </div>
        <div className={style["money"]}>
          <p>10 zł</p>
        </div>
      </div>
      {/* pickup block */}
      <div
        className={style["pickup-main"]}
        style={deliveryTab === "pick-up" ? { display: "grid" } : { display: "none" }}
      >
        <div className={style["pickup-adress"]}>
          <p>Adres odbioru:</p>
        </div>
        <div className={style["pickup-combobox"]}>
          {/* <Combobox selected={selectedPickup} setSelected={setSelectedPickup} places={places} /> */}
        </div>
        <div className={style["pickup-see-on-map"]}>
          <Button onClick={() => {}}>
            <CompassIcon size={20} display="inline" />
            <span>Wyświetl na mapie</span>
          </Button>
        </div>
        <div className={style["pickup-discount"]}>
          <p>10% zniżki </p>
        </div>
        <div className={style["pickup-discount-amount"]}>
          <p>{to2Decimal(cart.totalPrice * 0.1) + " zł"}</p>
        </div>
      </div>
      {/* map block */}
      <div className={style["map-container"]} ref={mapContainerRef}>
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
