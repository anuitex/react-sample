import cn from "classnames";
import React from "react";
import logo from "../../../assets/img/ant-logo.svg";
import "./Logo.scss";

export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps): JSX.Element {
  return (
    <div className={cn("Logo", className)}>
      <img src={logo} alt="Logo" />
    </div>
  );
}
