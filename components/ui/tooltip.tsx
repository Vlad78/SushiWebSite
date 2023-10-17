import { Info } from "lucide-react";
import React, { useState } from "react";
import { usePopper, PopperChildrenProps } from "react-popper";
import { Popover, Transition } from "@headlessui/react";

import style from "./styles/tooltip.module.scss";

type ToolTip = React.HTMLAttributes<HTMLElement> & {
  data: string | React.ReactNode;
  placement: PopperChildrenProps["placement"];
};

const Tooltip: React.FC<ToolTip> = ({ data, placement, className }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
    strategy: "absolute",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [-12, 12],
        },
      },
      {
        name: "arrow",
        options: {
          padding: 5, // 5px from the edges of the popper
        },
      },
    ],
  });

  return (
    <Popover className={className}>
      <Popover.Button ref={setReferenceElement as React.Ref<HTMLButtonElement>}>
        <Info width={20} height={20} />
      </Popover.Button>
      <Transition
        enter="transition ease-out duration-50"
        enterFrom="opacity-20"
        enterTo="opacity-100"
        leave="transition ease-in duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-20"
        as={React.Fragment}
      >
        <Popover.Panel
          ref={setPopperElement as React.Ref<HTMLDivElement>}
          style={styles.popper}
          className={style.tooltip}
          role="tooltip"
          {...attributes.popper}
        >
          {typeof data === "string" ? <p>{data}</p> : data}
          <div className={style.arrow} style={styles.arrow} data-popper-arrow></div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Tooltip;
