"use client";

import type { PackageId } from "./config";

export const SELECT_PACKAGE_EVENT = "giot:select-package";

/* Anchor to the inquiry form that also preselects a package. Without JS it
   still scrolls to the form. */
export default function RequestPackageLink({
  packageId,
  className,
  children,
}: {
  packageId: PackageId;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#inquiry"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent<PackageId>(SELECT_PACKAGE_EVENT, { detail: packageId }))
      }
    >
      {children}
    </a>
  );
}
