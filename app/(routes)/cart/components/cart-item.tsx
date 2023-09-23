import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
// import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { to1Decimal } from "@/lib/utils";
import style from "./styles/cart-item.module.scss";

interface CartItemProps {
  data: {
    product: Product;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.product.id);
  };

  const onSubtract = () => {
    cart.subtractItem(data.product);
  };

  const onAdd = () => {
    cart.addItem(data.product);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product.attributes.img.data[0].attributes.url}
          alt={data.product.attributes.title}
          className="object-cover object-center"
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className={style["remove-button"]}>
          <IconButton onClick={onRemove} icon={<X size={15} />} className={style["x-icon"]} />
        </div>
        <div className={style["cart-item-middle-column"]}>
          <div className={style.title}>
            <p className=" text-lg font-semibold text-black">{data.product.attributes.title}</p>
          </div>

          <div className={style.options}>Опции товара</div>

          <div className={style.price}>{`${to1Decimal(
            data.product.attributes.price - data.product.attributes.discount_value
          )} zl`}</div>

          <div className={style.controls}>
            <IconButton onClick={onSubtract} icon={<Minus size={15} />} />
            <div className={style.quantity}>{data.quantity}</div>
            <IconButton onClick={onAdd} icon={<Plus size={15} />} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
