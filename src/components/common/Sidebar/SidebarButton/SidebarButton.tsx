import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

const sidebarButtonVariants = cva("flex items-center space-x-2 w-full py-1 text-base ", {
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-x-1",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

type SidebarButtonProps = {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
} & VariantProps<typeof sidebarButtonVariants>;

function SidebarButton({ icon, title, href, disabled = false }: SidebarButtonProps) {
  const buttonClasses = sidebarButtonVariants({ disabled });

  return (
    <Link href={href} className={buttonClasses}>
      {icon && (
        <span className="icon flex items-center justify-center">
          <div className="relative w-5 h-5">
            <Image src={icon} alt={`${title} icon`} fill sizes="20" className="object-contain" />
          </div>
        </span>
      )}
      <span>{title}</span>
    </Link>
  );
}

export default SidebarButton;
